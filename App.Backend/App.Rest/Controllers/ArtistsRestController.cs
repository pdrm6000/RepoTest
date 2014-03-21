using System.Linq;
using System.Web.Http;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.BaseServices;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace App.Rest.Controllers
{
    //[HttpHeader("Access-Control-Allow-Origin", "*")].

    [BreezeController]
    public class ArtistsRestController : ApiController
    {
        private readonly IBreezeApplicationService<ArtistDTO> _artistCollectorAppService;

        public ArtistsRestController(IBreezeApplicationService<ArtistDTO> artistCollectorAppService)
        {
            _artistCollectorAppService = artistCollectorAppService;
        }

		[Authorize]
        public IQueryable<ArtistDTO> Get()
        {
            return _artistCollectorAppService.Entities;
        }

        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _artistCollectorAppService.SaveChanges(saveBundle);
        }

    }
}