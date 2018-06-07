/*
 * Created by liuchaorun
 * Date 18-6-6
 * Time 下午3:57
 **/
const shell = require('shelljs');
let modifyInfo = function (id, string , file) {
	return new Promise(function (resolve, reject) {
		let sh = `awk 'BEGIN{FS=OFS=","} /${id}/ {${string}}1' ${file}  1<>${file}`;
		console.log(sh);
		shell.exec(sh,function (code, stdout, stderr) {
			if (code === 0){
				resolve('Success!');
			}
			else {
				reject(stderr);
			}
		})
	});
};

// modifyInfo('8666683506aacd900bbd5a74ac4edf00','$2 = "91020000:FFFFFFFF"','/home/lcr/WebstormProjects/CPN/test/jinlei.txt').then((r)=>{
// 	console.log(r);
// });
module.exports = modifyInfo;
