using Breeze.WebApi;

namespace App.ApplicationService.Services.BaseServices
{
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
}