/*
 * Created by liuchaorun
 * Date 18-5-23
 * Time 上午10:53
 **/
const Koa = require('koa');
const static_server = require('koa-static');
const bodyParser = require('koa-bodyparser');

const route = require('./router/index');

const app = new Koa();

app.use(static_server(__dirname + '/static'));
app.use(bodyParser());

app.use(route());

module.exports = app;