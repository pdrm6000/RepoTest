using System;
using App.Domain.ValueObjects.DTO;

namespace App.CrossCutting.Caching
{
    public interface IAlbumsNavigationCache
    {
        bool CanUseCache(Guid guid);
        AlbumDTO GetNextAlbum(Guid guid);
        AlbumDTO GetPreviousAlbum(Guid guid);
        void AddAlbum(Guid guid, AlbumDTO album);
    }
}
