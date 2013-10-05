using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using App.ApplicationService.DTO;
using App.Domain.Model;

namespace App.ApplicationService.Extensions
{
    public static class MappingExtensions
    {
        public static ArtistDTO ToArtistDTO(this Artist artist)
        {
            return new ArtistDTO()
                       {
                           Id = artist.Id,
                           Name = artist.Name,
                           ImageUrl = artist.ImageUrl
                       };
        }

        public static IQueryable<AlbumCatalogDTO> ToAlbumCatalog(this Artist artist)
        {
            if (artist.Albums != null)
            {
                return artist.Albums.Select(album => new AlbumCatalogDTO
                                                         {
                                                             AlbumName = album.Name,
                                                             ArtistId = album.ArtistId,
                                                             ArtistName = artist.Name,
                                                             CoverUrl = album.CoverUrl,
                                                             Id = album.Id,
                                                             Year = album.Year
                                                         })
                                                        .AsQueryable();
            }
            return null;
        }

        public static AlbumCatalogDTO ToAlbumCatalogDTO(this Album album)
        {
            return new AlbumCatalogDTO()
            {
                Id = album.Id,
                AlbumName = album.Name,
                CoverUrl = album.CoverUrl,
                Year = album.Year,
                ArtistId = album.ArtistId
            };
        }

        public static Album ToAlbum(this AlbumCatalogDTO album)
        {
            return new Album()
            {
                Id = album.Id,
                Name = album.AlbumName,
                CoverUrl = album.CoverUrl,
                Year = album.Year,
                ArtistId = album.ArtistId
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

        public static AlbumDTO FillAlbumDTO(this AlbumDTO artistDTO, Album album, Artist artist)
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
