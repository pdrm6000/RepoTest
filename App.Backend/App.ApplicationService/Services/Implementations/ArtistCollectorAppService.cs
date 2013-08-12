using System.Collections.Generic;
using System.Linq;
using App.ApplicationService.Services.BaseServices;
using App.Domain.Extensions;
using App.Domain.RepositoryContracts;
using App.Domain.ValueObjects.DTO;
using App.ApplicationService.Services.AppServiceContracts;

namespace App.ApplicationService.Services.Implementations
{
    public class ArtistCollectorAppService : BreezeAppService<ArtistDTO>, IArtistCollectorAppService
    {
        private readonly IArtistsRepository _artistsRepository;

        public ArtistCollectorAppService(IArtistsRepository artistsRepository)
        {
            _artistsRepository = artistsRepository;
        }

        public IEnumerable<ArtistWithAlbumsDTO> GetAllWithAlbums()
        {
            var artist = _artistsRepository.GetAllWithAlbums();
            return artist.Select(x => x.ToArtistWithAlbumsDTO());
        }

        public override IQueryable<ArtistDTO> Entities
        {
            get { return _artistsRepository.GetAll().Select(x => x.ToArtistDTO()); }
        }

        protected override ArtistDTO OnAdd(ArtistDTO value)
        {
            var entity = value.ToArtist();
            _artistsRepository.Add(entity);
            return entity.ToArtistDTO();
        }

        protected override int OnDelete(ArtistDTO entity)
        {
            throw new System.NotImplementedException();
        }

        protected override int OnUpdate(ArtistDTO entity)
        {
            return _artistsRepository.Modify(entity.ToArtist());
        }
    }
}