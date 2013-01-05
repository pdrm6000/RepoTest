using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using App.Domain.AppServiceContracts;
using App.Domain.ValueObjects.DTO;

namespace AppTest.Controllers
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

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, ArtistDTO value)
        {
            _artistCollectorAppService.UpdateArtist(value);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}