/**
 * Created by 919482722 on 2018/1/16.
 */
$(function () {

    mui.init({
        swipeBack:true //启用右滑关闭功能
    });
    mui('body').on('shown', '.mui-popover', function(e) {
        //console.log('shown', e.detail.id);//detail为当前popover元素
    });
    mui('body').on('hidden', '.mui-popover', function(e) {
        //console.log('hidden', e.detail.id);//detail为当前popover元素
    });
    var info = document.getElementById("info");
    mui('body').on('tap', '.mui-popover-action li>a', function() {
        var a = this,
            parent;
        //根据点击按钮，反推当前是哪个actionsheet
        for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
            if (parent.classList.contains('mui-popover-action')) {
                break;
            }
        }
        //关闭actionsheet
        mui('#' + parent.id).popover('toggle');
        // info.innerHTML = "你刚点击了\"" + a.innerHTML + "\"按钮";
    });

    $('#picture ul li:eq(0)').on('tap', function () {
        window.location.href = './jigou-apply.html';
    });
    $('#picture ul li:eq(1)').on('tap', function () {
        window.location.href = './experts-apply.html';
    });

    // 轮播图
    var slider = mui("#slider");
    slider.slider({
        interval: 5000
    });
})
