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
    }
}
