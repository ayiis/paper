

function | explain
------- | -------
int(x [,base ])         | 将x转换为一个整数  
long(x [,base ])        | 将x转换为一个长整数  
float(x )               | 将x转换到一个浮点数  
complex(real [,imag ])  | 创建一个复数  
str(x )                 | 将对象 x 转换为字符串  
repr(x )                | 将对象 x 转换为表达式字符串  
eval(str )              | 用来计算在字符串中的有效Python表达式,并返回一个对象  
tuple(s )               | 将序列 s 转换为一个元组  
list(s )                | 将序列 s 转换为一个列表  
chr(x )                 | 将一个整数转换为一个字符  
unichr(x )              | 将一个整数转换为Unicode字符  
ord(x )                 | 将一个字符转换为它的整数值  
hex(x )                 | 将一个整数转换为一个十六进制字符串  
oct(x )                 | 将一个整数转换为一个八进制字符串

## 数据类型

    31 == 31.00 == .31e2 == 0x1f == 0b11111 == 0o37
    复数 1j, 1+2j

## 装饰器

```python

def foob(f):
    print("foob")

    def booa():
        print("this is booa")
        return f()

    return booa


@foob
def doo():
    print("this is doo")
""" 输出
foob
"""


doo()
""" 输出
this is booa
this is doo
"""


def hoo():
    print("this is hoo")


hooo = foob(hoo)
""" 输出
foob
"""
hooo()
""" 输出
this is booa
this is hoo
"""

```

## ASYNCIO

    在 MacOS 上使用的是
    DEBUG:asyncio:Using selector: KqueueSelector
    在 Centos 上使用的是
    DEBUG:asyncio:Using selector: EpollSelector

### 常用方法

    - 增加 queue
        import asyncio
        queue = asyncio.Queue()

    - 启动
        loop = asyncio.get_event_loop()
        loop.run_until_complete(main())
        # or
        loop.run(main())

    - 等待
        await asyncio.sleep(1)

    - 后台执行 coroutine

        loop.create_task(target_function())

        * 需要注意的是 target_function() 返回的是 coroutine, 在 await 时才会开始执行
            create_task 返回的是 Task, 立刻异步执行，可以用 await 等待执行完毕并获取结果
    
    - 同时启动多个 coroutine

        await asyncio.gather(
            target_function1(),
            target_function2(),
        )

    - 实时 print 需要增加 flush 参数

        print("Cleaning up all process..", flush=True)


#### aiohttp

    使用 aiohttp 来实现异步请求

        pip install aiohttp[speedups]

        同名 header 问题
            只能获取第一个 header
                response.headers.get("set-cookie")
            获取全部同名的 header，返回 list
                response.headers.getall("set-cookie")

            * requests 的默认处理是将所有同名 header 解析合并成 1个

        获取原始字符串返回
            await response.content.read()

    使用 aiohttp 来实现异步服务

        web._run_app(app1, port=8881)

#### motor


