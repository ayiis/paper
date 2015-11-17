/*  基于websocket进行ip扫描的javascript代码demo
 *
 *  1. 由于浏览器安全机制,js内无法获取到任何具体的返回信息
 *  2. 只能基于默认超时时间20秒来判断是否连接到目标IP
 *  3. 在超时之前,任何触发closed的链接都视为目标IP存活
 */
var ret = [];
var netip = '1.2.3';
var wsList = [];
var timeOut = 10; // seconds < 20

function wsLoop(address) {
    var ws = new WebSocket('ws://' + address);
    ws.onclose = function(data) {
        ret.push(address);
    };
    wsList.push(ws);
}

function start() {
    for (var i = 1; i < 256; i++) {
        wsLoop(netip + '.' + i + ':80');
    }
    setTimeout(function() {
        alert(ret.sort().join('\r\n'));
        wsList.forEach(function(ws) {
            ws.close();
        });
    }, timeOut * 1000);
}

start();
