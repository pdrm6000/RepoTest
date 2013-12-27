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
		public IQueryable<AlbumCatalogDTO> GetAlbumsForReview(int albumsCount)
		{
			return _albumsCollectorAppService.GetAlbumsForReview(Guid.Parse(Request.Properties[SessionIdHandler.SessionIdToken].ToString()), albumsCount);
		}

	}
}