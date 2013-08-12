using System;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.ApplicationService.Services.AppServiceContracts
{
    public interface IAlbumsCollectorAppService
    {
        Album GetAlbumById(int id);
        AlbumEditingDTO AddAlbum(AlbumEditingDTO album);
        AlbumDTO GetNextAlbum(Guid guid);
        AlbumDTO GetPreviousAlbum(Guid guid);
        int DeleteAlbums(int[] ids);
        int UpdateAlbum(Album toAlbum);
    }
}
