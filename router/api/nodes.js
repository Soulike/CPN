/*
 * Created by liuchaorun
 * Date 18-5-29
 * Time 下午3:23
 **/
const fs = require('fs');
const config = require('../../config/config');
const lib = require('../../lib/lib');
const getInfo = require('../../server/getInfo');
module.exports = (router)=>{
	let prefix = url => `/nodes${url}`;

	router.get(prefix('/getAll'),async(ctx,next)=>{
		let nodesFile = fs.readFileSync(config.nodesFilePath,'utf-8');
		let nodes = nodesFile.split('\n');
		if(nodes.length > config.nodesNumber) nodes.pop();
		lib.msgTranslate(ctx,0,'获取成功！',{nodes:nodes});
		await next;
	});

	router.get(prefix('/getType'),async(ctx,next)=>{
		let data = getInfo.getType();
		lib.msgTranslate(ctx,0,'获取类型成功！',data);
		await next();
	});
};