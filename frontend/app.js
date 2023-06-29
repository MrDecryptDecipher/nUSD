const ethAmountInput = document.getElementById('ethAmount');
const depositBtn = document.getElementById('depositBtn');
const redeemBtn = document.getElementById('redeemBtn');
const balanceDiv = document.getElementById('balance');

let web3;
let nUSDContract;

// Connect to the Ethereum network using Web3.js and initialize the nUSD contract instance
async function init() {
   try {
       // Detect MetaMask provider
       const provider = await detectEthereumProvider();
       if (!provider) {
           throw new Error('MetaMask not found');
       }

       // Request access to user accounts
       await ethereum.request({ method: 'eth_requestAccounts' });

       // Create Web3 instance
       web3 = new Web3(window.ethereum);

       // Get the deployed nUSD contract instance
       const networkId = await web3.eth.net.getId();
       const nUSDContractData = nUSD.networks[networkId];
       if (!nUSDContractData) {
           throw new Error('nUSD contract not found on the current network');
       }
       nUSDContract = new web3.eth.Contract(nUSD.abi, nUSDContractData.address);

       // Add event listeners to the buttons
       depositBtn.addEventListener('click', depositETH);
       redeemBtn.addEventListener('click', redeemnUSD);

       // Call the updateBalance function to display the initial balance
       updateBalance();

   } catch (error) {
       console.error(error);
   }
}

// Deposit ETH and receive nUSD
async function depositETH() {
   const ethAmount = ethAmountInput.value;
   if (ethAmount <= 0) {
       alert('Please enter a valid ETH amount');
       return;
   }

   try {
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
       const account = accounts[0];

       // Convert ETH amount to Wei
       const ethAmountWei = web3.utils.toWei(ethAmount.toString());

       // Call the deposit function in the nUSD contract
       await nUSDContract.methods.deposit().send({ from: account, value: ethAmountWei });

       // Update the balance after successful deposit
       updateBalance();

       // Clear the input field
       ethAmountInput.value = '';

       // Display success message
       alert('Deposit successful');

   } catch (error) {
       console.error(error);
       alert('Deposit failed');
   }
}

// Redeem nUSD and receive ETH
async function redeemnUSD() {
   try {
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
       const account = accounts[0];

       // Call the redeem function in the nUSD contract
       await nUSDContract.methods.redeem().send({ from: account });

       // Update the balance after successful redemption
       updateBalance();

       // Display success message
       alert('Redeem successful');

   } catch (error) {
       console.error(error);
       alert('Redeem failed');
   }
}

// Update and display the nUSD balance
async function updateBalance() {
   try {
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
       const account = accounts[0];

       // Call the balanceOf function in the nUSD contract
       const balance = await nUSDContract.methods.balanceOf(account).call();

       // Display the balance
       balanceDiv.textContent = `Your nUSD Balance: ${balance} nUSD`;

   } catch (error) {
       console.error(error);
       balanceDiv.textContent = 'Error fetching balance';
   }
}

// Check if the browser has MetaMask installed
async function detectEthereumProvider() {
if (window.ethereum) {
return window.ethereum;
}
if (window.web3) {
return window.web3.currentProvider;
}
return null;
}

// Call the init function to connect to the Ethereum network and initialize the contract instance
init();
