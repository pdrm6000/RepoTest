﻿using System;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.Domain.AppServiceContracts
{
    public interface IAlbumsCollectorAppService
    {
        Album GetAlbumById(int id);
        int AddAlbum(Album album);
        AlbumDTO GetNextAlbum(Guid guid);
        AlbumDTO GetPreviousAlbum(Guid guid);
    }
}
