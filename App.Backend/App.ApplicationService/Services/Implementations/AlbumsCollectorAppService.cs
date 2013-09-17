using System;
using System.Linq;
using App.ApplicationService.DTO;
using App.ApplicationService.Extensions;
using App.ApplicationService.Services.AppServiceContracts;
using App.Domain.DomainServices.Contracts;
using App.Domain.RepositoryContracts;
using App.Domain.Model;
using IAlbumsCollectorAppService = App.ApplicationService.Services.AppServiceContracts.IAlbumsCollectorAppService;

namespace App.ApplicationService.Services.Implementations
{
    public class AlbumsCollectorAppService : IAlbumsCollectorAppService
    {
        private readonly IAlbumsRepository _albumsRepository;
        private readonly IArtistsRepository _artistsRepository;
        private readonly IRandomAlbumSelector _randomAlbumSelector;
        private readonly IAlbumsNavigationCache _albumsNavigationCache;

        public AlbumsCollectorAppService(IAlbumsRepository albumRepository, IArtistsRepository artistsRepository, IRandomAlbumSelector randomAlbumSelector, IAlbumsNavigationCache albumsNavigationCache)
        {
            _albumsRepository = albumRepository;
            _artistsRepository = artistsRepository;
            _randomAlbumSelector = randomAlbumSelector;
            _albumsNavigationCache = albumsNavigationCache;
        }

        /// <summary>
        /// Next album is selected using ramdon function (if not cache)
        /// </summary>
        /// <param name="guid"></param>
        /// <returns></returns>
        public AlbumDTO GetNextAlbum(Guid guid)
        {
            if (_albumsNavigationCache.CanUseCache(guid))
                return _albumsNavigationCache.GetNextAlbum(guid);
            var result = new AlbumDTO();
            var albumId = _randomAlbumSelector.GetAlbumId();
            var album = _albumsRepository.GetById(albumId);
            if (album != null)
            {
                var artist = _artistsRepository.GetById(album.ArtistId);
                result.FillAlbumDTO(album, artist);
            }
            _albumsNavigationCache.AddAlbum(guid, result);
            return result;
        }

        /// <summary>
        /// Previous albums are always taked from cache
        /// </summary>
        /// <param name="guid"></param>
        /// <returns></returns>
        public AlbumDTO GetPreviousAlbum(Guid guid)
        {
            return _albumsNavigationCache.GetPreviousAlbum(guid);
        }


        public Album GetAlbumById(int id)
        {
            return _albumsRepository.GetById(id);
        }

        public AlbumEditingDTO AddAlbum(AlbumEditingDTO album)
        {
            var entity = album.ToAlbum();
            _albumsRepository.Add(entity);
            return entity.ToAlbumEditingDTO();
        }

        public int DeleteAlbums(int[] ids)
        {
            var result = 0;
            if (ids!=null && ids.ToList().Count>0)
            {
                foreach (var id in ids)
                {
                    result += _albumsRepository.Remove(id);
                }
            }
            return result;
        }

        public int UpdateAlbum(Album album)
        {
            return _albumsRepository.Modify(album);
        }
    }
}
