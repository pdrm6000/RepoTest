define("viewmodels/artistsDirectory", ['viewmodels/datacontext', 'viewmodels/artistsDirectory.model', 'durandal/app', 'knockout'],
    function (datacontext, artistModel, app, ko) {

        var editedArtist;
        var lasteditpopup;
        var lastaddpopup;

        var vm =
        addArtist = function () {
            //artistModel.addingArtist = datacontext.createArtist();
            artistModel.selectedArtist.Name('');
            artistModel.selectedArtist.ImageUrl('');
            $('#addDialog').modal('show');
        },
        deleteArtist = function () {

        },
        editArtist = function (item) {
            editedArtist = item;
            //item.viewUrl = 'views/editArtist';
            //item.finishArtistEditing = finishArtistEditing;
            //app.showModal(item);

            artistModel.selectedArtist.Name(item.Name());
            artistModel.selectedArtist.FullImageUrl(item.FullImageUrl());
            artistModel.selectedArtist.ImageUrl(item.ImageUrl());
            //$("#editDialog").modal('show');
        },
        activate = function () {
            artistModel.clear();
            //artistModel.addingArtist = datacontext.createArtist();
            return datacontext.downloadAllArtists().then(processArtistsDownloaded);
        },
        processArtistsDownloaded = function (data) {
            artistModel.artistsCollection(data.results);
        },
        finishArtistEditing = function () {
            lasteditpopup = toastr.info('Saving artist...');
            editedArtist.ImageUrl(artistModel.selectedArtist.ImageUrl());
            editedArtist.Name(artistModel.selectedArtist.Name());
            datacontext.saveArtists().then(notifyArtistEdited);
        },
        finishArtistAdding = function () {
            lastaddpopup = toastr.info('Adding artist...');
            var newArtist = datacontext.createArtist();
            newArtist.Name(artistModel.selectedArtist.Name());
            newArtist.ImageUrl(artistModel.selectedArtist.ImageUrl());
            artistModel.artistsCollection.push(newArtist);
            datacontext.saveArtists().then(notifyArtistAdded);
        },
        notifyArtistAdded = function (data) {
            artistModel.artistsCollection.push(data);
            toastr.success('<h4>Completed</h4>Artist added succesfully');
            toastr.clear(lastaddpopup);
        },
        notifyArtistEdited = function (e, result) {
            toastr.success('<h4>Completed</h4>Artist saved succesfully');
            toastr.clear(lasteditpopup);
        },
        name = ko.observable('test'),
        viewAttached = function (view) {
            $(".span3").hover(function () {
                $(this).find(".AlbumsDirArtist").animate({ marginTop: 140, height: 60 }, 150);
            }, function () {
                $(this).find(".AlbumsDirArtist").animate({ marginTop: 150, height: 50 }, 150);
            });
        };


        return {
            artists: artistModel,
            addArtist: addArtist,
            editArtist: editArtist,
            deleteArtist: deleteArtist,
            finishArtistEditing: finishArtistEditing,
            finishArtistAdding: finishArtistAdding,
            activate: activate,
            viewAttached: viewAttached,
            afterBind: viewAttached,
            name: name,
        };
    });

