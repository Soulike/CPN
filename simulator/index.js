/*
 * Created by liuchaorun
 * Date 18-5-31
 * Time 下午1:16
 **/
const fs = require('fs');
const config = require('../config/config');
let nodes = [];
let nodesType = [];
let typeNumber = [13, 9, 7, 7, 18, 10, 5, 5, 21, 6, 10, 10];
for (let i = 0; i < 8; ++i) {
	let temp = [];
	for (let j = 0; j < 6; ++j) {
		temp.push(`8666683506aacd900bbd5a74ac4edf${i}${j}`);
	}
	nodes.push(temp);
}
let nodesString = '';
for (let i = 0; i < 8; ++i) {
	for (let j = 0; j < 6; ++j) {
		nodesString = nodesString + nodes[i][j] + '\n';
	}
}
fs.writeFileSync('../test/nodes.txt', nodesString);
let nodesTypeString = '';
for (let i = 0; i < 8; ++i) {
	let temp = [];
	for (let j = 0; j < 6; ++j) {
		temp.push(parseInt((Math.random() * 12).toString()) + 1);
		nodesTypeString = nodesTypeString + nodes[i][j] + `:${temp[j]}\n`;
	}
	nodesType.push(temp);
}
fs.writeFileSync('../test/type.txt', nodesTypeString);
let nodesTypeAtrribution = '';
for (let i = 0; i < 8; ++i) {
	for (let j = 0; j < 6; ++j) {
		let temp = `${nodes[i][j]}:0${nodesType[i][j].toString(16)}000000,`;

		for (let z = 0; z < typeNumber[nodesType[i][j] - 1]; ++z) {
			let n = (145 + z).toString(16).toUpperCase();
			temp += `${n}020000:FFFFFFFF,`;
		}
		nodesTypeAtrribution += temp;
		nodesTypeAtrribution += '\n';
	}
}
fs.writeFileSync('../test/jinlei.txt', nodesTypeAtrribution);

class edge {
	constructor(s, e, i) {
		this.start = s;
		this.end = e;
		this.is = i;
	}
}

class graph {
	constructor() {
		this.edges = [];
		for (let i = 0; i < 48; ++i) {
			if ((i + 1) % 6 !== 0) {
				if (parseInt(i / 6) % 2 === 0) this.edges.push(new edge(i, i + 1, true));
			}
			if (i + 6 < 48) {
				this.edges.push(new edge(i, i + 6, true));
			}
		}
	}

	randomGenerate() {
		for (let i = 0; i < this.edges.length; ++i) {
			this.edges[i].is = !!Math.round(Math.random());
			//this.edges[i].is = true;
		}
	}

	getLinkNode(nodePoint) {
		let n = [];
		for (let i of this.edges) {
			if (i.start === nodePoint && i.is) n.push(i.end);
			if (i.end === nodePoint && i.is) n.push(i.start);
		}
		return n;
	}
}

let g = new graph();

function generateTopo() {
	let nodesTopoString = '';
	g.randomGenerate();
	for (let i = 0; i < 8; ++i) {
		for (let j = 0; j < 6; ++j) {
			let linkNode = g.getLinkNode(i * 6 + j);
			nodesTopoString = nodesTopoString + nodes[i][j] + ',';
			for (let i of linkNode) {
				nodesTopoString = nodesTopoString + nodes[parseInt(i / 6)][i % 6] + ',';
			}
			for (let i = 0; i < 6 - linkNode.length; ++i) {
				nodesTopoString = nodesTopoString + config.leftFlag + ',';
			}
			nodesTopoString += '\n';
		}
	}
	fs.writeFileSync('../test/topo.txt', nodesTopoString);
	console.log((new Date()).toLocaleTimeString() + 'topo.txt生成成功！');
}

setInterval(generateTopo, 2000);