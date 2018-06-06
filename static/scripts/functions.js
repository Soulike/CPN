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

async function PostAsync(router, dataObj = {})
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
async function getNodeInfo(nodeId)
{
    return new Promise((async (resolve, reject) =>
    {
        try
        {
            const nodeOriginId = numberMapping[nodeId];
            resolve(await getAsync('/cpn/nodes/getNodeInfo', {id: nodeOriginId}));
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