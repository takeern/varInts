### 简介
基于google protobuf 编码方式实现的类库，对于处理数字大小突变但是总体均衡的arraybuffer，有着不错的压缩效果，最佳压缩率达到75%。

### 原理
将这个数组[1, 2, 257]转换成buffer：（三种方法
1. 直接转成unit16array存储在buffer中占用6个字节。
2. 更节省的方式是将[1, 2]转换成unit8array，再将257转换成unit16array，再将连个buffer连接起来，占用4字节。
3. 使用varint解释这个3个数，对于0 ～ 2 ** 7的数占用一个字节，对于2 ** 7 ～ 2 ** 14 占用2个字节，总共占用4字节。
方法2，3占用字节相同但是对于解码的时候完全不同，方法2需要前后端沟通好offset为多少时将buffer使用另外一种视图读出，当某个offset的buffer 即可能是1字节，又可能是多字节时，这种方式无法处理。
方法3，将任意大小的数当作varint，压缩数据存储空间的同时，也解决解析得到问题。

### 使用
```js
// 测试
npm run test

// 安装
npm i varInts --save
```

### 例子
```js
const varInts = require('varInts');

const num = [ 1, 2, 257 ];
/*
* @param num {number | string | array | typeArray | arrayBuffer}
*/
const varInt = varInts.deflate(num); 
// => [2, 4, 130, 4]

const ab = new ArrayBuffer(varInt.length);
const view = new Uint8Array(ab);
for (let i = 0, len = varInt.length; i < len; i ++) {
    view[i] = varInt[i];
}
varInts.inflate(ab);
// => [1, 2, 257]
/*
* @param ab {ArrayBuffer}: 解码buffer 
* @param staroffset {number}: 解码起点
* @param num {number}: 从解析起点，解析num个varint
*/
//varInts(ab: ArrayBuffer, starOffset = 0, num = ab.byteLength)
```
