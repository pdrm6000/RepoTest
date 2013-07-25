using System;
using System.Collections.Generic;
using System.Linq.Expressions;
namespace App.Domain.RepositoryContracts
{
    public interface IBaseRepository<TEntity> : IEntityTracker<TEntity>
        where TEntity : class
    {
        int Remove(int id);
        TEntity GetById(int id);
        IEnumerable<TEntity> GetByCondition(Expression<Func<TEntity, bool>> predicate);
    }
}
