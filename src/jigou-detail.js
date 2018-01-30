/**
 * Created by 919482722 on 2018/1/19.
 */
$(function () {
    // var idTest = $.cookie('idTest');
    // var tokenTest = $.cookie('tokenTest');
    // console.log(idTest,tokenTest);
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }

    var orgId = GetQueryString("orgId");

    // 立即咨询
    $('.consult-now').on('tap',function () {
        var tel = $('.contact-way').text();
        tel = "tel:"+tel;
        console.log(tel);
        $('.consult-now a').attr('href',tel);
    });

    $.ajax({
        url: "http://120.27.226.156:8080/roo-mobile-web/organ/" + orgId,
        // beforeSend: function (request) {
        //     request.setRequestHeader("Authorization", tokenTest);
        // },
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (info) {
            console.log(info, "机构详情");
            // 调用模板引擎处理机构信息
            var orgHtml = template("orgDetail", info);
            $(".app-jigou-detial").append(orgHtml);
        }
    });


});