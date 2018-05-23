/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:56
 **/
const http = require('http');
const cluster = require('cluster');

const numCPUs = require("os").cpus().length;

const app = require('../index');

const pkg = require('../package');
const port = pkg.port;

const isDebug = process.env.DEBUG === "debug";

if (isDebug) {
	debug("Debug Mode");
	let server = http.createServer(app.callback());
	let io = require('socket.io')(server);
	require('../socket/socket')(io);
	server.listen(port);
} else {
	console.info("Production Mode");
	if (cluster.isMaster) {
		for (let i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
		cluster.on("exit", (worker, code, signal) => {
			console.error(`worker ${worker.process.pid} died, exit code is ${code}`);
		});
	} else {
		let server = http.createServer(app.callback());
		let io = require('socket.io')(server);
		require('../socket/socket')(io);
		server.listen(port);
	}
}