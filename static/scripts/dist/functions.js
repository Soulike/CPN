'use strict';

var getAsync = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(router) {
        var paramsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            axios.get(router, { params: paramsObj }).then(function (response) {
                                resolve(response.data);
                            }).catch(function (err) {
                                reject(err);
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getAsync(_x2) {
        return _ref.apply(this, arguments);
    };
}();

var postAsync = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(router) {
        var dataObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function (resolve, reject) {
                            axios.post(router, dataObj).then(function (response) {
                                resolve(response.data);
                            }).catch(function (err) {
                                reject(err);
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function postAsync(_x4) {
        return _ref2.apply(this, arguments);
    };
}();

/* 并发获取结点ID以及类型，返回值
 * {
 *     getAll:{},
 *     getType:{}
 * }
 * */

var getAllNodesInfo = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        return _context4.abrupt('return', new Promise(function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
                                var info;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.prev = 0;
                                                _context3.next = 3;
                                                return Promise.all([getAsync('/cpn/nodes/getAll'), getAsync('/cpn/nodes/getType')]);

                                            case 3:
                                                info = _context3.sent;

                                                resolve({
                                                    getAll: info[0],
                                                    getType: info[1]
                                                });
                                                _context3.next = 10;
                                                break;

                                            case 7:
                                                _context3.prev = 7;
                                                _context3.t0 = _context3['catch'](0);

                                                reject(_context3.t0);

                                            case 10:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this, [[0, 7]]);
                            }));

                            return function (_x5, _x6) {
                                return _ref4.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getAllNodesInfo() {
        return _ref3.apply(this, arguments);
    };
}();

// nodeId为在页面上的id


var getNodeInfo = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(pageId) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        return _context6.abrupt('return', new Promise(function () {
                            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
                                var originalId;
                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                _context5.prev = 0;
                                                originalId = getOriginalId(pageId);
                                                _context5.t0 = resolve;
                                                _context5.next = 5;
                                                return getAsync('/cpn/node/get', { id: originalId });

                                            case 5:
                                                _context5.t1 = _context5.sent;
                                                (0, _context5.t0)(_context5.t1);
                                                _context5.next = 12;
                                                break;

                                            case 9:
                                                _context5.prev = 9;
                                                _context5.t2 = _context5['catch'](0);

                                                reject(_context5.t2);

                                            case 12:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, _this2, [[0, 9]]);
                            }));

                            return function (_x8, _x9) {
                                return _ref6.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function getNodeInfo(_x7) {
        return _ref5.apply(this, arguments);
    };
}();

var fadeOutAsync = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(selector, time) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        return _context7.abrupt('return', new Promise(function (resolve, reject) {
                            try {
                                $(selector).fadeOut(time, function () {
                                    resolve();
                                });
                            } catch (e) {
                                reject(e);
                            }
                        }));

                    case 1:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function fadeOutAsync(_x10, _x11) {
        return _ref7.apply(this, arguments);
    };
}();

var fadeInAsync = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(selector, time) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        return _context8.abrupt('return', new Promise(function (resolve, reject) {
                            try {
                                $(selector).fadeIn(time, function () {
                                    resolve();
                                });
                            } catch (e) {
                                reject(e);
                            }
                        }));

                    case 1:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function fadeInAsync(_x12, _x13) {
        return _ref8.apply(this, arguments);
    };
}();

var showNotice = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(content) {
        var _this3 = this;

        var isSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        return _context11.abrupt('return', new Promise(function () {
                            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
                                var $node, $body;
                                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                    while (1) {
                                        switch (_context10.prev = _context10.next) {
                                            case 0:
                                                _context10.prev = 0;
                                                $node = $('<div class="notice ' + (isSuccess ? 'noticeSuccess' : 'noticeFailure') + '">' + content + '</div>');
                                                $body = $('body');

                                                $node.css('display', 'none');
                                                $body.append($node);
                                                _context10.next = 7;
                                                return fadeInAsync($node, 250);

                                            case 7:
                                                setTimeout(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                                                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                                        while (1) {
                                                            switch (_context9.prev = _context9.next) {
                                                                case 0:
                                                                    _context9.next = 2;
                                                                    return fadeOutAsync($node, 250);

                                                                case 2:
                                                                    $node.remove();
                                                                    resolve();

                                                                case 4:
                                                                case 'end':
                                                                    return _context9.stop();
                                                            }
                                                        }
                                                    }, _callee9, _this3);
                                                })), 1000);
                                                _context10.next = 13;
                                                break;

                                            case 10:
                                                _context10.prev = 10;
                                                _context10.t0 = _context10['catch'](0);

                                                reject(_context10.t0);

                                            case 13:
                                            case 'end':
                                                return _context10.stop();
                                        }
                                    }
                                }, _callee10, _this3, [[0, 10]]);
                            }));

                            return function (_x16, _x17) {
                                return _ref10.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, this);
    }));

    return function showNotice(_x15) {
        return _ref9.apply(this, arguments);
    };
}();

var hideModal = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(selector) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        return _context13.abrupt('return', new Promise(function () {
                            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(resolve, reject) {
                                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                                    while (1) {
                                        switch (_context12.prev = _context12.next) {
                                            case 0:
                                                _context12.prev = 0;
                                                _context12.next = 3;
                                                return fadeOutAsync($(selector), 150);

                                            case 3:
                                                $(selector).remove();
                                                resolve();
                                                _context12.next = 10;
                                                break;

                                            case 7:
                                                _context12.prev = 7;
                                                _context12.t0 = _context12['catch'](0);

                                                reject(_context12.t0);

                                            case 10:
                                            case 'end':
                                                return _context12.stop();
                                        }
                                    }
                                }, _callee12, _this4, [[0, 7]]);
                            }));

                            return function (_x19, _x20) {
                                return _ref13.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, this);
    }));

    return function hideModal(_x18) {
        return _ref12.apply(this, arguments);
    };
}();

// 获取四个角结点的位置，以确定模态框放置的边界


var getModalMaxPosition = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        return _context14.abrupt('return', new Promise(function (resolve, reject) {
                            try {
                                var pos0 = $('div[data-nodeid=0]').position();
                                var minLeft = pos0.left;
                                var minTop = pos0.top;
                                var pos47 = $('div[data-nodeid=47]').position();
                                var maxLeft = pos47.left;
                                var maxTop = pos47.top;
                                resolve({
                                    minLeft: minLeft,
                                    minTop: minTop,
                                    maxLeft: maxLeft - 18 * EM,
                                    maxTop: maxTop - 16 * EM
                                });
                            } catch (e) {
                                reject(e);
                            }
                        }));

                    case 1:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));

    return function getModalMaxPosition() {
        return _ref14.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getPageId(originalId) {
    return originalIdToPageId[originalId.toString().trim()];
}

function getOriginalId(pageId) {
    return pageIdToOriginalId[pageId.toString().trim()];
}