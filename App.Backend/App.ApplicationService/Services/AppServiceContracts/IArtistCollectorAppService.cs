using System.Collections.Generic;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.BaseServices;

namespace App.ApplicationService.Services.AppServiceContracts
{
    public interface IArtistCollectorAppService : IBreezeApplicationService<ArtistDTO>
    {
        IEnumerable<ArtistWithAlbumsDTO> GetAllWithAlbums();
    }
}