/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午11:21
 **/
const fs = require('fs');
const config = require('../config/config');

module.exports = ()=>{
	let data = fs.readFileSync(config.nodesTopoPath,'utf-8');
	let link = [];
	data = data.split('\n');
	data.pop();
	for (let i of data){
		let node = i.split(',');
		node.pop();
		if(node.length !== config.nextNodeNumber+1){
			return false;
		}
		for (let j of node){
			if(j!==node[0]&&j!==config.leftFlag){
				link.push({startNode:node[0].trim(),endNode:j.trim()});
			}
		}
	}
	return link;
};