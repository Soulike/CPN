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
$(() =>
{
    const $icons = $('.icon');
    const $main = $('#main');
    $icons.click(async (e) =>
    {
        try
        {
            /*获得点击结点的ID和种类*/
            const pageId = $(e.target).attr('data-nodeid');//得到结点页面ID
            const nodeType = $(e.target).attr('data-devicetype');//得到结点设备种类

            const {top, left} = $(e.target).position();// 获得被点击结点在页面上的位置

            const $modal = $(`<div class="modal" data-fornodeid="${pageId}">
    <div class="modalHeaderArea">
        <div class="modalHeader">结点信息</div>
        <div class="modalClose">×</div>
    </div>
    <div class="modalBody">
        <div class="area infoArea"></div>
        <div class="area formArea"></div>
    </div>
    <div class="modalFooter">
        <div class="btnArea">
            <button class="btn confirmBtn" data-fornodeid="${pageId}">确定</button>
            <button class="btn cancelBtn">取消</button>
        </div>
    </div>
</div>`);

            /*在modal body当中存放适当的内容*/
            const $modalBody = $modal.find('.modalBody');
            const $infoArea = $modal.find('.infoArea');
            const $formArea = $modal.find('.formArea');
            const {PARAMETERS} = DEVICE;
            const {DATA, CONTROL, SWITCH} = PARAMETERS_TYPE;
            const parameters = PARAMETERS[nodeType];//取得所有参数列表

            for (let paraId in parameters)//paraId 是不同参数的id
            {
                if (parameters.hasOwnProperty(paraId))
                {
                    paraId.trim();
                    const {type, name} = parameters[paraId];
                    /*TODO: 启用babel后开启
                    paraId = parseInt(paraId, 16) >= parseInt('029A', 16) ? paraId.toString() : `0${paraId}`;*/
                    switch (type)//根据type，添加不同内容
                    {
                        case DATA:
                        {
                            const $node = $(`<div class="area">
 <span class="label">${name}</span>
 <span data-paratype="data" data-paraid="${paraId}"></span>
 </div>`);
                            $infoArea.append($node);
                            break;
                        }
                        case CONTROL:
                        {
                            const $node = $(`<label class="control area">${name}<input data-paratype="control" data-paraid="${paraId}" type="text"></label>`);
                            $formArea.append($node);
                            break;
                        }
                        case SWITCH:
                        {
                            const $node = $(`<div class="radioArea" data-paratype="switch" data-paraid="${paraId}">
 <span class="label">${name}</span>
 <label class="radio">
 <input type="radio" value="true" name="${paraId}Radio">开</label>
 <label class="radio">
 <input type="radio" value="false" name="${paraId}Radio">关</label>
 </div>`);
                            $formArea.append($node);
                            break;
                        }
                    }
                }
            }

            const {code, msg, data} = await getNodeInfo(pageId);//获取被点击的结点的信息
            if (code === CODE.SUCCESS)
            {
                for (let paraId in data)
                {
                    if (data.hasOwnProperty(paraId))
                    {
                        paraId = paraId.trim();
                        paraId = paraId.toUpperCase();
                        const $para = $modalBody.find(`*[data-paraid="${paraId}"]`);
                        if ($para.length !== 0)
                        {
                            if ($para.prop('tagName').toLowerCase() === 'div' && $para.attr('data-paratype') === 'switch')
                            {
                                $para.find(`input[value=${data[paraId]}]`).prop('checked', 'true');
                            }
                            else if ($para.prop('tagName').toLowerCase() === 'input' && $para.attr('data-paratype') === 'control')
                            {
                                $para.val(data[paraId]);
                            }
                            else if ($para.prop('tagName').toLowerCase() === 'span' && $para.attr('data-paratype') === 'data')
                            {
                                $para.text(data[paraId]);
                            }
                        }
                    }
                }

                const {minLeft, minTop, maxLeft, maxTop} = await getModalMaxPosition();

                $modal.css({
                    display: 'none',
                    position: 'absolute',
                    left: left < minLeft ? minLeft : left > maxLeft ? maxLeft : left,
                    top: top < minTop ? minTop : top > maxTop ? maxTop : top
                });

                $main.append($modal);

                $modal.find('.modalClose').click(async (e) =>
                {
                    try
                    {
                        e.preventDefault();
                        await hideModal($modal);
                    }
                    catch (e)
                    {
                        console.log(e);
                    }
                });

                $modal.find('.cancelBtn').click(async (e) =>
                {
                    try
                    {
                        e.preventDefault();
                        await hideModal($modal);
                    }
                    catch (e)
                    {
                        console.log(e);
                    }
                });

                /*提交数据格式
                 * {
                 *     id: 设备的id
                 *     data: {
                 *         '0291': balabala,    // 字段数据
                 *         '0292': true,    // 复选框数据，开是true，关是false
                 *     }
                 * }
                 * */
                $modal.find('.confirmBtn').click(async (e) =>
                {
                    try
                    {
                        e.preventDefault();
                        const $formArea = $modal.find('.formArea');
                        const $switches = $formArea.find('div[data-paratype=switch]');
                        const $controls = $formArea.find('input[data-paratype=control]');

                        let temp = {
                            id: getOriginalId(pageId),
                            data: {}
                        };

                        for (const s of $switches)
                        {
                            const $checked = $(s).find('input[checked=true]');
                            const paraId = $(s).attr('data-paraid');
                            const value = $checked.attr('value') === 'true';
                            temp.data[paraId] = value;
                        }

                        for (const c of $controls)
                        {
                            const paraId = $(c).attr('data-paraid');
                            const value = $(c).val();
                            temp.data[paraId] = value;
                        }

                        const {code, msg, data} = await postAsync('/cpn/node/modify', temp);
                        await showNotice(msg.trim(), code === CODE.SUCCESS);
                        if (code === CODE.SUCCESS)
                        {
                            await hideModal($modal);
                        }
                    }
                    catch (e)
                    {
                        console.log(e);
                        await showNotice('设备信息修改失败')
                            .catch(e =>
                            {
                                console.log(e);
                            });
                    }
                });

                await fadeInAsync($modal, 150);
            }
            else
            {
                await showNotice(msg.trim());
            }
        }
        catch (e)
        {
            console.log(e);
            await showNotice('设备信息获取失败')
                .catch(e =>
                {
                    console.log(e);
                });
        }
    });
});
