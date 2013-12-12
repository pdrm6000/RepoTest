using System.Linq;
using App.Domain.Model;
using App.DomainServices.BaseTypes;

namespace App.DomainServices.Services.Contracts
{
	public interface IAlbumsDomainService : IDomainService<Album>
	{
		IQueryable<Album> GetAllWithArtist();
	}
}
