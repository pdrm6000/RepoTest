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

        public static ArtistWithAlbumsDTO ToArtistWithAlbumsDTO(this Artist artist)
        {
            return new ArtistWithAlbumsDTO()
            {
                Id = artist.Id,
                Name = artist.Name,
                Albums = artist.Albums.Select(a => a.ToAlbumEditingDTO())
            };
        }

        public static AlbumEditingDTO ToAlbumEditingDTO(this Album album)
        {
            return new AlbumEditingDTO()
            {
                Id = album.Id,
                AlbumName = album.Name,
                CoverUrl = album.CoverUrl,
                Year = album.Year,
                ArtistId = album.ArtistId
            };
        }

        public static Album ToAlbum(this AlbumEditingDTO album)
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
