using System;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.Domain.AppServiceContracts
{
    public interface IAlbumsCollectorAppService
    {
        Album GetAlbumById(int id);
        AlbumEditingDTO AddAlbum(AlbumEditingDTO album);
        AlbumDTO GetNextAlbum(Guid guid);
        AlbumDTO GetPreviousAlbum(Guid guid);
        int DeleteAlbums(int[] ids);
    }
}
