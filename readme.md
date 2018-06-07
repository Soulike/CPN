## 请求
说明：返回数据的格式
```json
{
"code":"int",
"msg":"string",
"data":{}
}
```
### 获取所有节点编号
url:"/cpn/nodes/getAll"
请求类型：GET
```json
response.data:{
nodes:["string","string","string"]
}
```
### 获取节点类型
url:"/cpn/nodes/getType"
请求类型：GET
```json
response.data:{
"nodesId":"string"
}
```

### 获取单个结点所有属性信息

方法：GET

路由：/cpn/node/get

前端发送

```js
{id: 'balabala'} // 32位设备ID
```

后端回复

```js
response.data = {
    '0291': 'balabala', // 一般的数据字段
    '0292': true, // 控制信号复选框字段，true 为开启，false 为关闭
    '0293': '……'
}
```

### 提交前端修改结点信息

方法：POST

路由：/cpn/node/modify

前端发送

```js
{
    id: 'balabala' // 32位设备ID
    data: {
        '0291': 'balabala', // 一般的数据字段
        '0292': true, // 复选框数据，开是true，关是false
    }
}
```




## socket接口

### 连接
事件名:connect

### 获得节点数据
事件名：nodeStatus
返回数据格式
```
[ { startNode: '946651167866678048485051FAA04006',
    endNode: '31003000330031003100310031003100' },
  { startNode: '8466511678666780484850512A08C309',
    endNode: 'C56651167866678048485051779E8202' },
  { startNode: 'C56651167866678048485051779E8202',
    endNode: '8466511678666780484850512A08C309' },
  { startNode: 'C56651167866678048485051779E8202',
    endNode: '31003000330031003100310031003100' },
  { startNode: '31003000330031003100310031003100',
    endNode: '946651167866678048485051FAA04006' },
  { startNode: '31003000330031003100310031003100',
    endNode: 'C56651167866678048485051779E8202' } ]
```

### 断开连接
事件名：disconnect
