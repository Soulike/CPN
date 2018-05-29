async function getAsync(router, paramsObj = {})
{
    return new Promise(((resolve, reject) =>
    {
        axios.get(router, {params: paramsObj})
            .then((response) =>
            {
                resolve(response);
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
                resolve(response);
            })
            .catch((err) =>
            {
                reject(err);
            });
    }));
}