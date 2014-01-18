using System.Collections.Generic;
using App.Domain.Model;
using App.DomainServices.BaseTypes;
using App.DomainServices.Services.Contracts;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.Services.Implementations
{
	public class ArtistsDomainService : BaseDomainService<Artist>, IArtistsDomainService
	{
	    private readonly IArtistsRepository _artistsRepository;

	    public ArtistsDomainService(IArtistsRepository artistsRepository) 
            : base(artistsRepository)
		{
		    _artistsRepository = artistsRepository;
		}

	    public IEnumerable<Artist> GetAllWithAlbums()
		{
			return _artistsRepository.GetAllWithAlbums();
		}
	}
}
