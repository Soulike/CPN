/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:55
 **/
const cpnEvent = require('../lib/cpnEvents');
const getNodeStatus = require('../server/getNodeStatus');
const logger = require('../lib/logger');
module.exports = (io)=>{
	io.on('connect',function (socket) {
		let data = getNodeStatus();
		if(data){
			socket.emit('nodeStatus',data);
		}
		cpnEvent.on('fileChange',function () {
			let data = getNodeStatus();
			if(data){
				console.log((new Date()).toLocaleTimeString()+'发送socket');
				logger.error(data);
				socket.emit('nodeStatus',data);
			}
		});
		socket.on('disconnect',function () {
			console.log('someone disconnect');
		})
	})
};