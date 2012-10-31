using System.Globalization;
using App.Domain.DomainServices.Contracts;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.Domain.DomainServices.Implementations
{
    public class AlbumDTOGeneratorService : IAlbumDTOGeneratorService
    {
        public AlbumDTO GetAlbumDTO(Album album, Artist artist)
        {
            return new AlbumDTO
                       {
                           ActualRating = 10,
                           AlbumName = album.Name,
                           ArtistName = artist.Name,
                           Comments = "10 comments",
                           CoverUrl = album.CoverUrl,
                           Year = album.Year.ToString(CultureInfo.InvariantCulture)
                       };
        }
    }
}