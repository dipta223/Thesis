const { PeerAlert } = require('./PeerAlert');

class NetworkObserver {
	constructor(pending_transactions, cbc) {
		this.pending_transactions = pending_transactions;
		this.cbc = cbc;
	}

	//Function to get transaction records of all sender addresses in a blockchain
	getRecords(sendAddr) {
		for (const address of sendAddr) {
			var initial_balance = global.smashingCoin.getBalanceOfAddress(address);
			console.log("\nAddress : " + address + "\nBalance : " + initial_balance);
			//Number of Transactions for the blockchain
			var num = 0;
			//Total amount to pay based on number of transactions
			var total_payment_amt = 0;
			//Array to store transaction amounts from this address
			var amts = new Array();

			for (const trans of this.pending_transactions) {

				if (trans.fromAddress === address) {
					num = num + 1;
					total_payment_amt = total_payment_amt + trans.amount;
					amts.push(trans.amount);
				}
			}



			this.check_DoubleSpendingAttack(total_payment_amt, initial_balance, num, address, amts);

		}
		return initial_balance;
	}

	//Function to check for double spending attacks
	check_DoubleSpendingAttack(total, balance, num, address, amts) {
		console.log("\nNumber of pending transactions from address: ");
		console.log(address + " is:" + num);
		console.log("\nTotal payment amount is: (" + amts + ")");
		console.log("\nTotal amount : " + total + "\nBalance is : " + balance);
		if (0 > balance && num > 1) {
			console.log("\nYour transaction has been aborted due to double-spending attack.");

			var indices = [];

			for (i = 0; i < this.pending_transactions.length; i++) {
				if (this.pending_transactions[i].fromAddress === address) {
					this.pending_transactions[i] = "Double Spending";
				}
			}

			const peeralert = new PeerAlert(indices, this.cbc);
			this.cbc = peeralert.process(address);

		}
		//console.log(this.pending_transactions.length);

		// for(const trans of this.pending_transactions){
		// 	console.log(trans);
		// }


	}
}

module.exports.NetworkObserver = NetworkObserver;