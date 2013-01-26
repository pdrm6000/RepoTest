using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using App.Domain.AppServiceContracts;
using App.Domain.Extensions;
using App.Domain.RepositoryContracts;
using App.Domain.ValueObjects.DTO;

namespace App.ApplicationService.Services
{
    public class ArtistCollectorAppService : IArtistCollectorAppService
    {
        private readonly IArtistsRepository _artistsRepository;

        public ArtistCollectorAppService(IArtistsRepository artistsRepository)
        {
            _artistsRepository = artistsRepository;
        }

        public IEnumerable<ArtistDTO> GetAll()
        {
            var artist = _artistsRepository.GetAll();
            return artist.Select(x => x.ToArtistDTO());
        }

        public IEnumerable<ArtistDTO> GetAllWithAlbums()
        {
            var artist = _artistsRepository.GetAllWithAlbums();
            return artist.Select(x => x.ToArtistDTO());
        }

        public int UpdateArtist(ArtistDTO value)
        {
            return _artistsRepository.Modify(value.ToArtist());
        }

        public ArtistDTO AddArtist(ArtistDTO value)
        {
            var entity = value.ToArtist();
            _artistsRepository.Add(entity);
            return entity.ToArtistDTO();
        }
    }
}