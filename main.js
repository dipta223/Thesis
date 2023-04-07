const { CryptoBlockchain, CryptoBlock, Transaction } = require('./CryptoBlockchain');
const { NetworkObserver } = require('./NetworkObserver');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('7fe38a7cd191b531376ed5db174624ff3a474b736d824d174677e32aeb703c29');
const Key1 = ec.keyFromPrivate('1c2e962350cbe889eeb39ab45728fa7e59624ad4d0b8af4f258a9dd439db3f8f');
const Key2 = ec.keyFromPrivate('af68820d23d0857f56aefba0382a631f6e4d54056cbf2ad8d2f64fcc7d34441d');
const myWalletAddress = myKey.getPublic('hex');
const address1 = Key1.getPublic('hex');
const address2 = Key2.getPublic('hex');


function fetchAddress() {
	const key = ec.genKeyPair();
	//generate a hexadecimal public key
	const publicKey = key.getPublic('hex');
	//generate a hexadecimal private key
	const privateKey = key.getPrivate('hex');
	const recvKey = ec.keyFromPrivate(privateKey);
	const recvWalletAddress = recvKey.getPublic('hex');

	return recvWalletAddress;
}

//console.log("\n\nInitial balance is: "+ 10);
const recv_address = fetchAddress();
new_address = fetchAddress();

console.log("-------------------CryptoBlockChain Start----------------------------");

global.smashingCoin = new CryptoBlockchain();

console.log("-------------------CryptoBlockChain End----------------------------");

const sendAddr = [address2, myWalletAddress, address1];
const recvAddr = [fetchAddress(), recv_address, new_address, fetchAddress()];

global.sendAddrBalance = [{add: address2 , bal: 10}, {add: myWalletAddress , bal: 10}, {add: address1 , bal: 10}];

console.log(sendAddrBalance.length);

console.log("-------------------Transaction Start----------------------------");

const tx2 = new Transaction(address1, fetchAddress(), 4);
tx2.signTransaction(Key1);
global.smashingCoin.addTransaction(tx2);

const tx3 = new Transaction(address2, fetchAddress(), 3);
tx3.signTransaction(Key2);
global.smashingCoin.addTransaction(tx3);

const tx4 = new Transaction(address2, fetchAddress(), 1);
tx4.signTransaction(Key2);
global.smashingCoin.addTransaction(tx4);

for( i=0; i<sendAddrBalance.length; i++){
	console.log(sendAddrBalance[i]['add'] + " ------------ " + sendAddrBalance[i]['bal']);
}

global.smashingCoin.minePendingTransactions(address2);

const ne = new NetworkObserver(global.smashingCoin.pendingTransactions, global.smashingCoin);
ne.getRecords(sendAddr);

global.smashingCoin.pendingTransactions = []

console.log('---------------------------------------------------------------------------------')

// console.log(global.smashingCoin.pendingTransactions);

const tx1 = new Transaction(myWalletAddress, recv_address, 6);
tx1.signTransaction(myKey);
global.smashingCoin.addTransaction(tx1);

const dsa_tx = new Transaction(myWalletAddress, new_address, 6);
dsa_tx.signTransaction(myKey);
global.smashingCoin.addTransaction(dsa_tx);

global.smashingCoin.minePendingTransactions(address1);

const nee = new NetworkObserver(global.smashingCoin.pendingTransactions, global.smashingCoin);
nee.getRecords(sendAddr);

global.smashingCoin.pendingTransactions = []

// console.log(global.smashingCoin.pendingTransactions);

for( i=0; i<sendAddrBalance.length; i++){
	console.log(sendAddrBalance[i]['add'] + " ------------ " + sendAddrBalance[i]['bal']);
}

// global.smashingCoin.minePendingTransactions(address1);


// console.log('---------------------------------------------------------------------------------')

// console.log("-------------------Transaction End----------------------------");

// console.log("\nThe current blockchain is:");
console.log(global.smashingCoin);          // printing object outputs the elements of constructor

// console.log("-------------------NetworkObserver Start----------------------------");

// // const ne = new NetworkObserver(global.smashingCoin.pendingTransactions, global.smashingCoin);
// // var inb = ne.getRecords(sendAddr);

// console.log("-------------------NetworkObserver End----------------------------");

// console.log("\nThe current blockchain is:");
// console.log(global.smashingCoin);

// for (var block in global.smashingCoin.blockchain) {
// 	if (block.precedingHash == null) {
// 		global.smashingCoin.blockchain.splice(global.smashingCoin.blockchain.indexOf(block), 1);
// 		let cb = new CryptoBlock(0, Date.now(), "0");
// 		global.smashingCoin.blockchain.push(cb);
// 	}
// }

// console.log("Current blockchain is:", global.smashingCoin);

// console.log("\nPerforming Transactions:");
// // console.log("Current balance of address ", address2, "is: " + smashingCoin.getBalanceOfAddress(address2, inb));
// // console.log("Current balance of address ", address1, "is: " + smashingCoin.getBalanceOfAddress(address1, 10));

