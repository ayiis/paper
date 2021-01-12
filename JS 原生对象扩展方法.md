```js
/**
 * 统一修复js原生tofixed的缺陷，支持 1.5e-8 形式
 * @text(1) 55.55
 * @test(2) 35.855 73.315 1.005 859.385 0.045
 * @test(8) 0.000000015
 1.04999999999999994 === 1.05
 1.0049999999999998 === 1.005
 1.0499999999999997 === 1.0499999999999996 === 1.0499999999999995
 */
Number.prototype._toFixed = Number.prototype._toFixed || Number.prototype.toFixed;
Number.prototype.toFixed = function(precision) {
    var num = this.toString().indexOf('e') === -1 ? this : this._toFixed(16);
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision))._toFixed(precision);
}

/*
 * Add days to date
 * https://stackoverflow.com/questions/563406/add-days-to-javascript-date
 * E.G.
 *      var dt = new Date();
 *      dt.addDays(5);
*/
Date.prototype.addDays = function(days) {
    var d = new Date(this.valueOf());
    d.setDate(d.getDate() + days);
    return d;
}

/*
 * Add month to date
 * https://stackoverflow.com/questions/5645058/how-to-add-months-to-a-date-in-javascript
 * E.G.
 *      var dt = new Date("2020/12/31");
 *      dt.addMonths(2);
*/
Date.prototype.addMonths = function(months) {
    var d = new Date(this.valueOf());
    d.setMonth(d.getMonth() + months);
    return d;
}

/*
 * Add years to date
 * https://stackoverflow.com/questions/33070428/add-year-to-todays-date
 * E.G.
 *      var dt = new Date();
 *      dt.addYears(5);
*/
Date.prototype.addYears = function(years) {
    var d = new Date(this.valueOf());
    d.setFullYear(d.getFullYear() + years);
    return d;
}
```
