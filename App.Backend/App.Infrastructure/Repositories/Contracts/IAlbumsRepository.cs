using System.Collections.Generic;
using App.Domain.Model;

namespace App.Repositories.Repositories.Contracts
{
	public interface IAlbumsRepository : IBaseRepository<Album>
	{
		IEnumerable<int> GetAlbumsIds();
	}
}
