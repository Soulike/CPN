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



// let string = '';
// for (let i of data){
// 	for (let j in i){
// 		if(j==='id'){
// 			string += i[j];
// 			string += ',';
// 		}
// 		else if(j==='type'){
// 			//do nothing
// 		}
// 		else{
// 			let n = r(j);
// 			string += `${n}0000:${i[j]},`;
// 		}
// 	}
// 	string+='\n';
// }
// fs.writeFileSync(config.nodesInfoFeedbackPath,string);

module.exports = {
	getById:(id) => {
		let typeNumber = [13, 9, 7, 7, 18, 10, 5, 5, 21, 6, 10, 10];
		let data = [];
		let info = fs.readFileSync(config.infoFilePath, 'utf-8');
		info = info.split('\n');
		for (let i of info) {
			if (i.length) {
				let divideI = i.split(',');
				let temp = {};
				if(divideI[divideI.length - 1] === '') divideI.pop();
				for (let j of divideI) {
					if(j !== ''){
						let divideJ = j.split(':');
						if (divideJ[0].length === 8) {
							temp[r(divideJ[0]).trim()] = divideJ[1].trim();
						}
						else {
							temp.id = divideJ[0];
							temp.type = divideJ[1];
						}
					}
				}
				if(divideI.length <= typeNumber[parseInt(temp.type[1],16) - 1]){
					for (let z = 0; z < typeNumber[parseInt(temp.type[1],16) - 1]; ++z) {
						let n = (145 + z).toString(16).toUpperCase();
						temp[`02${n}`] = 'FFFFFFFF';
					}
				}
				data.push(temp);
			}
		}
		for (let i of data) {
			if (i.id === id) {
				delete i.id;
				return i;
			}
		}
		return false;
	},
	getType:()=>{
		let typeNumber = [13, 9, 7, 7, 18, 10, 5, 5, 21, 6, 10, 10];
		let data = [];
		let info = fs.readFileSync(config.infoFilePath, 'utf-8');
		info = info.split('\n');
		for (let i of info) {
			if (i.length) {
				let divideI = i.split(',');
				let temp = {};
				if(divideI[divideI.length - 1] === '') divideI.pop();
				for (let j of divideI) {
					if(j !== ''){
						let divideJ = j.split(':');
						if (divideJ[0].length === 8) {
							temp[r(divideJ[0]).trim()] = divideJ[1].trim();
						}
						else {
							temp.id = divideJ[0];
							temp.type = divideJ[1];
						}
					}
				}
				if(divideI.length <= typeNumber[parseInt(temp.type[1],16) - 1]){
					for (let z = 0; z < typeNumber[parseInt(temp.type[1],16) - 1]; ++z) {
						let n = (145 + z).toString(16).toUpperCase();
						temp[`02${n}`] = 'FFFFFFFF';
					}
				}
				data.push(temp);
			}
		}
		let temp = {};
		for (let i of data){
			temp[i.id] = parseInt(i.type[1],16);
		}
		return temp;
	}
};