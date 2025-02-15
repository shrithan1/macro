import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("AppleToken - Basic Functionality", function () {
  async function deployContractFixture() {
    const [owner, user1, user2] = await ethers.getSigners();

    // Deploy with a mock address for Pyth (we won't use it)
    const mockPythAddress = "0x1111111111111111111111111111111111111111";
    
    const AppleToken = await ethers.getContractFactory("AppleToken");
    const appleToken = await AppleToken.deploy(
      mockPythAddress,
      { value: ethers.parseEther("10.0") } // Initial liquidity
    );

    return { appleToken, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { appleToken, owner } = await loadFixture(deployContractFixture);
      expect(await appleToken.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      const { appleToken } = await loadFixture(deployContractFixture);
      expect(await appleToken.name()).to.equal("AppleToken");
      expect(await appleToken.symbol()).to.equal("PAAPL");
    });

    it("Should initialize with correct ETH pool", async function () {
      const { appleToken } = await loadFixture(deployContractFixture);
      expect(await ethers.provider.getBalance(appleToken.getAddress()))
        .to.equal(ethers.parseEther("10.0"));
    });

    it("Should revert deployment if no initial ETH sent", async function () {
      const AppleToken = await ethers.getContractFactory("AppleToken");
      const mockPythAddress = "0x1111111111111111111111111111111111111111";
      
      await expect(AppleToken.deploy(mockPythAddress))
        .to.be.revertedWith("Must initialize with ETH pool");
    });
  });

  describe("Pool Management", function () {
    it("Should accept ETH deposits through depositPool", async function () {
      const { appleToken, user1 } = await loadFixture(deployContractFixture);
      const depositAmount = ethers.parseEther("1.0");

      await expect(
        appleToken.connect(user1).depositPool({ value: depositAmount })
      ).to.changeEtherBalance(appleToken, depositAmount);
    });

    it("Should revert depositPool with zero ETH", async function () {
      const { appleToken, user1 } = await loadFixture(deployContractFixture);
      
      await expect(
        appleToken.connect(user1).depositPool({ value: 0 })
      ).to.be.revertedWith("Must send ETH");
    });

    it("Should accept ETH through receive function", async function () {
      const { appleToken, user1 } = await loadFixture(deployContractFixture);
      const depositAmount = ethers.parseEther("1.0");

      // Send ETH directly to contract
      await expect(
        user1.sendTransaction({
          to: await appleToken.getAddress(),
          value: depositAmount
        })
      ).to.changeEtherBalance(appleToken, depositAmount);
    });
  });

  describe("Price Normalization", function () {
    it("Should revert on negative prices", async function () {
      const { appleToken } = await loadFixture(deployContractFixture);
      
      // Create a price struct with negative price
      const negativePrice = {
        price: -100,
        conf: 0,
        expo: -8,
        publishTime: Math.floor(Date.now() / 1000)
      };

      // We need to call normalizePrice through a public function
      // Let's add a test function to the contract first
      await expect(
        appleToken.testNormalizePrice(negativePrice)
      ).to.be.revertedWith("Negative price not supported");
    });
  });
}); 