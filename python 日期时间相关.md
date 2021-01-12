官网参考链接：
    https://docs.python.org/3/library/time.html
    https://docs.python.org/3/library/datetime.html


```python

import time
import datetime
import dateutil.parser

# 基础 获取时间
if True:

    time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))     # '2020-10-15 11:51:10' time比datetime快50%
    datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")               # '2020-10-15 11:51:10'

# 获取当前时间，格式为 '2020-10-15 11:25:40'
    dt = datetime.datetime.now()    # datetime.datetime(2020, 10, 15, 11, 43, 26, 96993)

    dt.isoformat()      # '2016-11-30T15:18:39+08:00'
    dt.strftime("%Y-%m-%d %H:%M:%S")    # '2016-11-30 15:18:39'

# 字符串转 datetime
    dateutil.parser.parse("2016-11-30T15:18:39+08:00")     # datetime.datetime(2016, 11, 30, 15, 18, 39, tzinfo=tzoffset(None, 28800))
    datetime.datetime.strptime("2016-11-30 15:18:39", "%Y-%m-%d %H:%M:%S")
    datetime.datetime.strptime("2016-11-30T15:18:39+08:00", "%Y-%m-%dT%H:%M:%S%z")  # datetime.datetime(2016, 11, 30, 15, 18, 39, tzinfo=datetime.timezone(datetime.timedelta(seconds=28800)))
    datetime.datetime.strptime("2020-05-02T02:19:52.000Z", "%Y-%m-%dT%H:%M:%S.%fZ")

# 时间戳转 time
    time.localtime(1602733984.636)  # time.struct_time(tm_year=2020, tm_mon=10, tm_mday=15, tm_hour=11, tm_min=53, tm_sec=4, tm_wday=3, tm_yday=289, tm_isdst=0)

# 获取时间戳
    int(time.time())    # 1602749704

# 时间操作
if True:
    pass

# 计算年龄 https://stackoverflow.com/questions/2217488/age-from-birthdate-in-python
    born = datetime.datetime.strptime("2016-11-30", "%Y-%m-%d")
    today = datetime.datetime.now()     # or datetime.date.today()
    age = today.year - born.year - ((today.month, today.day) < (born.month, born.day))

# 获得 x小时，x天，x周 后
    yesterday = today - datetime.timedelta(days=1)
    after_5_day_2_hours = today + datetime.timedelta(days=5, hours=-2)
    next_week = today + datetime.timedelta(weeks=1)

# 本周第一天 最后一天
    week_start = today - datetime.timedelta(days=today.weekday())
    # 1周的总天数 - (今天的周天 + 1)  # 周天从0开始 且从周一开始，周一为0
    week_end = today + datetime.timedelta(days=(datetime.timedelta(weeks=1).days - (today.weekday() + 1)))

# 本月第一天 最后一天
    month_start = datetime.datetime(today.year, today.month, 1)
    month_end = datetime.datetime(today.year, today.month + 1, 1) - datetime.timedelta(days=1)

```

