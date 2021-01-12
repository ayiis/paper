#### PYTHON3 不兼容PYTHON2 的地方

map函数 返回的是一个 <map> 而不是 <list>
    TypeError: 'map' object is not subscriptable
    * traceback 只能跟踪到lambda执行的行数，如果包含map，你要慢慢找

    同样：
        range zip

    额外：
        xrange 已经被删除

    另外：
        lambda

<str> 重新定义了 decode() 和 encode()
    <unicode> AttributeError: 'str' object has no attribute 'decode'
    <byte> AttributeError: 'bytes' object has no attribute 'encode'

    使用了 unicode 的 python3 和使用 utf8 的 mongodb 组合起来非常烦人

    python3 的编码问题照样用另一种方式搞死人

    str.encode("hex") 变成 str.hex() 和 bytes.fromhex('0a0d20')

<dict>.items() 没有 sort 方法
    AttributeError: 'dict_items' object has no attribute 'sort'

<base64>
    b64encode / b64decode 在2返回<str>在3返回<btye>






