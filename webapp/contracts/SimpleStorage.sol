// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    // Define struct to hold the data
    struct Data {
        address accountAddress;
        uint256 timestamp;
        string string1;
        string string2;
    }

    // Declare state variable to store the data
    Data public storedData;

    // Define event to log data updates
    event DataUpdated(address indexed accountAddress, uint256 indexed timestamp, string string1, string string2);

    // Function to set the data
    function setData(address _accountAddress, string memory _string1, string memory _string2) public {
        storedData.accountAddress = _accountAddress;
        storedData.timestamp = block.timestamp; // Store current block timestamp
        storedData.string1 = _string1;
        storedData.string2 = _string2;

        // Emit event to log data update
        emit DataUpdated(_accountAddress, block.timestamp, _string1, _string2);
    }

    // Function to get the stored data
    function getData() public view returns (address, uint256, string memory, string memory) {
        return (storedData.accountAddress, storedData.timestamp, storedData.string1, storedData.string2);
    }
}
