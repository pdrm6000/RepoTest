using System;
using System.Linq;
using App.ApplicationService.DTO;
using App.ApplicationService.Extensions;
using App.ApplicationService.Services.AppServiceContracts;
using App.ApplicationService.Services.BaseServices;
using App.Domain.DomainServices.Contracts;
using App.Domain.RepositoryContracts;
using IAlbumsCollectorAppService = App.ApplicationService.Services.AppServiceContracts.IAlbumsCollectorAppService;

namespace App.ApplicationService.Services.Implementations
{
    public class AlbumsCollectorAppService : BreezeAppService<AlbumCatalogDTO>, IAlbumsCollectorAppService
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

        public override IQueryable<AlbumCatalogDTO> Entities
        {
            get
            {
                return _artistsRepository
                        .GetAllWithAlbums()
                        .SelectMany(x => x.ToAlbumCatalog())
                        .AsQueryable();
            }
        }

        protected override AlbumCatalogDTO OnAdd(AlbumCatalogDTO album)
        {
            var entity = album.ToAlbum();
            _albumsRepository.Add(entity);
            return entity.ToAlbumCatalogDTO();
        }

        protected override int OnDelete(AlbumCatalogDTO entity)
        {
            return _albumsRepository.Remove(entity.Id);
        }

        protected override int OnUpdate(AlbumCatalogDTO album)
        {
            return _albumsRepository.Modify(album.ToAlbum());
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

    }
}
