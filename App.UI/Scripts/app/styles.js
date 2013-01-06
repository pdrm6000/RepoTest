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

createArtistDialog = function () {
    $("#editDialog").dialog({
        autoOpen: false,
        width: 600,
        modal: true,
        show: { effect: 'drop', direction: "up", duration: 350 },
        hide: { effect: 'drop', direction: "down", duration: 150 },
        buttons: {
            "Ok": {
                priority: 'primary',
                text: 'Ok',
                class: 'AlbumComments',
                click: function () {
                    $(this).dialog("close");
                    albumApp.artistViewModel.finishArtistEditing();
                }
            },
            "Cancel": {
                priority: 'secondary',
                text: 'Cancel',
                class: 'AlbumComments',
                click: function () {
                    $(this).dialog("close");
                }
            }
        }
    });
}