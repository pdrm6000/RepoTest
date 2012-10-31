using System.Web.Http;
using App.Domain.AppServiceContracts;
using App.Domain.ValueObjects.DTO;

namespace AppTest.Controllers
{
    public class AlbumsRestController : ApiController
    {
        private readonly IAlbumsCollectorAppService _albumsCollectorAppService;

        public AlbumsRestController(IAlbumsCollectorAppService albumsCollectorAppService)
        {
            _albumsCollectorAppService = albumsCollectorAppService;
        }

        public AlbumDTO Get()
        {
            return _albumsCollectorAppService.GetAlbumRamdon();
        }
    }
}
