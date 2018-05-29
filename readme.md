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
