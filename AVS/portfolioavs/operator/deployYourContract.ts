import { ethers } from "ethers";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenvConfig({ path: resolve(__dirname, "../.env") });

async function main() {
    // Get private key from env
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("No private key found in .env file");
    }

    // Connect to the network
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Deploy your contract
    console.log("Deploying YourContract...");
    const YourContract = await ethers.getContractFactory("YourContract", wallet);
    const yourContract = await YourContract.deploy(/* constructor arguments if any */);
    await yourContract.deployed();

    console.log(`YourContract deployed to: ${yourContract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 