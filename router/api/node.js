/*
 * Created by liuchaorun
 * Date 18-6-7
 * Time 下午12:17
 **/
const getInfo = require('../../server/getInfo');
const lib = require('../../lib/lib');
const modifyInfo = require('../../server/modifyInfo');
const config = require('../../config/config');
const nodeInfoConfig = require('../../config/nodeInfo.config');
module.exports = (router)=>{
	let prefix = url => `/node${url}`;
	router.get(prefix('/get'),async(ctx,next)=>{
		let id = ctx.request.query.id;
		let data = getInfo.getById(id);
		if(data){
			lib.msgTranslate(ctx,0,'获取信息成功！',data);
		}
		else{
			lib.msgTranslate(ctx,1,'文件信息错误，查无此id！',{});
		}
		await next();
	});
	router.post(prefix('/modify'),async(ctx,next)=>{
		let r = (string) => {
			return string[2] + string[3] + string[0] + string[1];
		};
		let data = ctx.request.body;
		let operatorString = '';
		let start = nodeInfoConfig.start;
		let nodesType = getInfo.getType();
		if(nodesType[data.id.toString()]>=nodeInfoConfig.typeMin&&nodesType[data.id.toString()]<=nodeInfoConfig.typeMax){
			for (let i in data.data){
				operatorString += `$${parseInt(i.toString(),16)-parseInt(start[nodesType[data.id.toString()] - 1],16) + 2} = "${r(i)}0000:${data.data[i]}";`
			}
			await modifyInfo(data.id.toString(),operatorString,config.nodesInfoFeedbackPath);
			lib.msgTranslate(ctx,0,'修改成功,正在下发！',{});
		}else{
			lib.msgTranslate(ctx,2,'节点类型未定义！',{});
		}
		await next();
	});
};