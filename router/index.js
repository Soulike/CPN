/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:55
 **/
const Router = require('koa-router');
const lib = require('../lib/lib');

router = new Router({
	prefix: '/cpn'
});

router.use(async (ctx, next) => {
	ctx.state.user = 0;
	await next();
});

lib.autoImport(__dirname , (tmpPath) => {
	require(tmpPath)(router);
});

const routes = router.routes();

module.exports = function a() {
	return routes;
};