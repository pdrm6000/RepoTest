using System;
using System.Linq;
using System.Web.Http;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.AppServiceContracts;
using App.Rest.Metadata;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace App.Rest.Controllers
{
    [BreezeController]
    public class AlbumsRestController : ApiController
    {
        private readonly IAlbumsCollectorAppService _albumsCollectorAppService;

        public AlbumsRestController(IAlbumsCollectorAppService albumsCollectorAppService)
        {
            _albumsCollectorAppService = albumsCollectorAppService;
        }

        public IQueryable<AlbumCatalogDTO> Get()
        {
            return _albumsCollectorAppService.Entities;
        }

        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _albumsCollectorAppService.SaveChanges(saveBundle);
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