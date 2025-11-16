import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("🐝 Starting BMBLANCE Token Deployment on Sepolia Testnet...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  if (balance === 0n) {
    console.error("❌ ERROR: No ETH in wallet. Please get Sepolia ETH from:");
    console.error("   - https://sepoliafaucet.com/");
    console.error("   - https://alchemy.com/faucets/ethereum-sepolia");
    process.exit(1);
  }

  // Wallet addresses for donation and liquidity
  // Using deployer address as fallback for testing
  const donationWallet = process.env.DONATION_WALLET && process.env.DONATION_WALLET !== "0x0000000000000000000000000000000000000000" 
    ? process.env.DONATION_WALLET 
    : deployer.address;
  const liquidityWallet = process.env.LIQUIDITY_WALLET && process.env.LIQUIDITY_WALLET !== "0x0000000000000000000000000000000000000000"
    ? process.env.LIQUIDITY_WALLET 
    : deployer.address;

  console.log("🌳 Donation Wallet:", donationWallet);
  console.log("💧 Liquidity Wallet:", liquidityWallet);
  console.log("");

  // Deploy BMBLANCE Token
  console.log("🚀 Deploying BMBLANCE Token...");
  const BMBLANCE = await hre.ethers.getContractFactory("BMBLANCE");
  const bmblance = await BMBLANCE.deploy(donationWallet, liquidityWallet);
  
  await bmblance.waitForDeployment();
  const contractAddress = await bmblance.getAddress();

  console.log("✅ BMBLANCE Token deployed to:", contractAddress);
  console.log("");

  // Get token details
  const name = await bmblance.name();
  const symbol = await bmblance.symbol();
  const decimals = await bmblance.decimals();
  const totalSupply = await bmblance.totalSupply();
  const ownerBalance = await bmblance.balanceOf(deployer.address);

  console.log("📊 Token Details:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Decimals:", decimals.toString());
  console.log("   Total Supply:", hre.ethers.formatUnits(totalSupply, decimals), symbol);
  console.log("   Owner Balance:", hre.ethers.formatUnits(ownerBalance, decimals), symbol);
  console.log("");

  // Get tax information
  const reflectionTax = await bmblance.reflectionTax();
  const donationTax = await bmblance.donationTax();
  const liquidityTax = await bmblance.liquidityTax();

  console.log("💸 Tax Configuration:");
  console.log("   Reflection Tax:", (Number(reflectionTax) / 100).toFixed(2) + "%");
  console.log("   Donation Tax:", (Number(donationTax) / 100).toFixed(2) + "%");
  console.log("   Liquidity Tax:", (Number(liquidityTax) / 100).toFixed(2) + "%");
  console.log("   Total Tax:", ((Number(reflectionTax) + Number(donationTax) + Number(liquidityTax)) / 100).toFixed(2) + "%");
  console.log("");

  // Save deployment info
  const deploymentInfo = {
    network: "sepolia",
    contractAddress: contractAddress,
    contractName: "BMBLANCE",
    deployer: deployer.address,
    donationWallet: donationWallet,
    liquidityWallet: liquidityWallet,
    tokenDetails: {
      name: name,
      symbol: symbol,
      decimals: Number(decimals),
      totalSupply: totalSupply.toString()
    },
    taxes: {
      reflection: Number(reflectionTax),
      donation: Number(donationTax),
      liquidity: Number(liquidityTax)
    },
    deploymentDate: new Date().toISOString(),
    explorerUrl: `https://sepolia.etherscan.io/address/${contractAddress}`,
    verificationCommand: `npx hardhat verify --network sepolia ${contractAddress} "${donationWallet}" "${liquidityWallet}"`
  };

  const deploymentPath = path.join(__dirname, "../deployment.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to deployment.json");
  console.log("");

  // Save contract address for frontend
  const contractConfigPath = path.join(__dirname, "../src/contracts/config.js");
  const contractConfig = `// BMBLANCE Token Contract Configuration
// Auto-generated during deployment

export const CONTRACT_ADDRESS = "${contractAddress}";
export const NETWORK_ID = 11155111; // Sepolia
export const NETWORK_NAME = "Sepolia Testnet";
export const RPC_URL = "https://rpc.sepolia.org";
export const EXPLORER_URL = "https://sepolia.etherscan.io";

export const TOKEN_INFO = {
  name: "${name}",
  symbol: "${symbol}",
  decimals: ${decimals},
  totalSupply: "${totalSupply.toString()}"
};

export const WALLETS = {
  donation: "${donationWallet}",
  liquidity: "${liquidityWallet}"
};

export const TAXES = {
  reflection: ${reflectionTax},
  donation: ${donationTax},
  liquidity: ${liquidityTax}
};
`;

  const contractsDir = path.join(__dirname, "../src/contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }
  fs.writeFileSync(contractConfigPath, contractConfig);
  console.log("📝 Contract config saved to src/contracts/config.js");
  console.log("");

  console.log("🎉 Deployment Complete!");
  console.log("");
  console.log("📋 Next Steps:");
  console.log("   1. View on Sepolia Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
  console.log("   2. Verify contract (optional):", deploymentInfo.verificationCommand);
  console.log("   3. Add token to MetaMask:");
  console.log("      - Token Address:", contractAddress);
  console.log("      - Token Symbol:", symbol);
  console.log("      - Token Decimals:", decimals);
  console.log("");
  console.log("🌐 Website integration files created in src/contracts/");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment Error:", error);
    process.exit(1);
  });
