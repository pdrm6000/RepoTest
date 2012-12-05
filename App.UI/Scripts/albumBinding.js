
function AlbumViewModel(album, year, artist, comments, image) {
    this.AlbumName = ko.observable(album);
    this.Year = ko.observable(year);
    this.ArtistName = ko.observable(artist);
    this.Comments = ko.observable(comments);
    this.ImageUrl = ko.observable('../../Images/Covers/' + image);
}

function DownloadAlbum() {
    $.ajax({
        url: "../api/AlbumsRest",
        accepts: "application/json",
        cache: false,
        statusCode:
                    {
                        200: function (data) {
                            ko.applyBindings(new AlbumViewModel(
                            data['AlbumName'],
                            data['Year'],
                            data['ArtistName'],
                            data['Comments'],
                            data['CoverUrl']
                        ));
                        },
                        401: function (jqXHR, textStatus, errorThrown) {
                            self.location = '/Account/Login/';
                            alert('');
                        }
                    }
                ,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Error');
        }
    });
}   

function NextAlbum() {
    //$("#CurrentAlbumData").animate({ left: "+=700" }, 1200);
    var options = {};
    $("#CurrentAlbumData").effect('drop', options, 1000);
}

function DownloadNextAlbum() {
    DownloadAlbum();
    NextAlbum();
}

$(function () {
    $("#NextAlbum").click(DownloadNextAlbum);
});

$(function () {
    $("#PreviousAlbum").click(DownloadAlbum);
});

$(document).ready(function () {
    DownloadAlbum();
});

$(function () {
    $('#da-slider').cslider();
});