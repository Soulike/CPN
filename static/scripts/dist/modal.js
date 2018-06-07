'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 点击结点，在对应位置显示悬浮窗
/*
 * <div class="area">
 <span>ID:</span>
 <span class="nodeId">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
 </div>

 <label>输入框标签<input type="text"></label>

 <div class="radioArea">
 <span class="radioContent">标签</span>
 <label class="radioContent"><input type="checkbox">是</label>
 <label class="radioContent"><input type="checkbox">否</label>
 </div>
 * */
$(function () {
    var $icons = $('.icon');
    var $main = $('#main');
    $icons.click(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
            var pageId, nodeType, _$$position, top, left, $modal, $modalBody, $infoArea, $formArea, _DEVICE, PARAMETERS, _PARAMETERS_TYPE, DATA, CONTROL, SWITCH, parameters, paraId, _parameters$paraId, type, name, $node, _$node, _$node2, _ref2, code, msg, data, _paraId, $para, _ref3, minLeft, minTop, maxLeft, maxTop;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;

                            /*获得点击结点的ID和种类*/
                            pageId = $(e.target).attr('data-nodeid'); //得到结点页面ID

                            nodeType = $(e.target).attr('data-devicetype'); //得到结点设备种类

                            _$$position = $(e.target).position(), top = _$$position.top, left = _$$position.left; // 获得被点击结点在页面上的位置

                            $modal = $('<div class="modal" data-fornodeid="' + pageId + '">\n    <div class="modalHeaderArea">\n        <div class="modalHeader">\u7ED3\u70B9\u4FE1\u606F</div>\n        <div class="modalClose">\xD7</div>\n    </div>\n    <div class="modalBody">\n        <div class="area infoArea"></div>\n        <div class="area formArea"></div>\n    </div>\n    <div class="modalFooter">\n        <div class="btnArea">\n            <button class="btn confirmBtn" data-fornodeid="' + pageId + '">\u786E\u5B9A</button>\n            <button class="btn cancelBtn">\u53D6\u6D88</button>\n        </div>\n    </div>\n</div>');

                            /*在modal body当中存放适当的内容*/

                            $modalBody = $modal.find('.modalBody');
                            $infoArea = $modal.find('.infoArea');
                            $formArea = $modal.find('.formArea');
                            _DEVICE = DEVICE, PARAMETERS = _DEVICE.PARAMETERS;
                            _PARAMETERS_TYPE = PARAMETERS_TYPE, DATA = _PARAMETERS_TYPE.DATA, CONTROL = _PARAMETERS_TYPE.CONTROL, SWITCH = _PARAMETERS_TYPE.SWITCH;
                            parameters = PARAMETERS[nodeType]; //取得所有参数列表

                            _context4.t0 = regeneratorRuntime.keys(parameters);

                        case 12:
                            if ((_context4.t1 = _context4.t0()).done) {
                                _context4.next = 31;
                                break;
                            }

                            paraId = _context4.t1.value;

                            if (!parameters.hasOwnProperty(paraId)) {
                                _context4.next = 29;
                                break;
                            }

                            _parameters$paraId = parameters[paraId], type = _parameters$paraId.type, name = _parameters$paraId.name;

                            paraId = parseInt(paraId, 16) >= parseInt('029A', 16) ? paraId.toString() : '0' + paraId;
                            _context4.t2 = type;
                            _context4.next = _context4.t2 === DATA ? 20 : _context4.t2 === CONTROL ? 23 : _context4.t2 === SWITCH ? 26 : 29;
                            break;

                        case 20:
                            $node = $('<div class="area">\n <span class="label">' + name + '</span>\n <span data-paratype="data" data-paraid="' + paraId + '"></span>\n </div>');

                            $infoArea.append($node);
                            return _context4.abrupt('break', 29);

                        case 23:
                            _$node = $('<label class="control area">' + name + '<input data-paratype="control" data-paraid="' + paraId + '" type="text"></label>');

                            $formArea.append(_$node);
                            return _context4.abrupt('break', 29);

                        case 26:
                            _$node2 = $('<div class="radioArea" data-paratype="switch" data-paraid="' + paraId + '">\n <span class="label">' + name + '</span>\n <label class="radio">\n <input type="radio" value="true" name="' + paraId + 'Radio">\u5F00</label>\n <label class="radio">\n <input type="radio" value="false" name="' + paraId + 'Radio">\u5173</label>\n </div>');

                            $formArea.append(_$node2);
                            return _context4.abrupt('break', 29);

                        case 29:
                            _context4.next = 12;
                            break;

                        case 31:
                            _context4.next = 33;
                            return getNodeInfo(pageId);

                        case 33:
                            _ref2 = _context4.sent;
                            code = _ref2.code;
                            msg = _ref2.msg;
                            data = _ref2.data;

                            if (!(code === CODE.SUCCESS)) {
                                _context4.next = 55;
                                break;
                            }

                            for (_paraId in data) {
                                if (data.hasOwnProperty(_paraId)) {
                                    _paraId = _paraId.toUpperCase();
                                    $para = $modalBody.find('*[data-paraid="' + _paraId + '"]');

                                    if ($para.length !== 0) {
                                        if ($para.prop('tagName').toLowerCase() === 'div' && $para.attr('data-paratype') === 'switch') {
                                            $para.find('input[value=' + data[_paraId] + ']').prop('checked', 'true');
                                        } else if ($para.prop('tagName').toLowerCase() === 'input' && $para.attr('data-paratype') === 'control') {
                                            $para.val(data[_paraId]);
                                        } else if ($para.prop('tagName').toLowerCase() === 'span' && $para.attr('data-paratype') === 'data') {
                                            $para.text(data[_paraId]);
                                        }
                                    }
                                }
                            }

                            _context4.next = 41;
                            return getModalMaxPosition();

                        case 41:
                            _ref3 = _context4.sent;
                            minLeft = _ref3.minLeft;
                            minTop = _ref3.minTop;
                            maxLeft = _ref3.maxLeft;
                            maxTop = _ref3.maxTop;


                            $modal.css({
                                display: 'none',
                                position: 'absolute',
                                left: left < minLeft ? minLeft : left > maxLeft ? maxLeft : left,
                                top: top < minTop ? minTop : top > maxTop ? maxTop : top
                            });

                            $main.append($modal);

                            $modal.find('.modalClose').click(function () {
                                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.prev = 0;

                                                    e.preventDefault();
                                                    _context.next = 4;
                                                    return hideModal($modal);

                                                case 4:
                                                    _context.next = 9;
                                                    break;

                                                case 6:
                                                    _context.prev = 6;
                                                    _context.t0 = _context['catch'](0);

                                                    console.log(_context.t0);

                                                case 9:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, undefined, [[0, 6]]);
                                }));

                                return function (_x2) {
                                    return _ref4.apply(this, arguments);
                                };
                            }());

                            $modal.find('.cancelBtn').click(function () {
                                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.prev = 0;

                                                    e.preventDefault();
                                                    _context2.next = 4;
                                                    return hideModal($modal);

                                                case 4:
                                                    _context2.next = 9;
                                                    break;

                                                case 6:
                                                    _context2.prev = 6;
                                                    _context2.t0 = _context2['catch'](0);

                                                    console.log(_context2.t0);

                                                case 9:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, undefined, [[0, 6]]);
                                }));

                                return function (_x3) {
                                    return _ref5.apply(this, arguments);
                                };
                            }());

                            /*提交数据格式
                             * {
                             *     id: 设备的id
                             *     data: {
                             *         '0291': balabala,    // 字段数据
                             *         '0292': true,    // 复选框数据，开是true，关是false
                             *     }
                             * }
                             * */
                            $modal.find('.confirmBtn').click(function () {
                                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
                                    var _$formArea, $switches, $controls, temp, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, s, $checked, _paraId2, value, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, c, _paraId3, _ref7, _code, _msg, _data;

                                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    _context3.prev = 0;

                                                    e.preventDefault();
                                                    _$formArea = $modal.find('.formArea');
                                                    $switches = _$formArea.find('div[data-paratype=switch]');
                                                    $controls = _$formArea.find('input[data-paratype=control]');
                                                    temp = {
                                                        id: getOriginalId(pageId),
                                                        data: {}
                                                    };
                                                    _iteratorNormalCompletion = true;
                                                    _didIteratorError = false;
                                                    _iteratorError = undefined;
                                                    _context3.prev = 9;


                                                    for (_iterator = $switches[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                                        s = _step.value;
                                                        $checked = $(s).find('input[checked=true]');
                                                        _paraId2 = $(s).attr('data-paraid');
                                                        value = $checked.attr('value') === 'true';

                                                        temp.data[_paraId2] = value;
                                                    }

                                                    _context3.next = 17;
                                                    break;

                                                case 13:
                                                    _context3.prev = 13;
                                                    _context3.t0 = _context3['catch'](9);
                                                    _didIteratorError = true;
                                                    _iteratorError = _context3.t0;

                                                case 17:
                                                    _context3.prev = 17;
                                                    _context3.prev = 18;

                                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                                        _iterator.return();
                                                    }

                                                case 20:
                                                    _context3.prev = 20;

                                                    if (!_didIteratorError) {
                                                        _context3.next = 23;
                                                        break;
                                                    }

                                                    throw _iteratorError;

                                                case 23:
                                                    return _context3.finish(20);

                                                case 24:
                                                    return _context3.finish(17);

                                                case 25:
                                                    _iteratorNormalCompletion2 = true;
                                                    _didIteratorError2 = false;
                                                    _iteratorError2 = undefined;
                                                    _context3.prev = 28;
                                                    for (_iterator2 = $controls[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                        c = _step2.value;
                                                        _paraId3 = $(c).attr('data-paraid');
                                                        value = $(c).val();

                                                        temp.data[_paraId3] = value;
                                                    }

                                                    _context3.next = 36;
                                                    break;

                                                case 32:
                                                    _context3.prev = 32;
                                                    _context3.t1 = _context3['catch'](28);
                                                    _didIteratorError2 = true;
                                                    _iteratorError2 = _context3.t1;

                                                case 36:
                                                    _context3.prev = 36;
                                                    _context3.prev = 37;

                                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                        _iterator2.return();
                                                    }

                                                case 39:
                                                    _context3.prev = 39;

                                                    if (!_didIteratorError2) {
                                                        _context3.next = 42;
                                                        break;
                                                    }

                                                    throw _iteratorError2;

                                                case 42:
                                                    return _context3.finish(39);

                                                case 43:
                                                    return _context3.finish(36);

                                                case 44:
                                                    _context3.next = 46;
                                                    return postAsync('/cpn/node/modify', temp);

                                                case 46:
                                                    _ref7 = _context3.sent;
                                                    _code = _ref7.code;
                                                    _msg = _ref7.msg;
                                                    _data = _ref7.data;
                                                    _context3.next = 52;
                                                    return showNotice(_msg, _code === CODE.SUCCESS);

                                                case 52:
                                                    if (!(_code === CODE.SUCCESS)) {
                                                        _context3.next = 55;
                                                        break;
                                                    }

                                                    _context3.next = 55;
                                                    return hideModal($modal);

                                                case 55:
                                                    _context3.next = 62;
                                                    break;

                                                case 57:
                                                    _context3.prev = 57;
                                                    _context3.t2 = _context3['catch'](0);

                                                    console.log(_context3.t2);
                                                    _context3.next = 62;
                                                    return showNotice('设备信息修改失败').catch(function (e) {
                                                        console.log(e);
                                                    });

                                                case 62:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, undefined, [[0, 57], [9, 13, 17, 25], [18,, 20, 24], [28, 32, 36, 44], [37,, 39, 43]]);
                                }));

                                return function (_x4) {
                                    return _ref6.apply(this, arguments);
                                };
                            }());

                            _context4.next = 53;
                            return fadeInAsync($modal, 150);

                        case 53:
                            _context4.next = 57;
                            break;

                        case 55:
                            _context4.next = 57;
                            return showNotice(msg);

                        case 57:
                            _context4.next = 64;
                            break;

                        case 59:
                            _context4.prev = 59;
                            _context4.t3 = _context4['catch'](0);

                            console.log(_context4.t3);
                            _context4.next = 64;
                            return showNotice('设备信息获取失败').catch(function (e) {
                                console.log(e);
                            });

                        case 64:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[0, 59]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());
});