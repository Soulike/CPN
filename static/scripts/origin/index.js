/*TODO: 根据不同结点种类显示不同图标；5X7版本；悬浮框，包含两个文本内容：ID、其他信息（待定）以及一个表单，包含一个文本框和是否选择框、确定取消*/

/*启动请求所有结点的编号
 * 将结点编号转换为一个对象
 * {
 *     结点编号: 结点在页面上的映射编号
 *     结点编号: 结点在页面上的映射编号
 *     结点编号: 结点在页面上的映射编号
 * }
 * */

let mapping = {};    // 结点实际编号与网页编号的映射关系

$(async () =>
{
    const {code, msg, data} = (await getAsync('/cpn/nodes/getAll')).data;
    if (code === CODE.SUCCESS)
    {
        const {nodes} = data;

        //TODO: 生产环境去除
        if (DEBUG)
        {
            console.log(`服务器发送节点数据`);
            console.log(nodes);
        }

        for (let i = 0; i < nodes.length; i++)
        {
            mapping[nodes[i].trim()] = i;   // 建立映射关系
        }

        //TODO: 生产环境去除
        if (DEBUG)
        {
            console.log(`前端映射`);
            console.log(mapping);
        }
    }

    //TODO: 获取结点类型并显示对应图片
});

/*Socket 部分*/
$(() =>
{
    const socket = io(`http://${SERVER.DOMAIN}:${SERVER.PORT}`);

    socket.on('connect', () =>
    {
        console.log('socket 连接成功');
    });

    socket.on('disconnect', () =>
    {
        console.log('socket 断开，进行重连');
    });

    socket.on('nodeStatus', (data) =>
    {
        let startSeq, endSeq;   // 结点在页面上的编号
        let processedLines = {};
        /*
         * 已经处理过的线对象，用于检查是否有正反不一致现象
         * 格式
         * {
         *     0-1: true,   // true 是连接状态
         * }
         * 在data处理完成之后检查这个对象，如果seq反转后没有值，就删除这个属性（认为其没有连接）
         * */
        for (const {startNode, endNode} of data)    // 结点的实际编号
        {
            // 得到映射关系
            startSeq = mapping[startNode];
            endSeq = mapping[endNode];
            processedLines[`${startSeq}-${endSeq}`] = true;
        }

        // 清除所有无效数据（单向联通以及重复）
        for (const key in processedLines)
        {
            if (processedLines.hasOwnProperty(key))
            {
                const nodeNums = key.split('-');
                // 如果反过来找不到（单向联通），则删除本键
                if (Object.is(processedLines[`${nodeNums[1]}-${nodeNums[0]}`], undefined))
                {
                    delete processedLines[key];
                }
                // 如果是双向联通的，且是重复数据，则删除本键
                else if (parseInt(nodeNums[0]) > parseInt(nodeNums[1]))
                {
                    delete processedLines[key];
                }
            }

        }

        //TODO: 生产环境去除
        if (DEBUG)
        {
            console.log(`新的连接状态`);
            console.log(processedLines);
        }

        /*筛选完毕后，将进行迭代。如果a-b在对象中不存在，就删除connected属性*/
        for (let i = 0; i < 42; i++)//出发点最大编号41
        {
            for (let j = i + 1; j < 48 && j - i <= 6; j++)//结束点最大编号48且两者最大差值6
            {
                if (j - i === 1 || j - i === 6) // 相邻才做判断，否则忽略
                {
                    if (Object.is(processedLines[`${i}-${j}`], undefined))
                    {
                        $(`.line[data-connectnodes=${i}-${j}]`).removeClass('connected');
                    }
                    else if (processedLines[`${i}-${j}`] === true)
                    {
                        $(`.line[data-connectnodes=${i}-${j}]`).addClass('connected');
                    }
                }
            }
        }
    });
});

// 在所有节点中显示标号，调试用
//TODO: 生产环境去除
$(() =>
{
    if (DEBUG)
    {
        const $icons = $('.icon');
        for (let icon of $icons)
        {
            $(icon).text($(icon).attr('data-nodeid'));
        }
    }
});