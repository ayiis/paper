
## kafka 使用介绍（python）

## 安装

```bash
> pip install kafka-python
```

## 生产者

导入包

```python
from kafka import KafkaProducer
```

创建一个生产者

```python
producer = KafkaProducer(
    bootstrap_servers = '192.168.70.221:19092,192.168.70.222:19092,192.168.70.223:19092', # kafka集群地址
    compression_type = 'gzip', # 传输时的压缩格式
    max_request_size = 1024 * 1024 * 20, # 每条消息的最大大小
)
```

发送消息到kafka集群

```python
producer.send(topic = 'my.topic', value = 'Hello kafka!') # 发送到指定的消息主题（异步，不阻塞）
```

### 完整示例代码

```python
# coding:utf8
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers = '192.168.70.221:19092,192.168.70.222:19092,192.168.70.223:19092', # kafka集群地址
    compression_type = 'gzip', # 传输时的压缩格式
    max_request_size = 1024 * 1024 * 20, # 每条消息的最大大小
)

record_metadata = producer.send(topic = 'my.topic', value = 'Hello kafka!') # 发送到指定的消息主题

record_metadata = record_metadata.get(timeout = 60) # 获取发送结果，超时时间为空则一直等待

print record_metadata # 打印发送结果

```

## 消费者

导入包

```python
from kafka import KafkaConsumer
```

创建一个消费者

```python
consumer = KafkaConsumer(
    bootstrap_servers = '192.168.70.221:19092,192.168.70.222:19092,192.168.70.223:19092', # kafka集群地址
    group_id = 'my.group', # 消费组id
    enable_auto_commit = True, # 每过一段时间自动提交所有已消费的消息（在迭代时）
    auto_commit_interval_ms = 5000, # 自动提交的周期（毫秒）
)
```


指定消息的主题

```python
consumer.subscribe(['my.topic']) # 消息的主题，可以指定多个
```

### 完整示例代码

```python
# coding:utf8
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    bootstrap_servers = '192.168.70.221:19092,192.168.70.222:19092,192.168.70.223:19092', # kafka集群地址
    group_id = 'my.group', # 消费组id
    enable_auto_commit = True, # 每过一段时间自动提交所有已消费的消息（在迭代时）
    auto_commit_interval_ms = 5000, # 自动提交的周期（毫秒）
)

consumer.subscribe(['my.topic']) # 消息的主题，可以指定多个

for msg in consumer: # 迭代器，等待下一条消息
    print msg # 打印消息

```


## 高级用法（消费者）

#### 从指定offset开始读取消息，被消费过的消息也可以被此方法读取

1. 创建消费者

2. 使用 **assign** 方法重置指定分区(partition)的读取偏移(fetch offset)的值

3. 使用 **seek** 方法从指定的partition和offset开始读取数据

```python
#encoding:utf8
from kafka import KafkaConsumer, TopicPartition

my_topic = 'my.topic' # 指定需要消费的主题

consumer = KafkaConsumer(
    bootstrap_servers = '192.168.70.221:19092,192.168.70.222:19092,192.168.70.223:19092', # kafka集群地址
    # group_id = 'my.group', # 消费组id无效，因为此时属于按分区消费
    enable_auto_commit = True, # 每过一段时间自动提交所有已消费的消息（在迭代时）
    auto_commit_interval_ms = 5000, # 自动提交的周期（毫秒）
)

consumer.assign([
    TopicPartition(topic=my_topic, partition=0),
    TopicPartition(topic=my_topic, partition=1),
    TopicPartition(topic=my_topic, partition=2)
])

consumer.seek(TopicPartition(topic=my_topic, partition=0), 12) # 指定起始offset为12
consumer.seek(TopicPartition(topic=my_topic, partition=1), 0) # 可以注册多个分区，此分区从第一条消息开始接收
# consumer.seek(TopicPartition(topic=my_topic, partition=2), 32) # 没有注册的分区上的消息不会被消费

for msg in consumer: # 迭代器，等待下一条消息
    print msg # 打印消息

```


#### 异常处理

读取下一条消息

```python
next(consumer)
```

手动提交所有已消费的消息

```python
consumer.commit()
```

手动提交指定的消息

```python
consumer.commit([
    TopicPartition(my_topic, msg.offset)
])
```

## 文档

[kafka 文档](http://kafka.apache.org/documentation.html)

[kafka-python](https://github.com/dpkp/kafka-python)

[kafka-python 文档](http://kafka-python.readthedocs.io/en/master/apidoc/KafkaConsumer.html)
