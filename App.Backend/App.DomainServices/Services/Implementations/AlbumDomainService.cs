using System.Linq;
using System.Threading;
using App.Domain.Model;
using App.DomainServices.BaseTypes;
using App.DomainServices.Services.Contracts;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.Services.Implementations
{
	public sealed class AlbumDomainService : BaseDomainService<Album>, IAlbumsDomainService
	{
	    private readonly IAlbumsRepository _albumsRepository;

	    public AlbumDomainService(IAlbumsRepository albumsRepository) 
            : base(albumsRepository)
		{
		    _albumsRepository = albumsRepository;
		}

	    public IQueryable<Album> GetAllWithArtist()
		{
			return _albumsRepository.GetAllAlbumsWithArtist();
		}
	}
}
