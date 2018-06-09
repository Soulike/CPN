/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:55
 **/
const cpnEvent = require('../lib/cpnEvents');
const getNodeStatus = require('../server/getNodeStatus');
const getInfo = require('../server/getInfo');
module.exports = (io)=>{
	io.on('connect',function (socket) {
		let data = getNodeStatus();
		if(data){
			socket.emit('nodeStatus',data);
		}
		cpnEvent.on('fileChange',function () {
			let data = getNodeStatus();
			if(data){
				console.log((new Date()).toLocaleTimeString()+'发送socket,数据包为节点连接信息');
				socket.emit('nodeStatus',data);
			}
		});

		cpnEvent.on('typeChange',function () {
			let data = getInfo.getType();
			if(data){
				console.log((new Date()).toLocaleTimeString()+'发送socket，数据包为节点种类信息');
				socket.emit('nodeType',data);
			}
		});

		socket.on('disconnect',function () {
			console.log('someone disconnect');
		})
	})
};