function HttpProxy() {

    var config = {
        mode: 'fixed_servers',
        rules: {
            bypassList:['*real-debrid.com', '*google.com', '*youtube.com', '*fintec.systems']
        }
    };

    config['rules']['singleProxy'] = {
        scheme: 'http',
        host: '888.888.888.888',
        port: 8888
    };

    chrome.proxy.settings.set(
            {value: config, scope: 'regular'},
            function() {});
    let icon = { path: "images/on.png"}
    chrome.browserAction.setIcon(icon);
}

function SysProxy() {

    var config = {
        mode: 'system',
    };

    chrome.proxy.settings.set(
            {value: config, scope: 'regular'},
            function() {});
    let icon = { path: "images/off.png"}
    chrome.browserAction.setIcon(icon);
}

chrome.browserAction.onClicked.addListener(function(tab) { 
        
        var icon = {
            path: "images/on.png",
        }

        chrome.proxy.settings.get(
                    {'incognito': false},
            function(config) {
                if (config["value"]["mode"] == "system") {
                    HttpProxy();
                    
                }else {
                    SysProxy();
                }
            }
        );
        
    });

SysProxy();

chrome.proxy.onProxyError.addListener(function(details) {
            SysProxy();
            console.log(details.error);
        });
