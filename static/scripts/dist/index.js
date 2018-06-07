'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*启动请求所有结点的编号
 * 将结点编号转换为一个对象
 * {
 *     结点编号: 结点在页面上的映射编号
 *     结点编号: 结点在页面上的映射编号
 *     结点编号: 结点在页面上的映射编号
 * }
 * */

$(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _ref2, getAll, getType, nodes, i, data, _DEVICE, TYPE, nodesId, nodeNum, $icon, $icons, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, icon, deviceType;

    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return getAllNodesInfo();

                case 3:
                    _ref2 = _context.sent;
                    getAll = _ref2.getAll;
                    getType = _ref2.getType;

                    if (!(getAll.code === CODE.SUCCESS)) {
                        _context.next = 13;
                        break;
                    }

                    nodes = getAll.data.nodes;

                    //TODO: 生产环境去除

                    if (DEBUG) {
                        console.log('\u670D\u52A1\u5668\u53D1\u9001\u8282\u70B9\u6570\u636E');
                        console.log(nodes);
                    }

                    for (i = 0; i < nodes.length; i++) {
                        originalIdToPageId[nodes[i].trim()] = i; // 建立映射关系
                        pageIdToOriginalId[i] = nodes[i].trim();
                    }

                    //TODO: 生产环境去除
                    if (DEBUG) {
                        console.log('\u524D\u7AEF\u6620\u5C04');
                        console.log(originalIdToPageId);
                    }
                    _context.next = 15;
                    break;

                case 13:
                    _context.next = 15;
                    return showNotice(getAll.msg);

                case 15:
                    if (!(getType.code === CODE.SUCCESS)) {
                        _context.next = 21;
                        break;
                    }

                    data = getType.data;
                    _DEVICE = DEVICE, TYPE = _DEVICE.TYPE;

                    for (nodesId in data) {
                        if (data.hasOwnProperty(nodesId)) {
                            nodeNum = originalIdToPageId[nodesId.trim()];
                            $icon = $('.icon[data-nodeid=' + nodeNum + ']');

                            $icon.attr('data-deviceType', data[nodesId]); //把结点设备的种类记录到DOM上
                            $icon.css('background-image', 'url(\'./images/' + TYPE[data[nodesId]] + '.png\')');
                        }
                    }
                    _context.next = 23;
                    break;

                case 21:
                    _context.next = 23;
                    return showNotice(getType.msg);

                case 23:
                    _context.next = 30;
                    break;

                case 25:
                    _context.prev = 25;
                    _context.t0 = _context['catch'](0);

                    console.log(_context.t0);
                    _context.next = 30;
                    return showNotice(MSG.ERROR).catch(function (e) {
                        console.log(e);
                    });

                case 30:
                    _context.prev = 30;

                    if (!DEBUG) {
                        _context.next = 52;
                        break;
                    }

                    $icons = $('.icon');
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 36;

                    for (_iterator = $icons[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        icon = _step.value;
                        deviceType = $(icon).attr('data-deviceType');

                        $(icon).text(DEVICE.NAME_FOR_TEST[deviceType]);
                    }
                    _context.next = 44;
                    break;

                case 40:
                    _context.prev = 40;
                    _context.t1 = _context['catch'](36);
                    _didIteratorError = true;
                    _iteratorError = _context.t1;

                case 44:
                    _context.prev = 44;
                    _context.prev = 45;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 47:
                    _context.prev = 47;

                    if (!_didIteratorError) {
                        _context.next = 50;
                        break;
                    }

                    throw _iteratorError;

                case 50:
                    return _context.finish(47);

                case 51:
                    return _context.finish(44);

                case 52:
                    return _context.finish(30);

                case 53:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[0, 25, 30, 53], [36, 40, 44, 52], [45,, 47, 51]]);
})));

/*Socket 部分*/
$(function () {
    var socket = io('http://' + SERVER.DOMAIN + ':' + SERVER.PORT);

    socket.on('connect', function () {
        console.log('socket 连接成功');
    });

    socket.on('disconnect', function () {
        console.log('socket 断开，进行重连');
    });

    socket.on('nodeStatus', function (data) {
        var startSeq = void 0,
            endSeq = void 0; // 结点在页面上的编号
        var processedLines = {};
        /*
         * 已经处理过的线对象，用于检查是否有正反不一致现象
         * 格式
         * {
         *     0-1: true,   // true 是连接状态
         * }
         * 在data处理完成之后检查这个对象，如果seq反转后没有值，就删除这个属性（认为其没有连接）
         * */
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) // 结点的实际编号
            {
                var _ref3 = _step2.value;
                var startNode = _ref3.startNode;
                var endNode = _ref3.endNode;

                // 得到映射关系
                startSeq = originalIdToPageId[startNode];
                endSeq = originalIdToPageId[endNode];
                processedLines[startSeq + '-' + endSeq] = true;
            }

            // 清除所有无效数据（单向联通以及重复）
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        for (var key in processedLines) {
            if (processedLines.hasOwnProperty(key)) {
                var nodeNums = key.split('-');
                // 如果反过来找不到（单向联通），则删除本键
                if (Object.is(processedLines[nodeNums[1] + '-' + nodeNums[0]], undefined)) {
                    delete processedLines[key];
                }
                // 如果是双向联通的，且是重复数据，则删除本键
                else if (parseInt(nodeNums[0]) > parseInt(nodeNums[1])) {
                    delete processedLines[key];
                }
            }
        }

        //TODO: 生产环境去除
        if (DEBUG) {
            console.log('\u65B0\u7684\u8FDE\u63A5\u72B6\u6001');
            console.log(processedLines);
        }

        /*筛选完毕后，将进行迭代。如果a-b在对象中不存在，就删除connected属性*/
        for (var i = 0; i < 42; i++) //出发点最大编号41
        {
            for (var j = i + 1; j < 48 && j - i <= 6; j++) //结束点最大编号48且两者最大差值6
            {
                if (j - i === 1 || j - i === 6) // 相邻才做判断，否则忽略
                {
                    if (Object.is(processedLines[i + '-' + j], undefined)) {
                        $('.line[data-connectnodes=' + i + '-' + j + ']').removeClass('connected');
                    } else if (processedLines[i + '-' + j] === true) {
                        $('.line[data-connectnodes=' + i + '-' + j + ']').addClass('connected');
                    }
                }
            }
        }
    });
});