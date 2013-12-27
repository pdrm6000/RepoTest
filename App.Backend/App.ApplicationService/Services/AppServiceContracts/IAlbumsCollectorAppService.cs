using System;
using System.Linq;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.BaseServices;

namespace App.ApplicationService.Services.AppServiceContracts
{
	public interface IAlbumsCollectorAppService : IBreezeApplicationService<AlbumCatalogDTO>
	{
		IQueryable<AlbumCatalogDTO> GetAlbumsForReview(Guid parse, int albumsCount);
	}
}
