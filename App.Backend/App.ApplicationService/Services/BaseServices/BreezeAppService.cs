using System;
using System.Collections.Generic;
using System.Linq;
using Breeze.WebApi;

namespace App.ApplicationService.Services.BaseServices
{
    public abstract class BreezeAppService<T> : ContextProvider
    {
        public abstract IQueryable<T> Entities { get; }
        protected abstract T OnAdd(T entity);
        protected abstract int OnDelete(T entity);
        protected abstract int OnUpdate(T entity);

        private List<KeyMapping> Save(IEnumerable<EntityInfoTyped<T>> entitiesToSave)
        {
            var result = new List<KeyMapping>();
            foreach (var entityInfoTyped in entitiesToSave)
            {
                switch (entityInfoTyped.ChangeType)
                {
                    case EntityState.Added:
                        OnAdd(entityInfoTyped.Entity);
                        result.Add(new KeyMapping() { EntityTypeName = typeof(T).FullName, RealValue = entityInfoTyped.Entity, TempValue = entityInfoTyped.Entity });
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
            return result;
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
}