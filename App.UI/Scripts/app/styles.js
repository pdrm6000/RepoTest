$(function () {
    $("ul#menu li a").hover(function () {
        $(this).animate({ backgroundColor: '#7c7c7c', color: 'white' }, 150);
    }, function () {
        $(this).animate({ backgroundColor: "white", color: '#b5b5b5' }, 150);
    });
});

artistEffects = function () {
    $(".AlbumsDirItem").hover(function() {
        $(this).animate({ borderColor: "#5c5c5c" }, 150);
        $(this).find(".AlbumsDirArtist").animate({ marginTop: 140, height: 60 }, 150);
    }, function() {
        $(this).animate({ borderColor: "fdfdfd" }, 150);
        $(this).find(".AlbumsDirArtist").animate({ marginTop: 150, height: 50 }, 150);
    });
}

function createAutoClosingAlert(selector, delay) {
    $(selector).fadeIn(500);
    window.setTimeout(function () { $(selector).fadeOut(500); }, delay);
}

//$('.alert .close').live("click", function (e) {
//    $(this).parent().hide();
//});