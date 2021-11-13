var blocked      = ["site1.com", "site2.com", "site3.com"];
var proxyServer  = "SOCKS5 114.215.193.156:1080";
function FindProxyForURL(url, host) {
    var shost = host.split(".").reverse();
    shost = shost[1] + "." + shost[0];
    for(var i = 0; i < blocked.length; i++) {
        if( shost == blocked[i] ) return proxyServer;
    }
    return "DIRECT";
}