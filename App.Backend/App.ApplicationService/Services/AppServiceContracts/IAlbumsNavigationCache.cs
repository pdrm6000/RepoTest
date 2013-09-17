using System;
using App.ApplicationService.DTO;

namespace App.ApplicationService.Services.AppServiceContracts
{
    public interface IAlbumsNavigationCache
    {
        bool CanUseCache(Guid guid);
        AlbumDTO GetNextAlbum(Guid guid);
        AlbumDTO GetPreviousAlbum(Guid guid);
        void AddAlbum(Guid guid, AlbumDTO album);
    }
}
