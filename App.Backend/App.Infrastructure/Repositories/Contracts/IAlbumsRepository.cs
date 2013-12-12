using System.Collections.Generic;
using System.Linq;
using App.Domain.Model;

namespace App.Repositories.Repositories.Contracts
{
	public interface IAlbumsRepository : IBaseRepository<Album>
	{
		IEnumerable<int> GetAlbumsIds();
		IQueryable<Album> GetAllAlbumsWithArtist();
	}
}
