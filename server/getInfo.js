/*
 * Created by liuchaorun
 * Date 18-6-6
 * Time 下午2:31
 **/
const fs = require('fs');
const config = require('../config/config');
const logger = require('../lib/logger');
const nodeInfoConfig = require('../config/nodeInfo.config');

let r = (string) => {
	return string[2] + string[3] + string[0] + string[1];
};

module.exports = {
	getById:(id) => {
		let typeNumber = nodeInfoConfig.typeNumber;
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
				if(parseInt(temp.type[1],16)>=nodeInfoConfig.typeMin && parseInt(temp.type[1],16) <= nodeInfoConfig.typeMax){
					if(divideI.length <= typeNumber[parseInt(temp.type[1],16) - 1]){
						for (let z = 0; z < typeNumber[parseInt(temp.type[1],16) - 1]; ++z) {
							let n = (145 + z).toString(16).toUpperCase();
							temp[`02${n}`] = 'FFFFFFFF';
						}
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
		let typeNumber = nodeInfoConfig.typeNumber;
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
				if(parseInt(temp.type[1],16)>=nodeInfoConfig.typeMin && parseInt(temp.type[1],16) <= nodeInfoConfig.typeMax){
					if(divideI.length <= typeNumber[parseInt(temp.type[1],16) - 1]){
						for (let z = 0; z < typeNumber[parseInt(temp.type[1],16) - 1]; ++z) {
							let n = (145 + z).toString(16).toUpperCase();
							temp[`02${n}`] = 'FFFFFFFF';
						}
					}
				}
				data.push(temp);
			}
		}
		let temp = {};
		for (let i of data){
			if(parseInt(i.type[1],16)>0&&parseInt(i.type[1],16)<13){
				temp[i.id] = parseInt(i.type[1],16);
			}else{
				temp[i.id] = 0;
				logger.error(`${temp[i.id] = parseInt(i.type[1],16)}没有该类型的匹配,重新定义为0！`);
				//throw new Error(`${temp[i.id] = parseInt(i.type[1],16)}没有该类型的匹配`);
			}
		}
		return temp;
	}
};