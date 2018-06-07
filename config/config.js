/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:56
 **/
const path = require('path');
let config = {
	leftFlag:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
	nextNodeNumber:6,
	nodesNumber:10,
	nodesFilePath:path.join(__dirname,'../test/nodes.txt'),
	nodesTypePath:path.join(__dirname,'../test/type.txt'),
	nodesTopoPath:path.join(__dirname,'../test/topo.txt'),
	infoFilePath:path.join(__dirname,'../test/jinlei.txt')
};
module.exports = config;