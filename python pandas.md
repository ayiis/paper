
## 基础知识

panda 读取CSV较快
```
    load from csv:      1.6860098838806152
        pd.read_csv("./test.csv")
            , dtype={"fund_code": "object"}
    load from json:     4.6325061321258545
        pd.read_json("./test.json")
    load from mongodb:  6.1567709445953370
        pd.DataFrame(dbs["test"]["col"].find({}))
```

读取无头的 xlsx
pd.read_excel("/tmp/tiktok_interface_result.xlsx", names=["a", "b", "c", "d", "e", "f"], header=None)


## 数据结构

Series      一维数组，数据类型相同
DataFrame   二维数组，有标题，列(Series)的数据类型相同

DataFrame 是 Series 的容器，Series 则是标量的容器

* pandas 是基于 numpy 的工具

    numpy 数组只有一种数据类型， pandas.DataFrame 每列的数据类型各不相同

## [基本操作](https://www.pypandas.cn/docs/getting_started/10min.html)

```python
import pandas as pd
import numpy as np

# 创建 Series，默认的 index 是一个 range(N)
pd.Series([1, 2, 3])

# 创建空 DataFrame
pd.DataFrame()

# 创建 DataFrame
pd.DataFrame([1, 2, 3])

# 指定 index, Series 也可以指定 index
pd.DataFrame([1, 2, 3], index=range(2, 7, 2))

# 每个列的元素个数 N 必须相等或者等于 1，最终生成 N 个元素的 DataFrame
df = pd.DataFrame({
    'A': 1.,
    'B': pd.Timestamp('20131231 111213'),   # 非常灵活的字符串转日期方法
    'C': pd.Series(range(4), dtype=np.float),
    'D': np.array([3] * 4, dtype=np.int),
    'E': 'foo'
})

# 获取头 N 行
df.head(2)
df[:2]

# 获取尾 N 行
df.tail(2)
df[-2:]

# 获取指定的 N 列

# 查看 行索引、列名
df.index
df.columns

# 查看 行和列
df.axes

# 查看 数据类型
df.dtypes

# 查看详细信息
df.info()

# 查看数据类型为 数字 的列的各种统计
df.describe()

# 转置数据
df.T

# 排序，按 行或列排序
df.sort_index(axis=0, ascending=False)
df.sort_index(axis=1, ascending=True)

# 排序，按列的值排序
df.sort_values(by=["C", "D"], ascending=False)

# 获取指定条件的数据
df[df["C"] > 1]
df[df["D"].isin([1, 3])]

# 获取 distinct 的值
df["C"].unique()

"""
    loc (label loc) 和 iloc (int loc)
"""
df.loc[:, "B"] == df.iloc[:, 1]

# 赋值相关: SettingWithCopyWarning
# pandas 有时会返回一个 view，有时会返回一个 copy，使用 loc 和 iloc 比较稳妥
df[df["C"] > 1]["D"] = 1        # 🚫 无效，warning，返回的是 copy
df.loc[df["C"] > 1, "D"] = 1    # ✅ 正解
df.iloc[df["C"] > 1, 3] = 1     # ✅ 正解
df["D"][df["C"] > 1] = 1        # ✅ 正解，warning

# 如果目的确实是为了 在 copy 上赋值：
# 可以通过全局修饰去除 warning
pd.options.mode.chained_assignment = None
# （推荐）通过 with statemenet 来忽略
with pd.option_context("mode.chained_assignment", None):
    df2 = df[df["C"] > 1]
    df2["D"] = 1

# 注意返回的数据的类型：Series、DataFrame
df.loc[0]     # Series
df.loc[0:0]   # DataFrame

# loc 🚸 会包括 start 和 stop，这样会返回1个元素，跟python默认数组不一样 https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.loc.html
# 但是 iloc 却不包括 stop，真是惊雷
# 🚫 而且 loc 和 iloc 都是按照 index 来排序的， 切记要 reset_index()

# TODO: 如何 insert 给 series
pd.concat([pd.Series([111]), df["D"]])


# 哪些值是 np.nan
df.isna()
# 删除包含 np.nan 的行
df.dropna(how="any")
# 将 nan 用指定的值填充
df.fillna(value=5)

# 使用 apply 分别处理所有列
df.apply(lambda x: x.max())
# 使用 map 处理指定的列
df["A"].map(lambda x: "S" + str(x))

"""
    高级操作
"""

pd.concat(df[0:1], df[1:2])

# 求和
pd["D"].sum()
# 求积
pd["D"].prod()

# 累计和
pd["D"].cumsum()
# 累计积
pd["D"].cumprod()

# 倒序
df.sort_index(ascending=False)

# 找到最小的数值的列
df.sort_values("D", ascending=True)

"""
    技巧
"""

# 取每个分组 (按 A, B 分组) 里，某个列 (count) 的值最大的行
df.sort_values(by="count", ascending=False).drop_duplicates(["A", "B"])

"""
    一些设置
"""

# 设置 pandas 的输出格式
pd.set_option("max_colwidth", None)
pd.set_option("display.max_columns", None)
pd.set_option("max_columns", None)

```

## 可视化

```python

pd.options.plotting.backend = "plotly"

# 可用的 scatter, line, area, bar, barh, hist, box,
fig = df[["date", "price"]].plot.line(y="price", x="date")
fig.show()

df[["rate"]].plot.bar(height=240).show()

df["up"] = df["rate"].map(lambda x: 1 if x > 0 else 0 if x == 0 else -1)
fig = df[["date", "price", "up"]].plot.line(y="price", x="date", color="up")
fig.show()

df.plot.line().show()

"""
The 'color' property is a color and may be specified as:
    - A hex string (e.g. '#ff0000')
    - An rgb/rgba string (e.g. 'rgb(255,0,0)')
    - An hsl/hsla string (e.g. 'hsl(0,100%,50%)')
    - An hsv/hsva string (e.g. 'hsv(0,100%,100%)')
    - A named CSS color:
        aliceblue, antiquewhite, aqua, aquamarine, azure ...
"""

```






