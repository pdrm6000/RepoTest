using System.Collections.Generic;
using System.Linq;
using App.ApplicationService.DTO;
using Breeze.WebApi;

namespace App.ApplicationService.Services.BaseServices
{
    public abstract class BreezeAppService<T> : ContextProvider where T : IDataTransferObject
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
                        var tempId = entityInfoTyped.Entity.Id;
                        var entityAdded  = OnAdd(entityInfoTyped.Entity);
                        result.Add(new KeyMapping { EntityTypeName = typeof(T).FullName, RealValue = entityAdded.Id, TempValue = tempId });
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

        protected override void SaveChangesCore(SaveWorkState saveWorkState)
        {
            if (saveWorkState.SaveMap.Any())
            {
                saveWorkState.KeyMappings = Save(saveWorkState.SaveMap
                                                .First()
                                                .Value
                                                .Select(e => new EntityInfoTyped<T>(e)));
            }
        }

        protected override void CloseDbConnection()
        {
             //There isn't db context in this layer
        }

        public override System.Data.IDbConnection GetDbConnection()
        {
            //There isn't db context in this layer
            return null;
        }

        protected override void OpenDbConnection()
        {
            //There isn't db context in this layer
        }
    }
}