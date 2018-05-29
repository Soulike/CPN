/*
 * Created by liuchaorun
 * Date 18-5-29
 * Time 下午3:49
 **/
const EventEmitter = require('events');

class cpnEvents extends EventEmitter {}

const cpnEvent = new cpnEvents();

module.exports = cpnEvent;