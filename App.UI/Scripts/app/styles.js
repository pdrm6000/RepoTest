$(function () {
    $("ul#menu li a").hover(function () {
        $(this).animate({ backgroundColor: '#7c7c7c', color: 'white' }, 150);
        $(this).tooltip({ delay: { show: 100, hide: 100 }, placement: 'bottom', animation: 'true' },'show');
        //$(this).tooltip('show');
    }, function () {
        $(this).animate({ backgroundColor: "white", color: '#b5b5b5' }, 150);
        $(this).tooltip('hide');
    });
});

function createAutoClosingAlert(selector, delay) {
    $(selector).fadeIn(500);
    window.setTimeout(function () { $(selector).fadeOut(500); }, delay);
}

//$('.alert .close').live("click", function (e) {
//    $(this).parent().hide();
//});