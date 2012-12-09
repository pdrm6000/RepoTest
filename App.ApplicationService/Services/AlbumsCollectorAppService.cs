using App.Domain.AppServiceContracts;
using App.Domain.DomainServices.Contracts;
using App.Domain.RepositoryContracts;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.ApplicationService.Services
{
    public class AlbumsCollectorAppService : IAlbumsCollectorAppService
    {
        private readonly IAlbumsRepository _albumsRepository;
        private readonly IArtistsRepository _artistsRepository;
        private readonly IAlbumDTOGeneratorService _albumDTOGeneratorService;
        private readonly IRandomAlbumSelector _randomAlbumSelector;

        public AlbumsCollectorAppService(IAlbumsRepository albumRepository, IArtistsRepository artistsRepository, IAlbumDTOGeneratorService albumDTOGeneratorService, IRandomAlbumSelector randomAlbumSelector)
        {
            _albumsRepository = albumRepository;
            _artistsRepository = artistsRepository;
            _albumDTOGeneratorService = albumDTOGeneratorService;
            _randomAlbumSelector = randomAlbumSelector;
        }

        public Album GetAlbumById(int id)
        {
            return _albumsRepository.GetById(id);
        }

        public int AddAlbum(Album album)
        {
            return _albumsRepository.Add(album);
        }

        public AlbumDTO GetAlbumRamdon()
        {
            var result = new AlbumDTO();
            var albumId = _randomAlbumSelector.GetAlbumId();
            var album = _albumsRepository.GetById(albumId);
            if (album != null)
            {
                var artist = _artistsRepository.GetById(album.ArtistId);
                result = _albumDTOGeneratorService.GetAlbumDTO(album, artist);
            }
            return result;
        }
    }
}
