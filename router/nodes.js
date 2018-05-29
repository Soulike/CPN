/*
 * Created by liuchaorun
 * Date 18-5-29
 * Time 下午3:23
 **/
const fs = require('fs');
const path = require('path');
module.exports = (router)=>{
	let prefix = url => `/nodes${url}`;

	router.get(prefix('/getAll'),async(ctx,next)=>{
		let nodesFile = fs.readFileSync(path.join(__dirname,'../test/nodes.txt'));

		await next;
	});
};