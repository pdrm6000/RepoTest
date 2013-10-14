using System;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.BaseServices;

namespace App.ApplicationService.Services.AppServiceContracts
{
    public interface IAlbumsCollectorAppService : IBreezeApplicationService<AlbumCatalogDTO>
    {
        AlbumDTO GetNextAlbum(Guid guid);
        AlbumDTO GetPreviousAlbum(Guid guid);
    }
}
