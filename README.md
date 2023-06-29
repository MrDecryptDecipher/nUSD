nUSD Stablecoin DApp
The nUSD Stablecoin DApp is a decentralized application built on the Ethereum blockchain that allows users to deposit ETH and receive 50% of its value in nUSD stablecoin. The DApp also provides a redeem function to convert nUSD back into ETH at the current exchange rate.

Overview
The nUSD Stablecoin DApp consists of a Solidity smart contract for the nUSD stablecoin and a front-end user interface built with HTML, CSS, and JavaScript. The smart contract handles the minting and burning of nUSD tokens, while the front-end allows users to interact with the smart contract through a user-friendly interface.

Key Features
Deposit Function: Users can deposit ETH into the contract and receive an equivalent amount of nUSD tokens. The exchange rate is set at 50%, meaning if a user deposits 1 ETH, they will receive 0.5 nUSD.

Redeem Function: Users can redeem their nUSD tokens for ETH at the current exchange rate. The required amount of nUSD to redeem for 1 ETH is double the value, ensuring the stability of the nUSD stablecoin.

Total Supply Tracking: The smart contract keeps track of the total supply of nUSD tokens in circulation. The total supply is updated whenever new tokens are minted or existing tokens are burned.

Chainlink Integration: The smart contract integrates with the Chainlink oracle to fetch real-time ETH price data. This ensures accurate exchange rate calculations based on the current ETH price.

Assumptions
This implementation assumes the use of the Goerli testnet for development and testing purposes.

The Chainlink Aggregator contract address 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 is used to fetch real-time ETH price data on the Goerli testnet. Ensure that this address is correctly configured in the smart contract.

Getting Started
To run the nUSD Stablecoin DApp locally, follow these steps:

Clone this repository to your local machine.

Install the necessary dependencies by running npm install in the project directory.

Configure your MetaMask wallet to connect to the Goerli testnet.

Deploy the nUSD smart contract to the Goerli testnet using Truffle. Update the deployment details in truffle-config.js.

Start a local development server by running npm run dev.

Access the DApp in your browser and connect MetaMask to interact with the nUSD smart contract.

Contributions
Contributions to this project are welcome! If you find any issues or have ideas for improvements, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.
