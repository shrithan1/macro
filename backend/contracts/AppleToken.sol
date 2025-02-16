// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract AppleToken is ERC20, Ownable(msg.sender) {
    IPyth public pyth;

    bytes32 public constant APPLE_FEED_ID = 0x49f6b65cb1de6b10eaf75e7c03ca029c306d0357e91b5311b175084a5ad55688;
    bytes32 public constant ETH_USD_FEED_ID = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace;

    event TokensBought(address indexed buyer, uint256 ethAmount, uint256 tokensMinted);
    event TokensSold(address indexed seller, uint256 tokensBurned, uint256 ethReceived);
    
    constructor(address pythContract) ERC20("AppleToken", "PAAPL") payable {
        require(msg.value > 0, "Must initialize with ETH pool");
        pyth = IPyth(pythContract);
    }

    function normalizePrice(PythStructs.Price memory p) internal pure returns (uint256) {
        require(p.price > 0, "Invalid price"); 

        uint256 price = uint256(uint64(p.price));
        int32 expo = p.expo;

        if (expo < 0) {
            uint256 absExpo = uint256(uint32(-expo));
            return (absExpo > 18) ? price / (10 ** (absExpo - 18)) : price * (10 ** (18 - absExpo));
        } else {
            uint256 absExpo = uint256(uint32(expo));
            return (absExpo > 18) ? price * (10 ** (absExpo - 18)) : price / (10 ** (18 - absExpo));
        }
    }

    function getLatestPrices() public view returns (uint256) {
        PythStructs.Price memory applePrice = pyth.getPriceNoOlderThan(APPLE_FEED_ID, 60);
        PythStructs.Price memory ethUsdPrice = pyth.getPriceNoOlderThan(ETH_USD_FEED_ID, 60);

        require(applePrice.price > 0 && ethUsdPrice.price > 0, "Invalid price data");

        uint256 appleUsdPrice = normalizePrice(applePrice);
        uint256 ethUsd = normalizePrice(ethUsdPrice);

        return (appleUsdPrice * 1e18) / ethUsd;
    }

    function buyToken(uint256 minTokens) external payable {
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 applePriceInEth = getLatestPrices();
        uint256 tokensToMint = (msg.value * 1e18) / applePriceInEth;

        require(tokensToMint >= minTokens, "Slippage too high");

        _mint(msg.sender, tokensToMint);
        emit TokensBought(msg.sender, msg.value, tokensToMint);
    }

    function sellToken(uint256 tokenAmount, uint256 minEth) external {
        require(tokenAmount > 0, "Token amount must be > 0");
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient token balance");

        uint256 applePriceInEth = getLatestPrices();
        uint256 ethToReturn = (tokenAmount * applePriceInEth) / 1e18;

        require(ethToReturn >= minEth, "Slippage too high");
        require(address(this).balance >= ethToReturn, "Insufficient liquidity");

        _burn(msg.sender, tokenAmount);

        (bool success, ) = payable(msg.sender).call{value: ethToReturn}("");
        require(success, "ETH transfer failed");

        emit TokensSold(msg.sender, tokenAmount, ethToReturn);
    }

    function depositPool() external payable {
        require(msg.value > 0, "Must send ETH");
    }

    receive() external payable {}
}
