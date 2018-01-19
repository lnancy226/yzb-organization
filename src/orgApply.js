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
            if(this.index === 3) {
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
});

(function($, doc) {
    $.init();
    $.ready(function() {
        /**
         * 获取对象属性的值
         * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
         * @param {Object} obj 对象
         * @param {String} param 属性名
         */

        var _getParam = function(obj, param) {
            return obj[param] || '';
        };

        // 类型选择
        var typePicker = new $.PopPicker();
        typePicker.setData([{
            // value: 'ywj',
            text: '鉴定'
        }, {
            // value: 'aaa',
            text: '典当'
        }, {
            // value: 'lj',
            text: '拍卖'
        }, {
            // value: 'ymt',
            text: '协会'
        }, {
            // value: 'shq',
            text: '展览'
        }, {
            // value: 'zhbh',
            text: '学校'
        }, {
            // value: 'zhy',
            text: '博物馆'
        }]);

        var showTypePickerButton = doc.getElementById('showTypePicker');
        var typeResult = doc.getElementById('typeResult');
        showTypePickerButton.addEventListener('tap', function(event) {
            typePicker.show(function(items) {
                // typeResult.innerText = JSON.stringify(items[0].text);
                typeResult.innerText = items[0].text;
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);

        //	地区选择
        var cityPicker3 = new $.PopPicker({
            layer: 3
        });
        cityPicker3.setData(cityData3);
        var showCityPickerButton = doc.getElementById('showCityPicker3');
        var cityResult3 = doc.getElementById('cityResult3');
        showCityPickerButton.addEventListener('tap', function(event) {
            cityPicker3.show(function(items) {
                cityResult3.innerText =  _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);
    });
})(mui, document);
