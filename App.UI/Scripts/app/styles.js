$(function () {
    $("ul#menu li a").hover(function () {
        $(this).animate({ backgroundColor: '#7c7c7c', color: 'white' }, 150);
    }, function () {
        $(this).animate({ backgroundColor: "white", color: '#b5b5b5' }, 150);
    });
});