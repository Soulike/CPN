const CODE = {
    SUCCESS: 0,
    SERVER_INTERNAL_ERROR: 500
};

const MSG = {
    ERROR: '网络错误'
};

const SERVER = {
    DOMAIN: '172.6.1.89',
    PORT: 3000
};

/*设备参数类型映射*/
const PARAMETERS_TYPE = {
    DATA: 1,
    CONTROL: 2,
    SWITCH: 3
};

const DEVICE = {
    /*设备的种类数字对应的名字，用于设定图标*/
    TYPE: {
        0: 'forTest',
        1: 'chiller',
        2: 'heatExchanger',
        3: 'chilledWaterPumps',
        4: 'coolingWaterPump',
        5: 'waterCollector',
        6: 'coolingTower',
        7: 'expansionTank',
        8: 'constantPressureWater',
        9: 'AirConditioningUnits',
        10: 'elevator',
        11: 'corridor',
        12: 'room'
    },

    NAME_FOR_TEST: {
        0: '未定义',
        1: '冷机组',
        2: '换热器',
        3: '冷冻泵',
        4: '冷却泵',
        5: '分集水',
        6: '冷却塔',
        7: '膨胀箱',
        8: '定压补',
        9: '空调组',
        10: '电梯',
        11: '走廊',
        12: '房间'
    },
    /*所有类型结设备的参数列表
     * 每个参数包含type和name
     * type：种类，目前是数据、控制和开关，对应数据显示、text和radio
     * name：这个字段的名字
     * */
    /* PARAMETERS: {
     1: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '蒸发器入口水温'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '蒸发器出口水温'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷凝器入口水温'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷凝器出口水温'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷水机组功率'
     },
     '0296': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷水机组累积用电量'
     },
     '0297': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷水机组 COP'
     },
     '0298': {
     type: PARAMETERS_TYPE.DATA,
     name: '水路阀门状态反馈'
     },
     '0299': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却水路阀门状态反馈'
     },
     '029A': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '冷冻水路阀门控制信号'
     },
     '029B': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '冷却水路阀门控制信号'
     },
     '029C': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '冷水机组启停控制信号'
     },
     '029D': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '蒸发器出口水温设定值'
     },
     },
     2: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '一次侧入口介质温度'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '一次侧出口介质温度'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '二次侧入口介质温度'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '二次侧出口介质温度'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '一次侧阀门状态反馈'
     },
     '0296': {
     type: PARAMETERS_TYPE.DATA,
     name: '二次侧阀门状态反馈'
     },
     '0297': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '一次侧阀门控制信号'
     },
     '0298': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '二次侧阀门控制信号'
     },
     '0299': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '二次侧出口介质温度设定值'
     }
     },
     3: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷冻水泵入口压力'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷冻水泵出口压力'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷冻水泵流量'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷冻水泵功率'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷冻水泵累积用电量'
     },
     '0296': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '冷冻水泵频率控制信号'
     },
     '0297': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '冷冻水泵出口压力设定值'
     }
     },
     4: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却水泵入口压力'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却水泵出口压力'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却水泵流量'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '功率'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却水泵累积用电量'
     },
     '0296': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '冷却水泵频率控制信号'
     },
     '0297': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '冷却水泵出口压力设定值'
     }
     },
     5: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '总管出水温度'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '总管回水温度'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '支管1回水温度'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '支管2回水温度'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '支管3回水温度'
     },
     '0296': {
     type: PARAMETERS_TYPE.DATA,
     name: '支管4回水温度'
     },
     '0297': {
     type: PARAMETERS_TYPE.DATA,
     name: '支管1阀门状态反馈'
     },
     '0298': {
     type: PARAMETERS_TYPE.DATA,
     name: '支管2阀门状态反馈'
     },
     '0299': {
     type: PARAMETERS_TYPE.DATA,
     name: '支管3阀门状态反馈'
     },
     '029A': {
     type: PARAMETERS_TYPE.DATA,
     name: '支管4阀门状态反馈'
     },
     '029B': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '支管1阀门控制信号'
     },
     '029C': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '支管2阀门控制信号'
     },
     '029D': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '支管3阀门控制信号'
     },
     '029E': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '支管4阀门控制信号'
     },
     '029F': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '支管1回水温度设定值'
     },
     '02A0': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '支管2回水温度设定值'
     },
     '02A1': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '支管3回水温度设定值'
     },
     '02A2': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '支管4回水温度设定值'
     }
     },
     6: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却塔冷却水入口水温'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却塔冷却水出口水温'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却塔风机功率'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却塔风机累积用电量'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却塔冷却水阀状态反馈'
     },
     '0296': {
     type: PARAMETERS_TYPE.DATA,
     name: '冷却塔补水阀状态反馈'
     },
     '0297': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '冷却塔风机频率'
     },
     '0298': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '冷却塔冷却水阀控制信号'
     },
     '0299': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '冷却塔补水阀控制信号'
     },
     '029A': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '冷却水出口温度设定值'
     }
     },
     7: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '水箱水温'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '水箱液位'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '进水阀状态反馈'
     },
     '0294': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '进水阀控制信号'
     },
     '0295': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '水箱液位设定值'
     }

     },
     8: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '补水箱液位'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '补水泵功率'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '补水泵累积用电量'
     },
     '0294': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '补水泵频率'
     },
     '0295': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '补水箱液位设定值'
     }
     },
     9: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '新风温度'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '新风相对湿度'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '回风温度'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '回风相对湿度'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '送风温度'
     },
     '0296': {
     type: PARAMETERS_TYPE.DATA,
     name: '送风相对湿度'
     },
     '0297': {
     type: PARAMETERS_TYPE.DATA,
     name: '送风压力'
     },
     '0298': {
     type: PARAMETERS_TYPE.DATA,
     name: '空调机组功率'
     },
     '0299': {
     type: PARAMETERS_TYPE.DATA,
     name: '空调机组累积耗电量'
     },
     '029A': {
     type: PARAMETERS_TYPE.DATA,
     name: '表冷器水阀状态反馈'
     },
     '029B': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '新风阀控制信号'
     },
     '029C': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '回风阀控制信号'
     },
     '029D': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '送风机频率控制信号'
     },
     '029E': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '回风机频率控制信号'
     },
     '029F': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '表冷器水阀控制信号'
     },
     '02A0': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '送风温度设定值'
     },
     '02A1': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '送风相对湿度设定值'
     },
     '02A2': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '送风压力设定值'
     },
     '02A3': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '回风温度设定值'
     },
     '02A4': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '回风相对湿度设定值'
     },
     '02A5': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '回风CO2浓度设定值'
     }
     },
     10: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '电梯运行状态反馈'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '电梯功率'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '电梯累积用电量'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '电梯承载人数'
     },
     '0295': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '电梯启停信号'
     },
     '0296': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '电梯到达楼层'
     }
     },
     11: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '走廊人数'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '走廊温度'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '走廊相对湿度'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '走廊状态传感器1'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '走廊状态传感器2'
     },
     '0296': {
     type: PARAMETERS_TYPE.DATA,
     name: '走廊是否为火源'
     },
     '0297': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '走廊状态报警信号'
     },
     '0298': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '逃生方向指示'
     },
     '0299': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '走廊照明控制信号'
     },
     '029A': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '走廊照度设定值'
     }
     },
     12: {
     '0291': {
     type: PARAMETERS_TYPE.DATA,
     name: '房间人数'
     },
     '0292': {
     type: PARAMETERS_TYPE.DATA,
     name: '房间温度'
     },
     '0293': {
     type: PARAMETERS_TYPE.DATA,
     name: '房间相对湿度'
     },
     '0294': {
     type: PARAMETERS_TYPE.DATA,
     name: '房间状态传感器1'
     },
     '0295': {
     type: PARAMETERS_TYPE.DATA,
     name: '房间状态传感器2'
     },
     '0296': {
     type: PARAMETERS_TYPE.DATA,
     name: '房间是否为火源'
     },
     '0297': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '房间状态报警信号'
     },
     '0298': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '逃生方向指示'
     },
     '0299': {
     type: PARAMETERS_TYPE.SWITCH,
     name: '房间照明控制信号'
     },
     '029A': {
     type: PARAMETERS_TYPE.CONTROL,
     name: '房间照度设定值'
     }
     }
     }*/

    PARAMETERS: {
        0: {},
        1: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '蒸发器入口水温'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '蒸发器出口水温'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷凝器入口水温'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷凝器出口水温'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷水机组功率'
            },
            '0296': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷水机组累积用电量'
            },
            '0297': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷水机组 COP'
            },
            '0298': {
                type: PARAMETERS_TYPE.DATA,
                name: '水路阀门状态反馈'
            },
            '0299': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却水路阀门状态反馈'
            },
            '029A': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷冻水路阀门控制信号'
            },
            '029B': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷却水路阀门控制信号'
            },
            '029C': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷水机组启停控制信号'
            },
            '029D': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '蒸发器出口水温设定值'
            }
        },
        2: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '一次侧入口介质温度'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '一次侧出口介质温度'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '二次侧入口介质温度'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '二次侧出口介质温度'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '一次侧阀门状态反馈'
            },
            '0296': {
                type: PARAMETERS_TYPE.DATA,
                name: '二次侧阀门状态反馈'
            },
            '0297': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '一次侧阀门控制信号'
            },
            '0298': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '二次侧阀门控制信号'
            },
            '0299': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '二次侧出口介质温度设定值'
            }
        },
        3: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷冻水泵入口压力'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷冻水泵出口压力'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷冻水泵流量'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷冻水泵功率'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷冻水泵累积用电量'
            },
            '0296': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷冻水泵频率控制信号'
            },
            '0297': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷冻水泵出口压力设定值'
            }
        },
        4: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却水泵入口压力'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却水泵出口压力'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却水泵流量'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '功率'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却水泵累积用电量'
            },
            '0296': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷却水泵频率控制信号'
            },
            '0297': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷却水泵出口压力设定值'
            }
        },
        5: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '总管出水温度'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '总管回水温度'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '支管1回水温度'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '支管2回水温度'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '支管3回水温度'
            },
            '0296': {
                type: PARAMETERS_TYPE.DATA,
                name: '支管4回水温度'
            },
            '0297': {
                type: PARAMETERS_TYPE.DATA,
                name: '支管1阀门状态反馈'
            },
            '0298': {
                type: PARAMETERS_TYPE.DATA,
                name: '支管2阀门状态反馈'
            },
            '0299': {
                type: PARAMETERS_TYPE.DATA,
                name: '支管3阀门状态反馈'
            },
            '029A': {
                type: PARAMETERS_TYPE.DATA,
                name: '支管4阀门状态反馈'
            },
            '029B': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '支管1阀门控制信号'
            },
            '029C': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '支管2阀门控制信号'
            },
            '029D': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '支管3阀门控制信号'
            },
            '029E': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '支管4阀门控制信号'
            },
            '029F': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '支管1回水温度设定值'
            },
            '02A0': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '支管2回水温度设定值'
            },
            '02A1': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '支管3回水温度设定值'
            },
            '02A2': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '支管4回水温度设定值'
            }
        },
        6: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却塔冷却水入口水温'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却塔冷却水出口水温'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却塔风机功率'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却塔风机累积用电量'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却塔冷却水阀状态反馈'
            },
            '0296': {
                type: PARAMETERS_TYPE.DATA,
                name: '冷却塔补水阀状态反馈'
            },
            '0297': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷却塔风机频率'
            },
            '0298': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷却塔冷却水阀控制信号'
            },
            '0299': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷却塔补水阀控制信号'
            },
            '029A': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '冷却水出口温度设定值'
            }
        },
        7: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '水箱水温'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '水箱液位'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '进水阀状态反馈'
            },
            '0294': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '进水阀控制信号'
            },
            '0295': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '水箱液位设定值'
            }

        },
        8: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '补水箱液位'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '补水泵功率'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '补水泵累积用电量'
            },
            '0294': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '补水泵频率'
            },
            '0295': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '补水箱液位设定值'
            }
        },
        9: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '新风温度'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '新风相对湿度'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '回风温度'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '回风相对湿度'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '送风温度'
            },
            '0296': {
                type: PARAMETERS_TYPE.DATA,
                name: '送风相对湿度'
            },
            '0297': {
                type: PARAMETERS_TYPE.DATA,
                name: '送风压力'
            },
            '0298': {
                type: PARAMETERS_TYPE.DATA,
                name: '空调机组功率'
            },
            '0299': {
                type: PARAMETERS_TYPE.DATA,
                name: '空调机组累积耗电量'
            },
            '029A': {
                type: PARAMETERS_TYPE.DATA,
                name: '表冷器水阀状态反馈'
            },
            '029B': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '新风阀控制信号'
            },
            '029C': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '回风阀控制信号'
            },
            '029D': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '送风机频率控制信号'
            },
            '029E': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '回风机频率控制信号'
            },
            '029F': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '表冷器水阀控制信号'
            },
            '02A0': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '送风温度设定值'
            },
            '02A1': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '送风相对湿度设定值'
            },
            '02A2': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '送风压力设定值'
            },
            '02A3': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '回风温度设定值'
            },
            '02A4': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '回风相对湿度设定值'
            },
            '02A5': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '回风CO2浓度设定值'
            }
        },
        10: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '电梯运行状态反馈'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '电梯功率'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '电梯累积用电量'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '电梯承载人数'
            },
            '0295': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '电梯启停信号'
            },
            '0296': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '电梯到达楼层'
            }
        },
        11: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '走廊人数'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '走廊温度'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '走廊相对湿度'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '走廊状态传感器1'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '走廊状态传感器2'
            },
            '0296': {
                type: PARAMETERS_TYPE.DATA,
                name: '走廊是否为火源'
            },
            '0297': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '走廊状态报警信号'
            },
            '0298': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '逃生方向指示'
            },
            '0299': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '走廊照明控制信号'
            },
            '029A': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '走廊照度设定值'
            }
        },
        12: {
            '0291': {
                type: PARAMETERS_TYPE.DATA,
                name: '房间人数'
            },
            '0292': {
                type: PARAMETERS_TYPE.DATA,
                name: '房间温度'
            },
            '0293': {
                type: PARAMETERS_TYPE.DATA,
                name: '房间相对湿度'
            },
            '0294': {
                type: PARAMETERS_TYPE.DATA,
                name: '房间状态传感器1'
            },
            '0295': {
                type: PARAMETERS_TYPE.DATA,
                name: '房间状态传感器2'
            },
            '0296': {
                type: PARAMETERS_TYPE.DATA,
                name: '房间是否为火源'
            },
            '0297': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '房间状态报警信号'
            },
            '0298': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '逃生方向指示'
            },
            '0299': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '房间照明控制信号'
            },
            '029A': {
                type: PARAMETERS_TYPE.CONTROL,
                name: '房间照度设定值'
            }
        }
    }
};

const DEBUG = true;

const EM = 15;

let originalIdToPageId = {};    // 结点实际编号与网页编号的映射关系
let pageIdToOriginalId = {}; 