chrome.browserAction.setBadgeText({text: 'new'});
// chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
chrome.contextMenus.create({
    id: '1',
    title: '测试右键'
    // onclick: function () {
    //     alert('clicked')
    // }
})
chrome.contextMenus.create({
    id: '2',
    title: '子菜单1',
    parentId: '1'
})
chrome.contextMenus.onClicked.addListener(function (info) {
    alert('当前菜单信息:'+ JSON.stringify(info))
})

function checkNotification() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }
// check whether notification permissions have alredy been granted
    else if (Notification.permission === "granted") {
// If it's okay let's create a notification
        chrome.notifications.create("asas", {
            type: 'basic',
            iconUrl: 'icons/diamond_200px.png',
            title: '检测到图片',
            message: '图片地址'
        });
    }
// Otherwise, ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
// If the user accepts, let's create a notification
            if (permission === "granted") {
                new Notification("Request granted!");
            }
        });
    }
}
checkNotification();
chrome.webRequest.onBeforeRequest.addListener(function (detail) {
    if (detail.url.match(/\user_yixin_right_20180827/g)) {
        // 该方法在一些chrome版本中测试无效
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'icons/diamond_200px.png',
            title: '检测到图片',
            message: '图片地址：'
        });
    }
}, {urls: ['<all_urls>']}, ['blocking']);



//接收消息
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log('接收到的消息：'+msg)
    // 搜索书签
    // chrome.bookmarks.search({title:'航天云课堂'},function (callback) {
    //     console.log(callback)
    // })

    // 获取书签树
    // chrome.bookmarks.getTree(function (r) {
    //     console.log(r)
    // })
    if(msg.cmd === 'addBookmark'){
        console.log('添加书签操作触发')
        chrome.bookmarks.create({
            'parentId': '1', // 添加到书签根目录
            'title': msg.title,
            'url': 'http://baodua.com'
        },function (newFolder) {
            // 回调给信息发送者
            response(newFolder)
        })

    }
    // 表示异步返回，以防止信息未收到端口被关闭
    return true;
})