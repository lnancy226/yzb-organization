/**
 * Created by 919482722 on 2018/1/18.
 */

var citydata = [];
var cityId,provinceId,type;
// var token = "56429ff0-8be6-42e2-9fb3-b393dea4abac";
// var token = "bf23e60e-63d3-4b79-ade9-f4faeb6c6b91";
// var myId = "942742154946555904";
var bannerImg;
// $.cookie("tokenTest", token);
// $.cookie("idTest", myId);

// var tokenTest = $.cookie('tokenTest');
// var idTest = $.cookie('idTest');
// console.log(tokenTest,'测试token');

// var parameters;
// var infoText = [];

var Authorization = $.cookie("Authorization");  //全局token
// alert(Authorization+"token");

cityData2 = cityData.slice(0,31);
// console.log(cityData2,"citydata2");
cityData2.push(cityData[32]);
cityData2.push(cityData[33]);
cityData2.push(cityData[31]);
console.log(cityData2,"citydata2222");
cityData = cityData2;
getProvince();
function getProvince() {

    var data  = JSON.stringify({
        level:0,
        parentId:0
    });

    $.ajax({
        url: 'http://120.27.226.156:8080/roo-mobile-web/cnarea/read/list',
        type: 'put',
        contentType: "application/json;charset=utf-8",
        data: data,
        success: function (info) {
            console.log(info,"获取省份");
            console.log(cityData,"cityData插件");
            // console.log(cityData[0].value);

            $.each(info.data,function(index,value){
                // $(".province").append("<option value=" + value.id + ">" + value.shortName + "</option>");    //取到所有一级宝贝标签并将其导入到select中
                cityData[index].value=value.id;
                cityData[index].text=value.mergerName;
                delete cityData[index].children;

                citydata[index] = {
                    // value:''+value.id+'',
                    text:value.mergerName,
                    children:[]
                };
                citydata.push(citydata[index]);
                requestCity(value.id,index);

            });

            function requestCity(provinceId,index) {
                var proIndex = index;
                var city = citydata[proIndex].children;
                // console.log(city,"children数组");
                // console.log(cityData[proIndex].children[1].value,"citydataValue111111");

                var data  = JSON.stringify({
                    level:1,
                    parentId:provinceId
                });

                $.ajax({
                    url: 'http://120.27.226.156:8080/roo-mobile-web/cnarea/read/list',
                    // beforeSend: function (request) {
                    //     request.setRequestHeader("Authorization", Authorization);
                    // },
                    type: 'PUT',
                    contentType: "application/json;charset=utf-8",
                    data: data,
                    success: function (info) {
                        // console.log(cityData,"cityData插件");


                        // console.log(info,"获取城市");
                        $.each(info.data,function(index,value){
                            city[index] = {
                                value:value.id,
                                text:value.name
                            };

                            city.push(city[index]);

                        });
                        cityData[proIndex].children = city;
                    }
                });
            };
        }
    });
}


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
            value: '1',
            text: '鉴定'
        }, {
            value: '2',
            text: '典当'
        }, {
            value: '3',
            text: '拍卖'
        }, {
            value: '4',
            text: '协会'
        }, {
            value: '5',
            text: '展览'
        }, {
            value: '6',
            text: '学校'
        }, {
            value: '7',
            text: '博物馆'
        }]);

        var showTypePickerButton = doc.getElementById('showTypePicker');
        var typeResult = doc.getElementById('typeResult');
        showTypePickerButton.addEventListener('tap', function(event) {
            typePicker.show(function(items) {
                // typeResult.innerText = JSON.stringify(items[0].text);
                typeResult.innerText = items[0].text;
                type = items[0].value;
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);

        //	地区选择
        var cityPicker = new $.PopPicker({
            layer: 2
        });
        cityPicker.setData(cityData);
        var showCityPickerButton = doc.getElementById('showCityPicker');
        var cityResult = doc.getElementById('cityResult');
        showCityPickerButton.addEventListener('tap', function(event) {
            cityPicker.show(function(items) {
                cityResult.innerText =  items[0].text + " " + items[1].text;
                console.log(items[0].value,items[0].text,"item0");
                console.log(items[1].value,items[1].text,"item1");
                provinceId = items[0].value;
                cityId = items[1].value;
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);
    });
})(mui, document);

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
                    // infoText.push(e.value);
                }
            });
            if(this.index === 3) {
                $('.mui-popup-input input').attr("type","tel");
            };
            $('.mui-popup-title').remove();
        });

        // console.log($(".orgName").text(),"机构名称");
        // console.log(infoText,"机构信息");

    }
    // mui('.mui-scroll-wrapper').scroll();
});

