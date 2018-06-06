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
            const nodeId = $(e.target).attr('data-nodeid');//得到结点页面ID
            const nodeType = $(e.target).attr('data-devicetype');//得到结点设备种类

            const {code, msg, data} = await getNodeInfo(nodeId);

            const {top, left} = $(e.target).position();
            const $modal = $(`<div class="modal" data-fornodeid="1">
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
            <button class="btn confirmBtn">确定</button>
            <button class="btn cancelBtn">取消</button>
        </div>
    </div>
</div>`);

            /*在modal body当中存放适当的内容*/
            const $infoArea = $modal.find('.infoArea');
            const $formArea = $modal.find('.formArea');
            const {PARAMETERS} = DEVICE;
            const {DATA, CONTROL, SWITCH} = PARAMETERS_TYPE;
            const parameters = PARAMETERS[nodeType];//取得所有参数列表

            for (const paraId in parameters)
            {
                if (parameters.hasOwnProperty(paraId))
                {
                    const {type, name} = parameters[paraId];
                    switch (type)//根据type，添加不同内容
                    {
                        case DATA:
                        {
                            const $node = $(`<div class="area">
 <span class="label">${name}</span>
 <span id="${paraId}Data"></span>
 </div>`);
                            $infoArea.append($node);
                            break;
                        }
                        case CONTROL:
                        {
                            const $node = $(`<label class="control">${name}<input id="${paraId}Data" type="text"></label>`);
                            $formArea.append($node);
                            break;
                        }
                        case SWITCH:
                        {
                            const $node = $(`<div class="radioArea">
 <span class="label">${name}</span>
 <label class="radio">
 <input type="radio" id="${paraId}Yes" value="true" name="${paraId}radio">开</label>
 <label class="radio">
 <input type="radio" id="${paraId}No" value="false" name="${paraId}radio">关</label>
 </div>`);
                            $formArea.append($node);
                            break;
                        }
                    }
                }
            }

            if (code === CODE.SUCCESS)
            {
                for (const paraId in data)
                {
                    if (data.hasOwnProperty(paraId))
                    {
                        const $para = $(`#${paraId}Data`);
                        const $yes = $(`#${paraId}Yes`);
                        const $no = $(`#${paraId}No`);
                        if ($para.length !== 0)
                        {
                            if ($para.prop('tagName').toLowerCase() === 'input')
                            {
                                $para.val(data[paraId]);
                            }
                            else if ($para.prop('tagName').toLowerCase() === 'span')
                            {
                                $para.text(data[paraId]);
                            }
                        }
                        else if ($yes.length !== 0 && $no.length !== 0)
                        {
                            // TODO: 如何决定选中谁，根据实际数据再进行修改
                            if (data[paraId] === true)
                            {
                                $yes.attr('checked', 'true');
                            }
                            else
                            {
                                $no.attr('checked', 'true');
                            }
                        }
                    }
                }
            }
            else
            {
                await showNotice(msg);
            }

            $modal.css({
                display: 'none',
                left: left,
                top: top < 130 ? 130 : top > 400 ? 400 : top
            });

            $modal.find('.modalClose').click(async (e) =>
            {
                e.preventDefault();
                await fadeOutAsync($modal, 150);
                $modal.remove();
            });
            $modal.find('.cancelBtn').click(async (e) =>
            {
                e.preventDefault();
                await fadeOutAsync($modal, 150);
                $modal.remove();
            });
            $main.append($modal);
            await fadeInAsync($modal, 150);
        }
        catch (e)
        {
            console.log(e);
            await showNotice('设备信息获取失败');
        }
    });
});