import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";


describe("VooToken - Basic Tests", function () {
  // Dummy Pyth address for testing
  const MOCK_PYTH = "0x4305FB66699C3B2702D4d05CF36551390A4c69C6";

  async function deployFixture() {
    const [owner, user1, user2] = await ethers.getSigners();

    // Deploy AppleToken with 10 ETH initial liquidity
    const VooToken = await ethers.getContractFactory("VooToken");
    const vooToken = await VooToken.deploy(
      MOCK_PYTH,
      { value: ethers.parseEther("10.0") }
    );

    return { vooToken, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("Should deploy with correct initial settings", async function () {
      const { vooToken, owner } = await loadFixture(deployFixture);

      expect(await vooToken.name()).to.equal("VooToken");
      expect(await vooToken.symbol()).to.equal("PVOO");
      expect(await vooToken.owner()).to.equal(owner.address);
      expect(await vooToken.pyth()).to.equal(MOCK_PYTH);
    });

    it("Should have correct initial ETH balance", async function () {
      const { vooToken } = await loadFixture(deployFixture);
      expect(await ethers.provider.getBalance(await vooToken.getAddress()))
        .to.equal(ethers.parseEther("10.0"));
    });

    it("Should revert if deployed with 0 ETH", async function () {
      const VooToken = await ethers.getContractFactory("VooToken");
      await expect(VooToken.deploy(MOCK_PYTH))
        .to.be.revertedWith("Must initialize with ETH pool");
    });
  });

  describe("Pool Management", function () {
    it("Should accept ETH deposits", async function () {
      const { vooToken, user1 } = await loadFixture(deployFixture);
      const depositAmount = ethers.parseEther("1.0");

      await expect(vooToken.connect(user1).depositPool({ value: depositAmount }))
        .to.not.be.reverted;

      expect(await ethers.provider.getBalance(await vooToken.getAddress()))
        .to.equal(ethers.parseEther("11.0")); // 10 initial + 1 deposited
    });

    it("Should revert deposit with 0 ETH", async function () {
      const { vooToken, user1 } = await loadFixture(deployFixture);
      
      await expect(vooToken.connect(user1).depositPool({ value: 0 }))
        .to.be.revertedWith("Must send ETH");
    });

    it("Should accept ETH via receive function", async function () {
      const { vooToken, user1 } = await loadFixture(deployFixture);
      const sendAmount = ethers.parseEther("1.0");

      // Send ETH directly to contract
      await expect(user1.sendTransaction({
        to: await vooToken.getAddress(),
        value: sendAmount
      })).to.not.be.reverted;

      expect(await ethers.provider.getBalance(await vooToken.getAddress()))
        .to.equal(ethers.parseEther("11.0")); // 10 initial + 1 sent
    });
  });

  describe("Price Normalization", function () {
    it("Should normalize positive prices correctly", async function () {
      const { vooToken } = await loadFixture(deployFixture);

      // Test case 1: Price with negative exponent (-8)
      const price1 = {
        price: 18000000000n, // $180.00 with 8 decimals (180 * 10^8)
        conf: 0n,
        expo: -8,
        publishTime: 0n
      };
      const normalized1 = await vooToken.testNormalizePrice(price1);
      expect(normalized1).to.equal(ethers.parseEther("180.0"));

      // Test case 2: Price with positive exponent (2)
      const price2 = {
        price: 18000n, // 180.00 with exponent 2 (180 * 10^2)
        conf: 0n,
        expo: 2,
        publishTime: 0n
      };
      const normalized2 = await vooToken.testNormalizePrice(price2);
      expect(normalized2).to.equal(ethers.parseEther("180.0"));

      // Test case 3: Price with different exponent (-2)
      const price3 = {
        price: 18000n, // 180.00 with 2 decimals
        conf: 0n,
        expo: -2,
        publishTime: 0n
      };
      const normalized3 = await vooToken.testNormalizePrice(price3);
      expect(normalized3).to.equal(ethers.parseEther("180.0"));
    });

    it("Should revert on negative prices", async function () {
      const { vooToken } = await loadFixture(deployFixture);

      const negativePrice = {
        price: -1800000000n,
        conf: 0n,
        expo: -8,
        publishTime: 0n
      };

      await expect(vooToken.testNormalizePrice(negativePrice))
        .to.be.revertedWith("Negative price not supported");
    });
  });

  describe("Ownership", function () {
    it("Should have correct owner", async function () {
      const { vooToken, owner } = await loadFixture(deployFixture);
      expect(await vooToken.owner()).to.equal(owner.address);
    });

    it("Should allow owner to transfer ownership", async function () {
      const { vooToken, owner, user1 } = await loadFixture(deployFixture);
      
      await expect(vooToken.connect(owner).transferOwnership(user1.address))
        .to.not.be.reverted;
        
      expect(await vooToken.owner()).to.equal(user1.address);
    });

    it("Should prevent non-owner from transferring ownership", async function () {
      const { vooToken, user1, user2 } = await loadFixture(deployFixture);
      
      await expect(vooToken.connect(user1).transferOwnership(user2.address))
        .to.be.revertedWithCustomError(vooToken, "OwnableUnauthorizedAccount");
    });
  });
});