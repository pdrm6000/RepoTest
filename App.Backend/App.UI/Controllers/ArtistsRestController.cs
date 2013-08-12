using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using App.ApplicationService.Services.AppServiceContracts;
using App.Domain.ValueObjects.DTO;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace App.UI.Controllers
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

        //// POST api/<controller>
        //public HttpResponseMessage Post(ArtistDTO artist)
        //{
        //    var newArtist = _artistCollectorAppService.AddArtist(artist);
        //    return Request.CreateResponse<ArtistDTO>(HttpStatusCode.OK, newArtist);
        //}

        //// PUT api/<controller>/5
        //public void Put(int id, ArtistDTO value)
        //{
        //    _artistCollectorAppService.UpdateArtist(value);
        //}

        //// DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}
    }
}