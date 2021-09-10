"use strict";

let crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
let poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

let blockchain = {
	blocks: [],
};

// Genesis block
blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// insert each line into blockchain
for (let line of poem) {
	blockchain.blocks.push(createBlock(line));
}

console.log(`blockchain is valid: ${verifyChain(blockchain)}`);

function createBlock(line) {
	let data = line;
	let index = blockchain.blocks.length;
	let prevHash = blockchain.blocks[blockchain.blocks.length - 1].hash;
	let timestamp = Date.now();

	let hash = blockHash(`${index} ${prevHash} ${data} ${timestamp}`);

	return {
		index,
		data,
		prevHash,
		timestamp,
		hash,
	};
}

function blockHash(bl) {
	return crypto.createHash("sha256").update(bl).digest("hex");
}

function verifyChain(blockchain) {
	let prevBlockHash = "000000";

	for (let block of blockchain.blocks) {
		// genesis block check
		if (block.index == 0 && block.hash == "000000") {
			console.log(`Genesis block verified`);
			continue;
		} else if (block.index == 0 && block.hash != "000000") {
			return false;
		}

		// block data check
		if (
			block.data &&
			block.prevHash &&
			block.index >= 0 &&
			block.hash ===
				blockHash(
					`${block.index} ${block.prevHash} ${block.data} ${block.timestamp}`
				)
		) {
			console.log(`Block #${block.index} verified`);
		} else {
			console.log(`Error r81, node ${block.index}`);
			return false;
		}

		// checks block links
		if (block.index > 0 && block.prevHash !== prevBlockHash) {
			console.log(`Error r87, node ${block.index}`);
			return false;
		}
		console.log(`hash: ${block.prevHash}\nprevHash: ${prevBlockHash} \n`);

		prevBlockHash = block.hash;
	}

	console.log("BLOCKCHAIN VERIFIED");
	return true;
}
