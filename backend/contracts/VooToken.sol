// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract VooToken is ERC20, Ownable(msg.sender) { 
    IPyth public pyth;

    bytes32 public constant VOO_FEED_ID = 0x49f6b65cb1de6b10eaf75e7c03ca029c306d0357e91b5311b175084a5ad55688;
    bytes32 public constant ETH_USD_FEED_ID = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace;

    constructor(address pythContract) ERC20("VooToken", "PVOO") payable {
        require(msg.value > 0, "Must initialize with ETH pool");
        pyth = IPyth(pythContract);
    }

    function normalizePrice(PythStructs.Price memory p) internal pure returns (uint256) {
        // no negative price 
        require(p.price >= 0, "Negative price not supported");
        
        uint256 price = uint256(uint64(p.price));
        int32 expo = p.expo;
        
        if (expo < 0) {
            uint256 absExpo = uint256(uint32(-expo));
            return absExpo > 18 
                ? price / (10 ** (absExpo - 18))
                : price * (10 ** (18 - absExpo));
        } else {
            uint256 absExpo = uint256(uint32(expo));
            return absExpo > 18 
                ? price / (10 ** (absExpo - 18))
                : price * (10 ** (18 - absExpo));
        }
    }

    function buyToken(bytes[] calldata priceUpdate) external payable {
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 fee = pyth.getUpdateFee(priceUpdate);
        require(msg.value > fee, "Insufficient ETH to cover fee");

        pyth.updatePriceFeeds{value: fee}(priceUpdate);

        PythStructs.Price memory vooPrice = pyth.getPriceNoOlderThan(VOO_FEED_ID, 60);
        PythStructs.Price memory ethUsdPrice = pyth.getPriceNoOlderThan(ETH_USD_FEED_ID, 60);

        uint256 vooUsdPrice = normalizePrice(vooPrice);
        uint256 ethUsd = normalizePrice(ethUsdPrice);

        uint256 vooPriceInEth = (vooUsdPrice * 1e18) / ethUsd;

        uint256 ethForTrade = msg.value - fee;
            uint256 tokensToMint = (ethForTrade * 1e18) / vooPriceInEth;

        _mint(msg.sender, tokensToMint);
    }

    function sellToken(uint256 tokenAmount, bytes[] calldata priceUpdate) external payable {
        require(tokenAmount > 0, "Token amount must be > 0");
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient token balance");

        uint256 fee = pyth.getUpdateFee(priceUpdate);
        require(msg.value >= fee, "Insufficient ETH sent for fee");

        pyth.updatePriceFeeds{value: fee}(priceUpdate);

        PythStructs.Price memory vooPrice = pyth.getPriceNoOlderThan(VOO_FEED_ID, 60);
        PythStructs.Price memory ethUsdPrice = pyth.getPriceNoOlderThan(ETH_USD_FEED_ID, 60);

        uint256 vooUsdPrice = normalizePrice(vooPrice);
        uint256 ethUsd = normalizePrice(ethUsdPrice);

        uint256 vooPriceInEth = (vooUsdPrice * 1e18) / ethUsd;
        uint256 ethToReturn = (tokenAmount  * vooPriceInEth) / 1e18;
        
        require(address(this).balance >= ethToReturn, "Insufficient liquidity");

        _burn(msg.sender, tokenAmount);

        (bool success, ) = payable(msg.sender).call{value: ethToReturn}("");
        require(success, "ETH transfer failed");
    }

    function depositPool() external payable {
        require(msg.value > 0, "Must send ETH");
    }

    receive() external payable {}

    function testNormalizePrice(PythStructs.Price memory p) external pure returns (uint256) {
        return normalizePrice(p);
    }
} 