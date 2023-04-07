class PeerAlert {




	constructor(indices, cbc) {
		this.indices = indices;
		this.cbc = cbc;
	}

	process(attacker) {


		//global.sendAddrBalance

		for( i=0; i<global.sendAddrBalance.length; i++){
			if (global.sendAddrBalance[i]['add'] == attacker){
				global.sendAddrBalance[i]['bal'] = 0;
			}
		}
		
		console.log(global.smashingCoin);

		global.smashingCoin.blockchain.transactions = [];
		// for (const v of this.indices) {
		// 	if (v >= 1) {
		// 		console.log("Disconnected block number ", v, "due to a suspected double spending attack.");
		// 	}
		// }

		// for (const v of this.indices) {
		// 	this.cbc.pendingTransactions.splice(v, 1);

		// 	if (v <= this.cbc.blockchain.length - 1) {
		// 		this.cbc.blockchain[v + 1].precedingHash = null;
		// 		this.cbc.blockchain.splice(v, 1);
		// 	}

		// 	//this.indices.splice(this.indices.indexOf(v),1);

		// 	for (var i = 0; i < this.indices.length; i++) {
		// 		this.indices[i] -= 1;
		// 	}
		// }

		// return this.cbc;
	}
}

module.exports.PeerAlert = PeerAlert;