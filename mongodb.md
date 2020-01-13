
高级查询几乎都是使用 aggregate 实现。

mongodb 3.6 以后，find 可以使用 $expr 来引入操作符。（mongodb仍然在快速迭代）

所有对字段的操作，都需要使用操作符来实现。

感觉越来越是跟老牌的mysql没什么区别了，还是要处理各种关系。一旦需要处理关系，就比mysql难用得多了。

定位到字段里面的对象的元素: `$key.object_name`
定位到字段里面的列表的元素: `{"$arrayElemAt": ["$key", 0]}`


* 查询字段不为空的记录

```js
db.myCollection.find({a: {$ne: null}})
```

* 查询字段 a != b 的记录

```js
// SLOW: spin up js engine and iterate each and every document and check the condition
db.myCollection.find( { $where: "this.a1.a != this.a2.a" } )

// Better: To avoid JavaScript use the aggregation framework
db.myCollection.aggregate([
    {
        "$match":{
            "a1":{"$exists":true},
            "a2":{"$exists":true}
        }
    },
    {
        "$addFields": {
            "aEq": {"$eq":["$a1.a","$a2.a"]}
        }
    },
    {
        "$match":{"aEq": false}
    }
]);

// Best: using the new $expr operator available as of mongodb 3.6 you can use aggregate expressions in find query like this:
db.myCollection.find({$expr: {$ne: ["$a1.a", "$a2.a"] } });

```

* 查询 `val-1` 为某个值的记录

```
db.myCollection.find({$expr:{$eq: [{$subtract: ["$val", 1]}, 101.2] }});
```

* [字段求和](https://docs.mongodb.com/manual/reference/operator/aggregation/add/)

```js
aggregate([{
    "$project":{
        "rate":{
            "$add": ["$good", "$bad"]
        }
    }
}])
```

* 字段求差 (使用多个操作符)

```js
aggregate([{
    "$project":{
        "rate":{
            "$add": ["$good", {"$multiply": [-1, "$bad"] }]
        }
    }
}])
```

* update 字段为两个字段字符串组合

```js
// MongoDB 4.2+
update(
    {},
    [   // 注意此处不是{}，而必须是 []
        {
            "$set": {
                "name": {
                   "$concat": ["$firstName", " ", "$lastName"]
                }
            }
        }
    ]
)

// MongoDB 3.4+
aggregate(
    [
        {
            "$addFields": {
                "name": {
                    "$concat": ["$firstName", " ", "$lastName"]
                }
            }
        },
        {
            "$out": "collection"
        }
    ]
)
```

* [expr 常用操作符](https://docs.mongodb.com/manual/reference/operator/aggregation/)

```

顾名思义: $abs / $add / $and / $avg / $ceil / $concat / $subtract / $multiply / $divide / $min / $max / $not / $or / $size / $first / $last / $in / $nin / $split / $type / $ltrim / $rtrim / $trim / $arrayElemAt

$regex / $options

$cmp: 返回整数，-1 <= 0 <= 1

$cond: 验证一个条件的bool，返回指定的内容
    eg. 如果 $cond: { if: { $gt: [ "$a", 100 ] }, then: -1, else: {"$abs": -1} }

$convert: 类型转换，支持 double / string / objectId / bool / date / int / long / decimal
    {input: <expression>, to: <type expression>, onError: ?<expression>, onNull: ?<expression> }
    谨慎使用js的类型转换 https://docs.mongodb.com/manual/reference/operator/aggregation/convert/

$dateFromString / $dateToString: 日期转换
    默认格式 "%Y-%m-%dT%H:%M:%S.%LZ"
    参考: https://docs.mongodb.com/manual/reference/operator/aggregation/dateFromString/

比较操作符: $ne / $lt < $lte <= $eq <= $gt < $gte

$range 生成一个整数的列表
    eg. 判断值在指定范围的整数列表里 {$expr:{$in: ["$val", {$range: [0, 100] }]}}

$ifNull: 语法: { $ifNull: [ <expression>, <replacement-expression-if-null> ] }

$map: 处理数组，遍历数组对每个元素做同样的处理并返回结果
    https://docs.mongodb.com/manual/reference/operator/aggregation/map/
    语法: { $map: { input: <expression>, as: ?<string>, in: <expression> } }

$filter: Selects a subset of an array to return based on the specified condition.
    语法: { $filter: { input: <array>, as: <string>, cond: <expression> } }

$slice: Returns a subset of an array.
    语法: { $slice: [ <array>, <n> ] }
    语法: { $slice: [ <array>, <position>, <n> ] }

$substr: 截取指定区域的字符串(单位为Bytes) 参数(<字段名>, <起始位置>, <截取长度>)
    eg.截取yyyy-mm-dd格式日期字符串中的月份: {"$substr": ["$date", 5, 2]}

```

* aggregate 常用管道

```

$project / $match / $limit / $skip / $sort / $count / $out

$merge: 将所有记录 插入/合并/替换/更新/覆盖/跳过 到指定的表，比 $out 更全面
    https://docs.mongodb.com/manual/reference/operator/aggregation/merge/

$lookup: Left-Outer-Join to an unsharded collection in the same database
    https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
    语法：{$lookup: {from: <collection to join>, localField: <field from the input documents>, foreignField: <field from the documents of the "from" collection>, as: <output array field> }}

$unwind: 将数组解压到上级，数组每存在1个元素就会克隆1个记录，数组元素为0则此条记录被过滤(默认)
    https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/
    语法：$unwind: {path: <field path>, includeArrayIndex: ?<string>, preserveNullAndEmptyArrays: ?<boolean> }

$unset <> $set == $addField: Removes <> Adds new fields to documents. 跟 $project 的区别是 $set 保留原有的所有字段

$sample: 在所有记录中随机取 N 条记录
    语法: { $sample: { size: <positive integer> } }

$group: 分组

    _id: 相当于 group by, 操作符作用于<单个字段的值>
    $avg: 求均值
    $sum: 求和
    $min: 返回最小值
    $max: 返回最大值
    $push: 创建数组，添加元素到数组里
    $addToSet: 创建set，添加元素到set里
    $first: 返回第一个值，顺序由上一级结果决定
    $last: 返回最后一个值，顺序由上一级结果决定

```

* 特殊

```

$$ROOT: 表示整条记录

```

[$group 操作符](https://docs.mongodb.com/manual/reference/operator/aggregation/group/index.html)

