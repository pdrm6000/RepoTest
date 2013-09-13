using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.AppServiceContracts;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace App.Rest.Controllers
{
    //[HttpHeader("Access-Control-Allow-Origin", "*")].

    [BreezeController]
    public class ArtistsRestController : ApiController
    {
        private readonly IArtistCollectorAppService _artistCollectorAppService;

        public ArtistsRestController(IArtistCollectorAppService artistCollectorAppService)
        {
            _artistCollectorAppService = artistCollectorAppService;
        }

        // GET api/<controller>
        public IQueryable<ArtistDTO> Get()
        {
            return _artistCollectorAppService.Entities;
        }

        // GET api/<controller>
        public IEnumerable<ArtistWithAlbumsDTO> GetWithAlbums()
        {
            return _artistCollectorAppService.GetAllWithAlbums();
        }

        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _artistCollectorAppService.SaveChanges(saveBundle);
        }

    }
}