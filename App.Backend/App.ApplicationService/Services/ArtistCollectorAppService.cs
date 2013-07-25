using System;
using System.Collections.Generic;
using System.Linq;
using App.Domain.AppServiceContracts;
using App.Domain.Extensions;
using App.Domain.RepositoryContracts;
using App.Domain.ValueObjects.DTO;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace App.ApplicationService.Services
{
    public abstract class BreezeAppService<T> : ContextProvider, IBreezeApplicationService<T>
    {
        public abstract IQueryable<T> Entities { get; }
        protected abstract void OnAdd(T entity);
        protected abstract void OnDelete(T entity);
        protected abstract void OnUpdate(T entity);

        private List<KeyMapping> Save(IEnumerable<EntityInfoTyped<T>> entitiesToSave)
        {
            foreach (var entityInfoTyped in entitiesToSave)
            {
                switch (entityInfoTyped.ChangeType)
                {
                    case EntityState.Added:
                        OnAdd(entityInfoTyped.Entity);
                        break;
                    case EntityState.Deleted:
                        OnDelete(entityInfoTyped.Entity);
                        break;
                    case EntityState.Modified:
                        OnUpdate(entityInfoTyped.Entity);
                        break;
                }
            }
            //TODO track changes
            return null;
        }

        protected override string BuildJsonMetadata()
        {
            //No metadata provided from server
            return null;
        }

        protected override List<KeyMapping> SaveChangesCore(Dictionary<Type, List<EntityInfo>> saveMap)
        {
            if (saveMap.Any())
            {
                return Save(saveMap
                            .First()
                            .Value
                            .Select(e => new EntityInfoTyped<T>(e)));
            }
            return null;
        }
    }

    public interface IBreezeApplicationService<T>
    {
        IQueryable<T> Entities { get; }
        SaveResult SaveChanges(JObject saveBundle);
    }

    public class EntityInfoTyped<T>
    {
        private readonly EntityInfo _entityInfo;

        public EntityInfoTyped(EntityInfo entityInfo)
        {
            _entityInfo = entityInfo;
        }

        public T Entity { get { return (T)_entityInfo.Entity; } }
        public EntityState ChangeType { get { return _entityInfo.EntityState; } }
    }

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

        public IEnumerable<ArtistWithAlbumsDTO> GetAllWithAlbums()
        {
            var artist = _artistsRepository.GetAllWithAlbums();
            return artist.Select(x => x.ToArtistWithAlbumsDTO());
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