using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.Domain.Extensions
{
    public static class ArtistExtensions
    {
        public static ArtistDTO ToArtistDTO(this Artist artist)
        {
            return new ArtistDTO()
                       {
                           Id = artist.Id,
                           Name = artist.Name,
                           FullImageUrl = "background: url(../../Images/Artist/" + artist.ImageUrl + ") no-repeat; background-size: 100%;",
                           ImageUrl = artist.ImageUrl
                       };
        }

        public static Artist ToArtist(this ArtistDTO artistDTO)
        {
            return new Artist()
            {
                Id = artistDTO.Id,
                Name = artistDTO.Name,
                ImageUrl = artistDTO.ImageUrl
            };
        }
    }
}
