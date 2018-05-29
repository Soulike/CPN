/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:55
 **/
const getNodeStatus = require('../server/getNodeStatus');
module.exports = (io)=>{
	io.on('connect',function (socket) {
		event.on('fileChange',function () {
			let data = getNodeStatus();
			if(data){
				socket.emit('nodeStatus',data);
			}
		});
		socket.on('disconnect',function () {
			console.log('someone disconnect');
		})
	})
};