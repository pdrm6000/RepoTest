using System;
using System.Linq;
using App.ApplicationService.DTO;
using App.ApplicationService.Extensions;
using App.ApplicationService.Services.BaseServices;
using App.DomainServices.Services.Contracts;
using IAlbumsCollectorAppService = App.ApplicationService.Services.AppServiceContracts.IAlbumsCollectorAppService;

namespace App.ApplicationService.Services.Implementations
{
	public class AlbumsCollectorAppService : BreezeAppService<AlbumCatalogDTO>, IAlbumsCollectorAppService
	{
		private readonly IAlbumsDomainService _albumDomainService;
		private readonly IAlbumsSelectionPolicyService _selectionPolicyService;

		public AlbumsCollectorAppService(
			IAlbumsDomainService albumDomainService,
			IAlbumsSelectionPolicyService selectionPolicyService)
		{
			_albumDomainService = albumDomainService;
			_selectionPolicyService = selectionPolicyService;
		}

		public override IQueryable<AlbumCatalogDTO> Entities
		{
			get
			{
				return _albumDomainService
						.GetAllWithArtist()
						.ToList()
						.Select(x => x.ToAlbumCatalog())
						.AsQueryable();
			}
		}

		public IQueryable<AlbumCatalogDTO> GetAlbumsForReview(Guid parse, int albumsCount)
		{
			return _selectionPolicyService
					.GetAlbumsForReview(albumsCount)
					.Select(a => a.ToAlbumCatalog());
		}

		protected override AlbumCatalogDTO OnAdd(AlbumCatalogDTO album)
		{
			var entity = album.ToAlbum();
			_albumDomainService.Add(entity);
			album.Id = entity.Id;
			return album;
		}

		protected override int OnDelete(AlbumCatalogDTO entity)
		{
			return _albumDomainService.Remove(entity.Id);
		}

		protected override int OnUpdate(AlbumCatalogDTO album)
		{
			return _albumDomainService.Modify(album.ToAlbum());
		}

	}
}
