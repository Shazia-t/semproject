// Replace 'contractAddress' with the address of your deployed contract
const contractAddress = '0xDcEB2Ed6ac954F309BF8A15582a1703D6FD98f67';

// Check if MetaMask is installed and enabled
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');

    // Request account access if needed
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function(accounts) {
            // Retrieve the current user's Ethereum address
            const address = accounts[0];
            console.log('Current user address:', address);
        })
        .catch(function(error) {
            // Handle error
            console.error('Error:', error);
        });
} else {
    console.error('MetaMask is not installed!');
}


// Replace 'contractAbi' with the ABI of your contract
const SimpleStorage = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accountAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_string1",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_string2",
                "type": "string"
            }
        ],
        "name": "setData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getData",
        "outputs": [
            {
                "internalType": "address",
                "name": "accountAddress",
                "type": "address"
            },
        
            {
                "internalType": "string",
                "name": "string1",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "string2",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "accountAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "string1",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "string2",
                "type": "string"
            }
        ],
        "name": "DataUpdated",
        "type": "event"
    }
];


// Create a new instance of the web3 object
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Create a contract instance
const contract = new web3.eth.Contract(SimpleStorage, contractAddress);
const accountAddress = '0x1234567890123456789012345678901234567890'; // Replace with a valid Ethereum address
const string1 = 'Hello';
const string2 = 'World';
const timestamp = Math.floor(Date.now() / 1000); 
// Button event listeners
document.getElementById('setButton').addEventListener('click', async () => {
    try {
        await contract.methods.setData(accountAddress, string1, string2).send({ from: '0xd98171ee3CD82452135A8DfcA1F1F940a68f3197' });
        document.getElementById('result').innerText = 'Stored data set to 42';
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('getButton').addEventListener('click', async () => {
    contract.methods.getData().call()
    .then(result => {
        console.log('Account Address:', result.accountAddress);
        console.log('Timestamp:', result.timestamp);
        console.log('String 1:', result.string1);
        console.log('String 2:', result.string2);
    })
    .catch(error => {
        console.error('Error occurred');
    });
});
