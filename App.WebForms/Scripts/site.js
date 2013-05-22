function addArtist() {
    $('#addDialog').modal('show');
}
function sendArtist(url) {
    $.ajax({
        type: 'POST',
        url: url,
        data: '{ "artistDTO": {"Id": 0, "Name" : "Pablo", "ImageUrl" : "Rodriguez"} }',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {}
    });
}