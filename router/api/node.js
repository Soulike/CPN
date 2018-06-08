/*
 * Created by liuchaorun
 * Date 18-6-7
 * Time 下午12:17
 **/
const getInfo = require('../../server/getInfo');
const lib = require('../../lib/lib');
const modifyInfo = require('../../server/modifyInfo');
const config = require('../../config/config');
module.exports = (router)=>{
	let prefix = url => `/node${url}`;
	router.get(prefix('/get'),async(ctx,next)=>{
		let id = ctx.request.query.id;
		let data = getInfo.getById(id);
		if(data){
			lib.msgTranslate(ctx,0,'获取信息成功！',data);
		}
		else{
			lib.msgTranslate(ctx,1,'文件错误！',{});
		}
		await next();
	});
	router.post(prefix('/modify'),async(ctx,next)=>{
		let r = (string) => {
			return string[2] + string[3] + string[0] + string[1];
		};
		let data = ctx.request.body;
		let operatorString = '';
		//let start = ['29a','297','296','296','29b','297','294','294','29b','295','297','297'];
		for (let i in data.data){
			operatorString += `$${parseInt(i.toString(),16)-parseInt('289',16)} = "${r(i)}0000:${data.data[i]}";`
		}
		await modifyInfo(data.id.toString(),operatorString,config.nodesInfoFeedbackPath);
		lib.msgTranslate(ctx,0,'修改成功！',{});
		await next();
	});
};