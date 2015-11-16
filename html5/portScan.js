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
