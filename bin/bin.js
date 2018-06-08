/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:56
 **/
const http = require('http');
const cluster = require('cluster');

const numCPUs = require("os").cpus().length;

const config = require('../config/config');
const app = require('../index');

const pkg = require('../package');
const port = pkg.port;

const isDebug = process.env.DEBUG === "debug";

const fs = require('fs');
const cpnEvent = require('../lib/cpnEvents');
//监控文件是否修改
fs.watchFile(config.nodesTopoPath, {
	persistent:true,
	interval:1000
}, function(cur, pre) {
	if (Date.parse(pre.ctime) === 0) {
		console.log('文件被创建');
	} else if (Date.parse(cur.ctime) === 0) {
		console.log('文件被删除');
	} else if (Date.parse(cur.mtime) !== Date.parse(pre.mtime)) {
		console.log((new Date()).toLocaleTimeString()+'文件被修改');
		cpnEvent.emit('fileChange')
	}
});

if (isDebug) {
	let server = http.createServer(app.callback());
	let io = require('socket.io')(server);
	require('../socket/socket')(io);
	server.listen(port);
} else {
	console.info("Production Mode");
	// if (cluster.isMaster) {
	// 	for (let i = 0; i < numCPUs; i++) {
	// 		cluster.fork();
	// 	}
	// 	cluster.on("exit", (worker, code, signal) => {
	// 		console.error(`worker ${worker.process.pid} died, exit code is ${code}`);
	// 	});
	// } else {
	// 	let server = http.createServer(app.callback());
	// 	let io = require('socket.io')(server);
	// 	require('../socket/socket')(io);
	// 	server.listen(port);
	// }
	let server = http.createServer(app.callback());
	let io = require('socket.io')(server);
	require('../socket/socket')(io);
	server.listen(port);
}