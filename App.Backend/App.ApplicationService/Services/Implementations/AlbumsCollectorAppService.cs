using System;
using System.Linq;
using App.ApplicationService.DTO;
using App.ApplicationService.Extensions;
using App.ApplicationService.Services.AppServiceContracts;
using App.ApplicationService.Services.BaseServices;
using App.Domain.Model;
using App.DomainServices.BaseTypes;
using App.DomainServices.Services.Contracts;
using IAlbumsCollectorAppService = App.ApplicationService.Services.AppServiceContracts.IAlbumsCollectorAppService;

namespace App.ApplicationService.Services.Implementations
{
	public class AlbumsCollectorAppService : BreezeAppService<AlbumCatalogDTO>, IAlbumsCollectorAppService
	{
		private readonly IAlbumsDomainService _albumDomainService;
		private readonly IArtistsDomainService _artistsDomainService;
		private readonly IRandomAlbumSelector _randomAlbumSelector;
		private readonly IAlbumsNavigationCache _albumsNavigationCache;

		public AlbumsCollectorAppService(
			IAlbumsDomainService albumDomainService,
			IArtistsDomainService artistsDomainService,
			IRandomAlbumSelector randomAlbumSelector,
			IAlbumsNavigationCache albumsNavigationCache)
		{
			_albumDomainService = albumDomainService;
			_artistsDomainService = artistsDomainService;
			_randomAlbumSelector = randomAlbumSelector;
			_albumsNavigationCache = albumsNavigationCache;
		}

		public override IQueryable<AlbumCatalogDTO> Entities
		{
			get
			{
                return _albumDomainService
                        .GetAll()
                        .ToList()
                        .Select(x => x.ToAlbumCatalog())
                        .AsQueryable();
			}
		}

		protected override AlbumCatalogDTO OnAdd(AlbumCatalogDTO album)
		{
			var entity = album.ToAlbum();
			_albumDomainService.Add(entity);
			return entity.ToAlbumCatalog();
		}

		protected override int OnDelete(AlbumCatalogDTO entity)
		{
			return _albumDomainService.Remove(entity.Id);
		}

		protected override int OnUpdate(AlbumCatalogDTO album)
		{
			return _albumDomainService.Modify(album.ToAlbum());
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
			var album = _albumDomainService.GetById(albumId);
			if (album != null)
			{
				var artist = _artistsDomainService.GetById(album.ArtistId);
				result.FillAlbumDTO(album, artist);
			}
			_albumsNavigationCache.AddAlbum(guid, result);
			return result;
		}

		/// <summary>
		/// Previous albums are always token from cache
		/// </summary>
		/// <param name="guid"></param>
		/// <returns></returns>
		public AlbumDTO GetPreviousAlbum(Guid guid)
		{
			return _albumsNavigationCache.GetPreviousAlbum(guid);
		}

	}
}
