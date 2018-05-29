/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:56
 **/
const fs = require('fs');
const path = require('path');

let lib = (function () {
	let autoImport = (nextPath,callback) => {
		let isDir = fs.statSync(nextPath).isDirectory();
		if(isDir){
			fs
				.readdirSync(nextPath)
				.filter((file) => {
					return file !== "index.js" && file !== "migrate.js" && file.indexOf(".") !== 0;
				}).forEach((fileName) => {
				let tmpPath = path.join(nextPath,fileName);
				if(fs.statSync(tmpPath).isDirectory()){
					autoImport(tmpPath,callback);
				}else{
					callback(tmpPath);
				}
			});
		}
	};
	let msgTranslate = (ctx,code,msg,data)=>{
		ctx.response.status = 200;
		ctx.body = {
			code:code,
			msg:msg,
			data:data
		}
	};
	return{
		autoImport,
		msgTranslate
	}
}());

module.exports = lib;