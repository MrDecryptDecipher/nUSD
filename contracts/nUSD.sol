// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract nUSD {
    string public constant name = "nUSD";
    string public constant symbol = "nUSD";
    uint8 public constant decimals = 18;

    mapping(address => uint256) private balances;
    uint256 private totalSupply;

    address private oracleAddress;
    uint256 private ethPrice;

    event Deposit(address indexed account, uint256 ethAmount, uint256 nusdAmount);
    event Redeem(address indexed account, uint256 nusdAmount, uint256 ethAmount);

    constructor(address _oracleAddress) {
        oracleAddress = _oracleAddress;
    }

    function deposit(uint256 _ethAmount) external {
        require(_ethAmount > 0, "Invalid ETH amount");

        // Fetch ETH price from the oracle
        ethPrice = getEthPrice();

        // Calculate the amount of nUSD to mint
        uint256 nusdAmount = (_ethAmount * 10**decimals) / (ethPrice * 2);

        // Mint new nUSD tokens
        balances[msg.sender] += nusdAmount;
        totalSupply += nusdAmount;

        emit Deposit(msg.sender, _ethAmount, nusdAmount);
    }

    function redeem(uint256 _nusdAmount) external {
        require(_nusdAmount > 0, "Invalid nUSD amount");

        // Fetch ETH price from the oracle
        ethPrice = getEthPrice();

        // Calculate the amount of ETH to redeem
        uint256 ethAmount = (_nusdAmount * ethPrice * 2) / (10**decimals);

        // Burn nUSD tokens
        require(balances[msg.sender] >= _nusdAmount, "Insufficient nUSD balance");
        balances[msg.sender] -= _nusdAmount;
        totalSupply -= _nusdAmount;

        emit Redeem(msg.sender, _nusdAmount, ethAmount);
    }

    function getEthPrice() private view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(oracleAddress);
        (, int256 latestPrice, , , ) = priceFeed.latestRoundData();
        require(latestPrice > 0, "Invalid ETH price from the oracle");
        return uint256(latestPrice);
    }

    function balanceOf(address _account) external view returns (uint256) {
        return balances[_account];
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }
}
