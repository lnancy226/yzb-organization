/**
 * Created by 919482722 on 2018/1/18.
 */

$(function () {
    //mui初始化
    mui.init({
        swipeBack: true //启用右滑关闭功能
    });

    var inpArr = document.getElementsByClassName("prompt-btn");
    var infoArr = document.getElementsByClassName("my-info");
    var typeArr = document.getElementsByClassName("inp-type");
    console.log(infoArr,inpArr);
    for (i=0;i<inpArr.length;i++){
        inpArr[i].index = i; //i进不去事件驱动程序，存到对应index中，方便调用
        inpArr[i].addEventListener('tap', function(e) {
            var _this = this;
            // console.log(this.index);
            e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
            var inpType = typeArr[this.index].innerText;
            var inpInfo = "请填写"+inpType;
            console.log(inpInfo);
            var btnArray = ['取消', '确定'];
            mui.prompt(inpInfo, '', '', btnArray, function(e) {
                if (e.index === 1) {
                    infoArr[_this.index].innerText =  e.value;
                }
            })
            $('.mui-popup-title').remove();
        });
    }

})