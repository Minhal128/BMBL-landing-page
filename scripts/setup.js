import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('🐝 BMBLANCE Token - Quick Setup\n');
  console.log('This wizard will help you configure your deployment.\n');

  const envPath = path.join(__dirname, '../.env');
  
  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    const overwrite = await question('.env file already exists. Overwrite? (y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }

  console.log('\n📝 Step 1: Private Key');
  console.log('Get your private key from MetaMask:');
  console.log('  1. Click three dots > Account Details');
  console.log('  2. Click "Show Private Key"');
  console.log('  3. Enter password and copy the key\n');
  
  const privateKey = await question('Paste your private key (without 0x): ');
  
  if (!privateKey || privateKey.length < 60) {
    console.log('❌ Invalid private key. Please try again.');
    rl.close();
    return;
  }

  console.log('\n🔧 Step 2: Optional Settings');
  console.log('Leave blank to use deployer address as donation/liquidity wallet\n');
  
  const donationWallet = await question('Donation wallet address (optional): ');
  const liquidityWallet = await question('Liquidity wallet address (optional): ');

  // Create .env file
  const envContent = `# Sepolia Testnet Configuration
SEPOLIA_RPC_URL=https://rpc.sepolia.org
PRIVATE_KEY=${privateKey.replace('0x', '')}
ETHERSCAN_API_KEY=

# Wallet Addresses (leave as 0x000... to use deployer address)
DONATION_WALLET=${donationWallet || '0x0000000000000000000000000000000000000000'}
LIQUIDITY_WALLET=${liquidityWallet || '0x0000000000000000000000000000000000000000'}
`;

  fs.writeFileSync(envPath, envContent);
  
  console.log('\n✅ Configuration saved to .env\n');
  console.log('🚀 Next steps:');
  console.log('  1. Make sure you have Sepolia ETH in your wallet');
  console.log('     Get free ETH: https://sepoliafaucet.com/\n');
  console.log('  2. Run deployment:');
  console.log('     npm run deploy\n');
  console.log('  3. Start the website:');
  console.log('     npm run dev\n');

  rl.close();
}

setup().catch(error => {
  console.error('❌ Setup error:', error);
  rl.close();
  process.exit(1);
});
