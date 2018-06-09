/*启动请求所有结点的编号
 * 将结点编号转换为一个对象
 * {
 *     结点编号: 结点在页面上的映射编号
 *     结点编号: 结点在页面上的映射编号
 *     结点编号: 结点在页面上的映射编号
 * }
 * */

$(async () =>
{
    try
    {
        const {getAll, getType} = await getAllNodesInfo();
        // 建立页面结点与ID的映射
        if (getAll.code === CODE.SUCCESS)
        {
            const {nodes} = getAll.data;

            //TODO: 生产环境去除
            if (DEBUG)
            {
                console.log(`服务器发送节点数据`);
                console.log(nodes);
            }

            for (let i = 0; i < nodes.length; i++)
            {
                originalIdToPageId[nodes[i].trim()] = i;   // 建立映射关系
                pageIdToOriginalId[i] = nodes[i].trim();
            }

            //TODO: 生产环境去除
            if (DEBUG)
            {
                console.log(`前端映射`);
                console.log(originalIdToPageId);
            }
        }
        else
        {
            await showNotice(getAll.msg);
        }

        // 显示结点类型对应图片
        if (getType.code === CODE.SUCCESS)
        {
            // 全部预先写入类型为0
            const $icons = $('.icon');
            for(const icon of $icons)
            {
                $(icon).attr('data-deviceType', '0');//把结点设备的种类记录到DOM上
                //$icon.css('background-image', `url('./images/${TYPE[0]}.png')`);
                $(icon).css('background-image', `url('./images/0.png')`);
            }

            const {data} = getType;
            const {TYPE} = DEVICE;
            for (let originalId in data)
            {
                if (data.hasOwnProperty(originalId))
                {
                    originalId = originalId.trim();
                    const pageId = originalIdToPageId[originalId];
                    const typeId = data[originalId];
                    const $icon = $(`.icon[data-nodeid=${pageId}]`);
                    $icon.attr('data-deviceType', data[originalId]);//把结点设备的种类记录到DOM上
                    //$icon.css('background-image', `url('./images/${TYPE[typeId]}.png')`);
                    $icon.css('background-image', `url('./images/${typeId}.png')`);
                }
            }
        }
        else
        {
            await showNotice(getType.msg);
        }
    }
    catch (e)
    {
        console.log(e);
        await showNotice(MSG.ERROR)
            .catch(e =>
            {
                console.log(e);
            });
    }
    /*finally
    {
        /!*测试用显示设备类型 TODO: 生产环境去除*!/
        if (DEBUG)
        {
            const $icons = $('.icon');
            for (const icon of $icons)
            {
                const deviceType = $(icon).attr('data-deviceType');
                if (deviceType)
                {
                    $(icon).text(DEVICE.NAME_FOR_TEST[deviceType]);
                    $(icon).css({
                        fontSize: '0.5rem',
                        lineHeight: '2rem',
                        verticalAlign: '40%'
                    });
                }
            }
        }
    }*/
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
        //TODO: 生产环境去除
        if (DEBUG)
        {
            console.log(`新的连接状态 (原始数据)`);
            console.log(data);
        }

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
            startSeq = originalIdToPageId[startNode];
            endSeq = originalIdToPageId[endNode];
            processedLines[`${startSeq}-${endSeq}`] = true;
        }

        /*        // 清除所有无效数据（单向联通以及重复）
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

         }*/

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

    socket.on('nodeType', (data) =>
    {
        // 全部预先写入类型为0
        const $icons = $('.icon');
        for(const icon of $icons)
        {
            $(icon).attr('data-deviceType', '0');//把结点设备的种类记录到DOM上
            //$icon.css('background-image', `url('./images/${TYPE[0]}.png')`);
            $(icon).css('background-image', `url('./images/0.png')`);
        }

        const {TYPE} = DEVICE;
        for (let originalId in data)
        {
            if (data.hasOwnProperty(originalId))
            {
                originalId = originalId.trim();
                const pageId = originalIdToPageId[originalId];
                const typeId = data[originalId];
                const $icon = $(`.icon[data-nodeid=${pageId}]`);
                $icon.attr('data-deviceType', data[originalId]);//把结点设备的种类记录到DOM上
                $icon.css('background-image', `url('./images/${typeId}.png')`);
            }
        }
    });
});

