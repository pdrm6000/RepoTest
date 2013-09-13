using System;
using App.ApplicationService.DTO;
using App.Domain.Model;

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
