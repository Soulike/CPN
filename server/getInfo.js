/*
 * Created by liuchaorun
 * Date 18-6-6
 * Time 下午2:31
 **/
const fs = require('fs');
const config = require('../config/config');

let r = (string) => {
	return string[2] + string[3] + string[0] + string[1];
};

let data = [];
let info = fs.readFileSync(config.infoFilePath, 'utf-8');
info = info.split('\n');
for (let i of info) {
	if (i.length) {
		let divideI = i.split(',');
		let temp = {};
		for (let j of divideI) {
			let divideJ = j.split(':');
			if (divideJ[0].length === 8) {
				temp[r(divideJ[0])] = divideJ[1];
			}
			else {
				temp[divideJ[0]] = divideJ[1];
			}
		}
		data.push(temp);
	}
}

module.exports = (id) => {
	for (let i of data) {
		let keys = Object.keys(i);
		if (keys[0] === id) {
			delete i[id];
			return i;
		}
	}
	return false;
};