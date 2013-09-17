using System;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.AppServiceContracts;
using App.CrossCutting.Caching;

namespace App.ApplicationService.Services.Implementations
{
    public class AlbumsNavigationCache : IAlbumsNavigationCache
    {
        private readonly ICacheService _cacheService;

        public AlbumsNavigationCache(ICacheService cacheService)
        {
            _cacheService = cacheService;
        }

        public bool CanUseCache(Guid guid)
        {
            var userAlbumNavigation = GetUserAlbumsNavigation(guid);
            if (userAlbumNavigation != null)
                return !userAlbumNavigation.IsAtTop();
            return false;
        }

        public AlbumDTO GetNextAlbum(Guid guid)
        {
            var userAlbumNavigation = GetUserAlbumsNavigation(guid);
            if (userAlbumNavigation == null)
                return null;
            var result = userAlbumNavigation.GetNext();
            PutInCache(guid, userAlbumNavigation);
            return result;
        }

        public AlbumDTO GetPreviousAlbum(Guid guid)
        {
            var userAlbumNavigation = GetUserAlbumsNavigation(guid);
            if (userAlbumNavigation == null)
                return null;
            var result = userAlbumNavigation.GetPrevious();
            PutInCache(guid, userAlbumNavigation);
            return result;
        }

        public void AddAlbum(Guid guid, AlbumDTO album)
        {
            var userAlbumNavigation = GetUserAlbumsNavigation(guid);
            if (userAlbumNavigation == null)
            {
                AddNewAlbumToCache(guid, album);
            }
            else
            {
                userAlbumNavigation.Add(album);
                PutInCache(guid, userAlbumNavigation);
            }
        }

        private void AddNewAlbumToCache(Guid guid, AlbumDTO album)
        {
            var cache = _cacheService.GetCache();
            var userAlbumsNavigation = new UserAlbumsNavigation();
            userAlbumsNavigation.Add(album);
            cache.Add(guid.ToString(), userAlbumsNavigation, new TimeSpan(0, 5, 0));
        }

        private void PutInCache(Guid guid, UserAlbumsNavigation userAlbumNavigation)
        {
            var cache = _cacheService.GetCache();
            cache.Put(guid.ToString(), userAlbumNavigation);
        }

        private UserAlbumsNavigation GetUserAlbumsNavigation(Guid guid)
        {
            var cache = _cacheService.GetCache();
            return cache.Get(guid.ToString()) as UserAlbumsNavigation;
        }

    }
}