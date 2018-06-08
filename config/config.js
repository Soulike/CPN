/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:56
 **/
const path = require('path');
let config = {
	leftFlag:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
	nextNodeNumber:6,
	nodesNumber:10, //节点个数
	nodesFilePath:path.join(__dirname,'../test/nodes.txt'), //节点信息地址
	nodesTopoPath:path.join(__dirname,'../test/topo.txt'), //节点连接信息地址
	infoFilePath:path.join(__dirname,'../test/jinlei.txt'), //节点值地址
	nodesInfoFeedbackPath:path.join(__dirname,'../test/type.txt') //节点信息写回地址
};
module.exports = config;