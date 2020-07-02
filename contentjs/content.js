// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'inject/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    document.body.appendChild(temp)
}

// 调用注入方法
injectCustomJs('inject/inject.js');


// 接收inject js消息
window.addEventListener("message",function (e) {
    // 向background发送消息
    if(e.data.cmd === 'addBookmark') {
        chrome.runtime.sendMessage({cmd: e.data.cmd, title: e.data.title}, resp => {
            alert(JSON.stringify(resp))
        })
    }

}, false)