using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using App.Domain.AppServiceContracts;
using App.Domain.ValueObjects.DTO;
using App.UI.Metadata;

namespace App.UI.Controllers
{
    public class AlbumsRestController : ApiController
    {
        private readonly IAlbumsCollectorAppService _albumsCollectorAppService;

        public AlbumsRestController(IAlbumsCollectorAppService albumsCollectorAppService)
        {
            _albumsCollectorAppService = albumsCollectorAppService;
        }

        public string Get()
        {
            return "Not Implemented method";
        }

        public HttpResponseMessage Post(AlbumEditingDTO album)
        {
            var newAlbum = _albumsCollectorAppService.AddAlbum(album);
            return Request.CreateResponse<AlbumEditingDTO>(HttpStatusCode.OK, newAlbum);
        }

        [HttpGet]
        public AlbumDTO Next()
        {
            return _albumsCollectorAppService.GetNextAlbum(Guid.Parse(Request.Properties[SessionIdHandler.SessionIdToken].ToString()));
        }

        [HttpGet]
        public AlbumDTO Previous()
        {
            return _albumsCollectorAppService.GetPreviousAlbum(Guid.Parse(Request.Properties[SessionIdHandler.SessionIdToken].ToString()));
        }
    }
}