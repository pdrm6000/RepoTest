using System.Collections.Generic;
using App.Domain.Model;
using App.DomainServices.BaseTypes;
using App.DomainServices.Services.Contracts;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.Services.Implementations
{
	public class ArtistsDomainService : BaseDomainService<Artist>, IArtistsDomainService
	{
		public ArtistsDomainService(IArtistsRepository artistsRepository)
		{
			Repository = artistsRepository;
		}

		public IEnumerable<Artist> GetAllWithAlbums()
		{
			return ((IArtistsRepository) Repository).GetAllWithAlbums();
		}
	}
}
