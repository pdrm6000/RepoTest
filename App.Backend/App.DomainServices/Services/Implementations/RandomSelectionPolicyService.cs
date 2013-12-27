using System;
using System.Linq;
using App.Domain.Model;
using App.DomainServices.Services.Contracts;

namespace App.DomainServices.Services.Implementations
{
	public class RandomSelectionPolicyService : ISelectionPolicyService
	{
		private readonly IAlbumsDomainService _albumsDomainService;

		public RandomSelectionPolicyService(IAlbumsDomainService albumsDomainService)
		{
			_albumsDomainService = albumsDomainService;
		}

		public IQueryable<Album> GetAlbumsForReview(int albumsCount)
		{
			return _albumsDomainService
					.GetAllWithArtist()
					.ToList()
					.OrderBy(a => Guid.NewGuid())
					.Take(albumsCount)
					.AsQueryable();
		}
	}
}