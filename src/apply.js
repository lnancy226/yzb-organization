/**
 * Created by 919482722 on 2018/1/18.
 */

$(function () {
    //mui初始化
    mui.init({
        // swipeBack: true //启用右滑关闭功能
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
            });
            if(this.index === 2) {
                $('.mui-popup-input input').attr("type","tel");
            };
            $('.mui-popup-title').remove();
        });
    }

    // mui('.mui-scroll-wrapper').scroll();

});
$(function () {
    //点击调取照片
    $("#app-camera").on("tap",function(){
        $("#app-upload-img").click();
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log(e.target.result);
                $('#blah').attr('src', e.target.result);
            };
            //render是渲染的意思
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#app-upload-img").change(function(){
        readURL(this);
    });
    $(".cancel-img").on("tap",function(){
        $(this).parent("div").remove();
    })
})