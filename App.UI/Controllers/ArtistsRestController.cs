using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using App.Domain.AppServiceContracts;
using App.Domain.ValueObjects.DTO;

namespace App.UI.Controllers
{
    public class ArtistsRestController : ApiController
    {
        private readonly IArtistCollectorAppService _artistCollectorAppService;

        public ArtistsRestController(IArtistCollectorAppService artistCollectorAppService)
        {
            _artistCollectorAppService = artistCollectorAppService;
        }

        // GET api/<controller>
        public IEnumerable<ArtistDTO> Get()
        {
            return _artistCollectorAppService.GetAll();
        }

        // GET api/<controller>
        public IEnumerable<ArtistWithAlbumsDTO> GetWithAlbums()
        {
            return _artistCollectorAppService.GetAllWithAlbums();
        }

        // POST api/<controller>
        public HttpResponseMessage Post(ArtistDTO artist)
        {
            var newArtist = _artistCollectorAppService.AddArtist(artist);
            return Request.CreateResponse<ArtistDTO>(HttpStatusCode.OK, newArtist);
        }

        // PUT api/<controller>/5
        public void Put(int id, ArtistDTO value)
        {
            Thread.Sleep(500);
            _artistCollectorAppService.UpdateArtist(value);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}