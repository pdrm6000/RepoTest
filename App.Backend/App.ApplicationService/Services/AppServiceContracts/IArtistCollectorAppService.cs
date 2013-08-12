using System.Collections.Generic;
using App.ApplicationService.Services.BaseServices;
using App.Domain.ValueObjects.DTO;

namespace App.ApplicationService.Services.AppServiceContracts
{
    public interface IArtistCollectorAppService : IBreezeApplicationService<ArtistDTO>
    {
        IEnumerable<ArtistWithAlbumsDTO> GetAllWithAlbums();
    }
}