using System.Linq;

namespace App.Domain.RepositoryContracts
{
    public interface IEntityTracker<TEntity>
        where TEntity : class
    {
        int Add(TEntity item);
        int Modify(TEntity item);
        int Remove(TEntity item);
        IQueryable<TEntity> GetAll();
    }
}