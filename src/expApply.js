/**
 * Created by 919482722 on 2018/1/18.
 */
var tagData = [{
    value: '',
    text: '古玩'
}, {
    value: '',
    text: '文玩'
}, {
    value: '',
    text: '珠宝'
}, {
    value: '',
    text: '字画'
}, {
    value: '',
    text: '观赏石'
}, {
    value: '',
    text: '花鸟鱼虫'
}, {
    value: '',
    text: '加工雕刻'
}, {
    value: '',
    text: '珠宝检测'
}, {
    value: '',
    text: '包装配饰'
}, {
    value: '',
    text: '其他'
}];
    // var tagData = [];
var Authorization = $.cookie('Authorization');
alert(Authorization+"token");

var expType,cityId,provinceId;
// $(function () {
    var citydata = [];
// var expToken = "56429ff0-8be6-42e2-9fb3-b393dea4abac";
// $.cookie("expTokenTest", expToken);
// var expTokenTest = $.cookie('expTokenTest');

    cityData2 = cityData.slice(0,31);
    // console.log(cityData2,"citydata2");
    cityData2.push(cityData[32]);
    cityData2.push(cityData[33]);
    cityData2.push(cityData[31]);
    console.log(cityData2,"citydata2222");
    cityData = cityData2;

    getProvince();
    goodsTag();

function goodsTag() {
    $.ajax({
        url: 'http://120.27.226.156:8080/roo-mobile-web/tag/read/list/goods?parentId=0',
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        // data: data,
        success: function (info) {
            console.log(info,"一级宝贝标签");
            $.each(info.data,function(index,value){
                tagData[index].value = value.id;
            });
            console.log(tagData);
        }
    });
}

    // $('.app-submit').on('tap',function () {
    //     if($('#typeResult').text() == '') {
    //         // alert('所属类型不能为空！');
    //         mui.toast('所属类型不能为空！');
    //         return;
    //     };
    //     if($('#cityResult3').text() == '') {
    //         mui.toast('所在地区不能为空！');
    //         return
    //     };
    // });

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


// });


(function($, doc) {
    // citydata = JSON.stringify(citydata);
    console.log(citydata,"citydata-my");

    // cityData = citydata;
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
        typePicker.setData(tagData);

        var showTypePickerButton = doc.getElementById('showTypePicker');
        var typeResult = doc.getElementById('typeResult');
        showTypePickerButton.addEventListener('tap', function(event) {
            typePicker.show(function(items) {
                // typeResult.innerText = JSON.stringify(items[0].text);
                typeResult.innerText = items[0].text;
                expType = items[0].value;
                // console.log(expType,"专家类型");

                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);

        //	地区选择
        // cityData = citydata;
        console.log(cityData,"citydata6666");
        // console.log(citydata-my,"citydata1111");
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
// 提交信息
$(function () {
    // console.log(expType,"专家类型");

    $('.app-submit').on('tap',function () {

        // console.log($('.orgName').text(),"机构名称");
        // console.log($('#blah').attr('src'),"门头照");

            if($('#typeResult').text() == '') {
                // alert('所属类型不能为空！');
                mui.toast('所属类型不能为空！');
                return;
            };
            if($('#cityResult').text() == '') {
                mui.toast('所在地区不能为空！');
                return
            };
        parameters = JSON.stringify({
            name: $('.expName').text(),
            organ: $('.organ').text(),
            type: expType,
            phone: $('.phone').text(),
            provinceId: provinceId,
            cityId: cityId,
            remark: $('#remark').val()
        });
        console.log(parameters,"专家入驻参数");


        $.ajax({
            url: 'http://120.27.226.156:8080/roo-mobile-web/expert',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", Authorization);
            },
            type: 'post',
            contentType: "application/json;charset=utf-8",
            data: parameters,
            success: function (info) {
                // alert(info.msg+"提交成功");
                // console.log(info,"机构入驻");
                if(info.httpCode == 200) {
                    location.href = './experts-detail.html';
                }else{
                    alert("提交失败"+info.msg);
                }
            }
        });
    })
})




