let nodeState = [];//8x6矩阵，每一个位置表示这个位置的结点是否是打开状态

$(function ()
{
    const nodeInit = [];
    for (let col = 0; col < 6; col++)
    {
        nodeInit.push(true);
    }
    for (let row = 0; row < 8; row++)
    {
        nodeState.push(Array.from(nodeInit));
    }
    init();
});


//根据nodeState初始化状态，后期这个二维数组应当从后端获得
function init()
{
    for (let row = 0; row < 8; row++)
    {
        for (let col = 0; col < 6; col++)
        {
            setNodeState(row, col, nodeState[row][col]);
        }
    }
}


//传入true设定在线，传入false设定离线
function setNodeState(row, col, isOnline)
{
    if (checkPos(row, col))
    {
        const $lines = $(`.${row}-${col}`);
        if ($lines.length !== 0)
        {
            if (isOnline === false)//如果设定离线，直接把所有相连的线断掉就好
            {
                nodeState[row][col] = false;
                $lines.removeClass('connected').addClass('disconnected');
                $(`#${row}-${col}`).removeClass('connected').addClass('disconnected');
            }
            else//如果设定在线，需要检查上下左右的线
            {
                nodeState[row][col] = true;
                setLineState(row, col, row - 1, col);
                setLineState(row, col, row + 1, col);
                setLineState(row, col, row, col - 1);
                setLineState(row, col, row, col + 1);
                $(`#${row}-${col}`).removeClass('disconnected').addClass('connected');
            }
        }
    }

    //检查传入的row和col有没有超出范围，返回true代表可行
    function checkPos(row, col)
    {
        return (row >= 0 && row <= 7 && col >= 0 && col <= 5);
    }

    //检查end结点的状态。end结点为开启，则点亮这条line。否则不做改变。
    function setLineState(startRow, startCol, endRow, endCol)
    {
        if (checkPos(endRow, endCol))
        {
            const state = nodeState[endRow][endCol];
            const $line = $(`.${startRow}-${startCol}.${endRow}-${endCol}`);
            if (state === true)
            {
                $line.removeClass('disconnected').addClass('connected');
            }
            else
            {
                $line.removeClass('connected').addClass('disconnected');
            }
        }
    }
}

/*远程服务器信息*/
const [DOMAIN, PORT] = ['172.6.1.141', 3000];


function AJAX(method, action, data, success_function, error_function)
{
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        timeout: 1000,
        isAsync: true,
        isFile: false,
        progressBarId: null,
        progressNumId: null
    };

    /*创建XHR对象，兼容所有浏览器*/

    /*来自于JavaScript高级编程*/
    function createXHR()
    {
        if (typeof XMLHttpRequest !== 'undefined')
        {
            return new XMLHttpRequest();
        }
        else if (typeof ActiveXObject !== 'undefined')
        {
            if (typeof arguments.callee.activeXString !== 'string')
            {
                var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
                var i, len;
                for (i = 0, len = versions.length; i < len; i++)
                {
                    try
                    {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    }
                    catch (ex)
                    {
                        //此处跳过
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
        else
        {
            throw new Error('No XHR object available');
        }
    }

    /*以下是正式的Ajax请求代码*/
    var xhr = createXHR();

    /*XHR对象相关设置*/
    //xhr.withCredentials = true; //允许跨域携带cookies

    /*进度条以及进度数字设置*/
    xhr.onprogress = function (event)
    {
        if (options.progressBarId !== null || options.progressNumId !== null)
        {
            var $progressBar = null;
            var $progressNum = null;
            if (options.progressBarId !== null)
            {
                $progressBar = document.getElementById(options.progressBarId);
            }
            if (options.progressNumId !== null)
            {
                $progressNum = document.getElementById(options.progressNumId);
            }

            if (event.lengthComputable) //利用progress事件附加的几个属性确定进度
            {
                var percentNum = event.position / event.total * 100;
                if ($progressBar !== null)
                {
                    $progressBar.setAttribute('width', percentNum);
                }
                if ($progressNum !== null)
                {
                    $progressNum.innerHTML = percentNum.toString();
                }
            }
        }
    };

    xhr.onload = function (event) //当请求完成的时候
    {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) //如果请求成功，调用成功回调函数
        {
            success_function(xhr.responseText);
        }
        else //反之，调用失败回调函数
        {
            error_function(xhr.status);
        }
    };

    xhr.open(method, 'http://' + DOMAIN + ':' + PORT + '/' + action, options.isAsync);


    if (options.isFile === false) //如果不是文件，来回都是json
    {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }
    else //如果是文件，则告知浏览器不作数据处理
    {
        xhr.setRequestHeader('Content-Type', 'false');
    }

    /*注意，超时时间设定项只能放在open之后send之前，否则会发生错误*/
    /*timeout属性在IE8以下以及一些老版本浏览器存在兼容性问题*/
    xhr.timeout = options.timeout; //超时时间设定
    xhr.ontimeout = function (event)
    {
        error_function('request timed out');
    };

    xhr.send(data);
}


$(function ()
{
    setInterval(() =>
    {
        AJAX('GET', 'get', {}, function (res)
            {
                res = JSON.parse(res);
                const {row, col, status} = res;
                setNodeState(row, col, status);
            },
            function (err)
            {
                console.log(err);
            });
    }, 1000);
});
