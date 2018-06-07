async function getAsync(router, paramsObj = {})
{
    return new Promise(((resolve, reject) =>
    {
        axios.get(router, {params: paramsObj})
            .then((response) =>
            {
                resolve(response.data);
            })
            .catch((err) =>
            {
                reject(err);
            });
    }));
}

async function postAsync(router, dataObj = {})
{
    return new Promise(((resolve, reject) =>
    {
        axios.post(router, dataObj)
            .then((response) =>
            {
                resolve(response.data);
            })
            .catch((err) =>
            {
                reject(err);
            });
    }));
}

/* 并发获取结点ID以及类型，返回值
 * {
 *     getAll:{},
 *     getType:{}
 * }
 * */

async function getAllNodesInfo()
{
    return new Promise((async (resolve, reject) =>
    {
        try
        {
            const info = await Promise.all([
                getAsync('/cpn/nodes/getAll'),
                getAsync('/cpn/nodes/getType')
            ]);
            resolve({
                getAll: info[0],
                getType: info[1]
            });
        }
        catch (e)
        {
            reject(e);
        }
    }));
}

// nodeId为在页面上的id
async function getNodeInfo(pageId)
{
    return new Promise((async (resolve, reject) =>
    {
        try
        {
            const originalId = getOriginalId(pageId);
            resolve(await getAsync('/cpn/node/get', {id: originalId}));
        }
        catch (e)
        {
            reject(e);
        }
    }));
}

async function fadeOutAsync(selector, time)
{
    return new Promise(((resolve, reject) =>
    {
        try
        {
            $(selector).fadeOut(time, () =>
            {
                resolve();
            });
        }
        catch (e)
        {
            reject(e);
        }
    }));
}

async function fadeInAsync(selector, time)
{
    return new Promise(((resolve, reject) =>
    {
        try
        {
            $(selector).fadeIn(time, () =>
            {
                resolve();
            });
        }
        catch (e)
        {
            reject(e);
        }
    }));
}

async function showNotice(content, isSuccess = false)
{
    return new Promise((async (resolve, reject) =>
    {
        try
        {
            const $node = $(`<div class="notice ${isSuccess ? 'noticeSuccess' : 'noticeFailure'}">${content}</div>`);
            const $body = $('body');
            $node.css('display', 'none');
            $body.append($node);
            await fadeInAsync($node, 250);
            setTimeout(async () =>
            {
                await fadeOutAsync($node, 250);
                $node.remove();
                resolve();
            }, 1000);
        }
        catch (e)
        {
            reject(e);
        }
    }));

}

async function hideModal(selector)
{
    return new Promise((async (resolve, reject) =>
    {
        try
        {
            await fadeOutAsync($(selector), 150);
            $(selector).remove();
            resolve();
        }
        catch (e)
        {
            reject(e);
        }
    }));
}

// 获取四个角结点的位置，以确定模态框放置的边界
async function getModalMaxPosition()
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            const pos0 = $('div[data-nodeid=0]').position();
            const minLeft = pos0.left;
            const minTop = pos0.top;
            const pos47 = $('div[data-nodeid=47]').position();
            const maxLeft = pos47.left;
            const maxTop = pos47.top;
            resolve(
                {
                    minLeft,
                    minTop,
                    maxLeft: maxLeft - 18 * EM,
                    maxTop: maxTop - 16 * EM
                }
            );
        }
        catch (e)
        {
            reject(e);
        }
    });

}

function getPageId(originalId)
{
    return originalIdToPageId[originalId.toString().trim()];
}

function getOriginalId(pageId)
{
    return pageIdToOriginalId[pageId.toString().trim()];
}