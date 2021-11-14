const PROXY_CONFIG = {
    type: 'socks5',
    host: '159.65.232.22', //http://free-proxy.cz/ru/
    port: 10774,
    //proxyAuth: 'u7pwoh18'
};

const PROXY_RULES = {
    proxyRules: PROXY_CONFIG.type+'://'+PROXY_CONFIG.host+':'+PROXY_CONFIG.port,
}

module.exports = {PROXY_RULES,PROXY_CONFIG}