$(function () {
    //点击调取照片
    var file = document.querySelector('input');
    if (getIos()) {
        file.removeAttribute("capture");
    }
    function getIos() {
        var ua=navigator.userAgent.toLowerCase();
        if (ua.match(/iPhone\sOS/i) == "iphone os") {
            return true;
        } else {
            return false;
        }
    }
    $("#app-camera").on("tap",function(){
        $("#app-upload-img").click();

    function readURL(input) {
        if (input.files && input.files[0]) {
            console.log(input.files[0],"照片file");
            var reader = new FileReader();
            reader.onload = function (e) {
                // console.log(e.target.result);
                $('#blah').attr('src', e.target.result);
            };
            //render是渲染的意思
            reader.readAsDataURL(input.files[0]);
        }

        var file = input.files[0];
        // console.log(file,"照片file");
        // var img = document.getElementById("mainPic");
        // var mainPicBanner = document.getElementById("mainPicBanner");
        var fd = new FormData();//创建一个fromdata
        fd.append("file", file); //将参数名与参数值以key value形式组合起来

        $.ajax({
            type: "post",
            url: "http://120.27.226.156:8080/roo-mobile-web/image",
            contentType: false,
            processData: false,
            file: file,
            dataType: "JSON",
            data: fd,
            success: function (info) {

                console.log(info, "主图信息");
                bannerImg = info.data[0].thumbnailUrl;
                // $('#blah').attr('src', info.data[0].thumbnailUrl);
            }
        });
    }
    $("#app-upload-img").change(function(){
        readURL(this);
    });

    });
    // $(".cancel-img").on("tap",function(){
    //     $(this).parent("div").remove();
    // })
});

$(function () {
    // console.log(provinceId,"省份id");
    // console.log(cityId,"城市id");

    $('.app-submit').on('tap',function () {
        // console.log(bannerImg,"bannerImg");

        // console.log($('.orgName').text(),"机构名称");
        // console.log($('#blah').attr('src'),"门头照");

        if($('.orgName').text() == '') {
            mui.toast('机构名称不能为空！');
            return;
        };
        if($('.orgCode').text() == '') {
            mui.toast('组织代码不能为空！');
            return;
        };
        if($('#typeResult').text() == '') {
            mui.toast('所属类型不能为空！');
            return;
        };
        if($('#cityResult').text() == '') {
            mui.toast('所在地区不能为空！');
            return;
        };
        parameters = JSON.stringify({
            name: $('.orgName').text(),
            cityId: cityId,
            provinceId: provinceId,
            code: $('.orgCode').text(),
            type: type,
            bannerImg: bannerImg,
            contacts: $('#contacts').text(),
            phone: $('#phone').text(),
            shopAddress	: $('#detail-address').val(),
            remark	: $('#remark').val()
        });
        console.log(parameters,"机构信息222");


        $.ajax({
            url: 'http://120.27.226.156:8080/roo-mobile-web/organ/',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", Authorization);
            },
            type: 'post',
            contentType: "application/json;charset=utf-8",
            data: parameters,
            success: function (info) {
                // console.log(info,"机构入驻");
                if(info.httpCode == 200) {
                    location.href = './jigou-detail.html';
                }else{
                    alert("提交失败"+info.msg);
                }
            }
        });
    })
})
