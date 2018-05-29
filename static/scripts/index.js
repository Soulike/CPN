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
        for (let i = 0; i < nodes.length; i++)
        {
            mapping[nodes[i].trim()] = i;   // 建立映射关系
        }
        console.log(mapping);
    }
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

        console.log(processedLines);
        for (const key in processedLines)
        {
            if (processedLines.hasOwnProperty(key))
            {
                const nodeNums = key.split('-');
                if (Object.is(processedLines[`${nodeNums[1]}-${nodeNums[0]}`], undefined))  // 如果反过来找不到，则删除本键
                {
                    delete processedLines[key];
                }
            }
        }

        /*筛选完毕后，将进行48x48的迭代。如果a-b在对象中不存在，就删除connected属性*/
        for (let i = 0; i < 48; i++)
        {
            for (let j = 0; j < 48; j++)
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