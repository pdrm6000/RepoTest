using System.Collections.Generic;
using App.Domain.ValueObjects.DTO;

namespace App.Domain.AppServiceContracts
{
    public interface IArtistCollectorAppService
    {
        IEnumerable<ArtistDTO> GetAll();
        IEnumerable<ArtistDTO> GetAllWithAlbums();
        int UpdateArtist(ArtistDTO value);
        ArtistDTO AddArtist(ArtistDTO value);
    }
}