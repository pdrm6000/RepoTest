using System.Collections.Generic;
using System.Linq;
using App.Domain.Model;

namespace App.Repositories.Repositories.Contracts
{
	public interface IAlbumsRepository : IBaseRepository<Album>
	{
		IQueryable<Album> GetAllAlbumsWithArtist();
	}
}
