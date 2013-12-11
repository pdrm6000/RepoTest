using System.Collections.Generic;
using App.Domain.Model;
using App.DomainServices.BaseTypes;

namespace App.DomainServices.Services.Contracts
{
	public interface IArtistsDomainService : IDomainService<Artist>
	{
		IEnumerable<Artist> GetAllWithAlbums();
	}
}