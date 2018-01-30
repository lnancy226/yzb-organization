/**
 * Created by 919482722 on 2018/1/25.
 */
$(function () {
    var tokenTest = $.cookie('tokenTest');
    console.log(tokenTest);
    $.getUrlParam = function (name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

        var r = window.location.search.substr(1).match(reg);  //匹配目标参数

        if (r != null) return decodeURI(r[2]); return null; //返回参数值
    }

    var orgType = $.getUrlParam("data-type");
    var orgSort = $.getUrlParam("orgSort");
    console.log(orgType,orgSort);
    $('title').text(orgSort);
    $('.mui-title').text(orgSort);

    console.log($('title').text());

    var pageNum = 1;
    var pageSize = 20;
    var parameter = JSON.stringify({
        type: orgType,
        pageNum: pageNum,
        pageSize: pageSize
    });
    console.log(parameter,"传入参数");
    $.ajax({
        url: "http://120.27.226.156:8080/roo-mobile-web/organ/read/page",
        // beforeSend: function (request) {
        //     request.setRequestHeader("Authorization", tokenTest);
        // },
        type: "PUT",
        data: parameter,
        contentType: "application/json;charset=utf-8",
        success: function (info) {
            console.log(info, "机构列表");

            // 调用模板引擎处理机构列表
            var orgListHtml = template("orgList", info);
            $(".orgList").html(orgListHtml);
        }
    });
})