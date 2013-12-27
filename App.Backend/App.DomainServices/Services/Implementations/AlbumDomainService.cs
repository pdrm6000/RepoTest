using System.Linq;
using App.Domain.Model;
using App.DomainServices.BaseTypes;
using App.DomainServices.Services.Contracts;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.Services.Implementations
{
	public sealed class AlbumDomainService : BaseDomainService<Album>, IAlbumsDomainService
	{
		public AlbumDomainService(IAlbumsRepository albumsRepository)
		{
			Repository = albumsRepository;
		}

		public IQueryable<Album> GetAllWithArtist()
		{
			return (Repository as IAlbumsRepository).GetAllAlbumsWithArtist();
		}
	}
}
