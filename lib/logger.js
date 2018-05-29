/*
 * Created by liuchaorun
 * Date 18-5-29
 * Time 下午3:41
 **/
const log4js = require('log4js');
const path = require('path');
log4js.configure({
	appenders : {
		console: {type: 'console'},
		cheeseLogs: {type: 'file', filename: path.join(__dirname, '../log/err.log')}
	},
	categories: {
		cheese: {appenders: ['cheeseLogs'], level: 'error'},
		another: {appenders: ['console'], level: 'trace'},
		default: {appenders: ['console', 'cheeseLogs'], level: 'trace'}
	}
});
let logger = log4js.getLogger('cpn');
logger.level = 'ERROR';
module.exports = logger;