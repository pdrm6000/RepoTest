using System.Collections.Generic;
using App.Domain.Model;

namespace App.Repositories.Repositories.Contracts
{
	public interface IArtistsRepository : IBaseRepository<Artist>
	{
		IEnumerable<Artist> GetAllWithAlbums();
	}
}
