/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:55
 **/
const Router = require('koa-router');
const logger = require('../lib/logger');
const lib = require('../lib/lib');

router = new Router({
	prefix: '/cpn'
});

router.use(async(ctx,next)=>{
	try {
		await next();
	}
	catch (e) {
		logger.error(e);
		lib.msgTranslate(ctx,500,'服务器错误!',{});
	}
});

lib.autoImport(__dirname , (tmpPath) => {
	require(tmpPath)(router);
});

const routes = router.routes();

module.exports = function a() {
	return routes;
};