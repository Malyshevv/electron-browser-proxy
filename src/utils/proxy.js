const axios = require("axios");
const {tcpPingPort} = require("tcp-ping-port");

const proxyList = [];

async function getProxy() {
    axios.get('https://advanced.name/freeproxy/618fcbf100855?type=socks5')
        .then((res) => {
            let result = res.data.split('\n');
            result.forEach(element => {
                if(element != undefined) {
                    let address = element.split(':')
                    let proxy = {
                        host: address[0], // ip
                        port: address[1], // port
                        type: 'socks5'
                    }
                    tcpPingPort(proxy.host).then(online => {
                        if(online.online) {
                            proxyList.push(proxy)
                        }
                    })
                }
            });
        })
        .catch((error) => {
            console.log(error)
        });
    return proxyList
}


module.exports = {getProxy, proxyList}