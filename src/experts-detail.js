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

    var expId = GetQueryString("expId");
    console.log(expId,"expid");

    // 立即咨询
    // $('.consult-now').on('tap',function () {
    //     var tel = $('.contact-way').text();
    //     tel = "tel:"+tel;
    //     console.log(tel);
    //     $('.consult-now a').attr('href',tel);
    // });

    $.ajax({
        url: "http://120.27.226.156:8080/roo-mobile-web/expert/" + expId,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (info) {
            console.log(info, "专家详情");
            // if(info.httpCode == 200){
            //     $('.app-jigou-name').text(info.data.name);
            //     $('.organization').append(info.data.typeName+'专家');
            //     $('.contact-man').append(info.data.organ);
            //     $('.contact-way').append(info.data.phone);
            //     $('.organization-summary').append(info.data.remark);
            //
            // }
            // 调用模板引擎处理机构信息
            var expHtml = template("expDetail", info);
            $(".expDetail").append(expHtml);
        }
    });


});