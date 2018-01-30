/**
 * Created by 919482722 on 2018/1/24.
 */
window.onerror = function (err) {
    log('window.onerror: ' + err)
}
/*这段代码是固定的，必须要放到js中*/
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
//        alert('111');
    console.log(window.WVJBCallbacks);
//        console.log(respond);
//        callback();
       console.log(token);

}
// alert('111');
console.log(log.children.length);
console.log('respond');
//    console.log(respond);


/*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
setupWebViewJavascriptBridge(function (bridge) {
    var uniqueId = 1

    function log(message, data) {
        var log = document.getElementById('log')
        var el = document.createElement('div')
        el.className = 'logLine'
        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
//            console.log(log.children.length);
        if (log.children.length) {
            log.insertBefore(el, log.children[0])

        } else {
            alert('111');
            log.appendChild(el)
        }
    }

    /* Initialize your app here */
    /*我们在这注册一个js调用OC的方法，不带参数，且不用ObjC端反馈结果给JS：打开本demo对应的博文*/
    bridge.registerHandler('openWebviewBridgeArticle', function () {
        log("openWebviewBridgeArticle was called with by ObjC")
    })
    /*JS给ObjC提供公开的API，在ObjC端可以手动调用JS的这个API。接收ObjC传过来的参数，且可以回调ObjC*/
    bridge.registerHandler('getUserInfos', function (data, responseCallback) {
        console.log(data);

        log("Get user information from ObjC: ", data)
        responseCallback({'userId': '123456', 'blog': '标哥的技术博客'})
    })

    /*JS给ObjC提供公开的API，ObjC端通过注册，就可以在JS端调用此API时，得到回调。ObjC端可以在处理完成后，反馈给JS，这样写就是在载入页面完成时就先调用*/
    bridge.callHandler('getUserIdFromObjC', function (responseData) {
        token = responseData.accessToken;
        console.log(responseData);
        alert(responseData.accessToken);
        log("JS call ObjC's getUserIdFromObjC function, and js received response CCCCCCCCCC:", responseData)


    })

    document.getElementById('blogId').onclick = function (e) {

        log('js call objc: getBlogNameFromObjC')
        bridge.callHandler('getBlogNameFromObjC', {'blogURL': 'http://www.henishuo.com'}, function (response) {
            log('JS got response', response)
            alert(responseData.accessToken);
        })
    }
})

//    console.log(respond);

