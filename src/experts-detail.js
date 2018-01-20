/**
 * Created by 919482722 on 2018/1/19.
 */
$(function () {
    $('.consult-now').on('tap',function () {
        var tel = $('.contact-way').text();
        tel = "tel:"+tel;
        console.log(tel);
        $('.consult-now a').attr('href',tel);
    })
})