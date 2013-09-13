define("viewmodels/datacontext", ['breeze','knockout'], function (breeze,ko) {

    window["ko"] = ko;
    breeze.config.initializeAdapterInstance("modelLibrary", "ko", true);
    
    var urlBase = "../api/";
    var artistsRestManager = new breeze.EntityManager({ dataService: new breeze.DataService({
        serviceName: urlBase + 'ArtistsRest',
        hasServerMetadata: false // don't ask the server for metadata
        })
    });
    var albumsRestManager = new breeze.EntityManager({
        dataService: new breeze.DataService({
            serviceName: urlBase + 'AlbumsRest',
            hasServerMetadata: false // don't ask the server for metadata
        })
    });
    
    
    $(document).ajaxError(function (event, jqxhr, settings, exception) {
        if (settings.url == "ajax/missing.html") {
            $("div.log").text("Triggered ajaxError handler.");
        }
    });

    artistsMetadataStore = artistsRestManager.metadataStore,
    albumsMetadataStore = albumsRestManager.metadataStore,
    downloadNextAlbum = function () {
        var nextAlbum = downloadAlbum('Next');
        return nextAlbum;
    },
    downloadPreviousAlbum = function () {
        var previousAlbum = downloadAlbum('Previous');
        return previousAlbum;
    },
    downloadAlbum = function (action) {
        var query = new breeze.EntityQuery().from(action);
        return albumsRestManager.executeQuery(query);
    },
    downloadArtist = function (action) {
        var query = new breeze.EntityQuery().from(action).orderBy("Name");
        return artistsRestManager.executeQuery(query);
    },
    downloadAllArtists = function () {
        var allArtists = downloadArtist('GET');
        return allArtists;
    },
    createArtist = function (initialValues) {
        var customerType = artistsRestManager.metadataStore.getEntityType('ArtistDTO'); 
        return customerType.createEntity(initialValues);
    },
    addArtist = function (artist) {
        artistsRestManager.addEntity(artist);
    },
    addAlbum = function (artist) {
        var value = albumsRestManager.createEntity('AlbumDTO', artist);
        albumsRestManager.addEntity(value); // attach the entity as a new entity; it's EntityState is "Added"
        return albumsRestManager.saveChanges();

        //return $.ajax({
        //    url: urlBase + "AlbumsRest/Post/",
        //    data: JSON.stringify(artist),
        //    type: "POST",
        //    contentType: "application/json;charset=utf-8",
        //    error: function (XMLHttpRequest, textStatus, errorThrown) {
        //        alert('Error: ' + textStatus);
        //    }
        //});
    },
    deleteAlbums = function (ids) {
        return $.ajax({
            url: urlBase + "AlbumsRest/Delete/",
            data: JSON.stringify(ids),
            type: "DELETE",
            contentType: "application/json;charset=utf-8",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    },
    saveArtists = function () {
        return artistsRestManager.saveChanges();
    },
    updateAlbum = function (album) {
        return $.ajax({
            url: urlBase + "AlbumsRest/Put/" + album.Id,
            data: JSON.stringify(album),
            type: "PUT",
            contentType: "application/json;charset=utf-8",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    },
    downloadArtistsWithAlbums = function () {
        var query = new breeze.EntityQuery().from('GetWithAlbums');
        return artistsRestManager.executeQuery(query);
        
        return $.ajax({
            url: urlBase + "ArtistsRest/GetWithAlbums",
            accepts: "application/json",
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Error: ' + textStatus);
            }
        });
    };

    return {
        artistsMetadataStore: artistsMetadataStore,
        albumsMetadataStore: albumsMetadataStore,
        downloadNextAlbum: downloadNextAlbum,
        downloadPreviousAlbum: downloadPreviousAlbum,
        downloadAllArtists: downloadAllArtists,
        addArtist: addArtist,
        addAlbum: addAlbum,
        downloadArtistsWithAlbums: downloadArtistsWithAlbums,
        deleteAlbums: deleteAlbums,
        saveArtists: saveArtists,
        createArtist: createArtist,
    };
});