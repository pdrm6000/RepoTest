﻿using App.ApplicationService.DTO;
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

        public static AlbumCatalogDTO ToAlbumCatalog(this Album album)
        {
            if (album != null)
            {
                return new AlbumCatalogDTO
                        {
                            AlbumName = album.Name,
                            ArtistId = album.ArtistId,
                            ArtistName = album.Artist == null ? string.Empty : album.Artist.Name,
                            CoverUrl = album.CoverUrl,
                            Id = album.Id,
                            Year = album.Year
                        };
            }
            return null;
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


        public static CommentDTO ToCommentDTO(this Comment comment)
        {
            return new CommentDTO
            {
                Id = comment.Id,
                AlbumId = comment.AlbumId,
                Body = comment.Body,
                Date = comment.Date,
                UserId = comment.UserId,
            };
        }

        public static Comment ToComment(this CommentDTO comment)
        {
            return new Comment
            {
                AlbumId = comment.AlbumId,
                Body = comment.Body,
                Date = comment.Date,
                UserId = comment.UserId,
            };
        }

        public static RateDTO ToRateDTO(this Rate rate)
        {
            return new RateDTO
            {
                Id = rate.Id,
                AlbumId = rate.AlbumId,
                Date = rate.Date,
                UserId = rate.UserId,
                Value = rate.Value,
            };
        }

        public static Rate ToRate(this RateDTO rate)
        {
            return new Rate
            {
                AlbumId = rate.AlbumId,
                Date = rate.Date,
                UserId = rate.UserId,
                Value = rate.Value,
            };
        }
    }
}
