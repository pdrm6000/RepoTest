using System.Collections.Generic;
using App.Domain.ValueObjects.DTO;

namespace App.Domain.AppServiceContracts
{
    public interface IArtistCollectorAppService
    {
        IEnumerable<ArtistDTO> GetAll();
        int UpdateArtist(ArtistDTO value);
        ArtistDTO AddArtist(ArtistDTO value);
    }
}