using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.AppServiceContracts;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace App.Rest.Controllers
{
    [BreezeController]
    public class RatesRestController : ApiController
    {
        private readonly IRatesCollectorAppService _ratesCollectorAppService;

        public RatesRestController(IRatesCollectorAppService ratesCollectorAppService)
        {
            _ratesCollectorAppService = ratesCollectorAppService;
        }

        public IQueryable<RateDTO> Get()
        {
            return _ratesCollectorAppService.Entities;
        }

        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _ratesCollectorAppService.SaveChanges(saveBundle);
        }

        [HttpGet]
        public Dictionary<int, double> GetRatesByAlbums([FromUri] int[] albumIds)
        {
            return _ratesCollectorAppService.GetRatesByAlbums(albumIds);
        }
    }
}