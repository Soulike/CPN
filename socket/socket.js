/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:55
 **/
const getNodeStatus = require('../server/getNodeStatus');
module.exports = (io)=>{
	io.on('connect',function (socket) {
		socket.on('getNodeStatus',function () {
			let data = getNodeStatus();
			if(data){
				socket.emit('sendNodeStatus',data);
			}
			else {
				socket.emit('err',[]);
			}
		});
		socket.on('disconnect',function () {
			console.log('someone disconnect');
		})
	})
};