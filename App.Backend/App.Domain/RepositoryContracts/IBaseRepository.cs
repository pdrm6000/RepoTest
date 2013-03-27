using System;
using System.Collections.Generic;
using System.Linq.Expressions;
namespace App.Domain.RepositoryContracts
{
    public interface IBaseRepository<TEntity>
     where TEntity : class
    {
        int Add(TEntity item);
        int Modify(TEntity item);
        int Remove(TEntity item);
        int Remove(int id);
        TEntity GetById(int id);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetByCondition(Expression<Func<TEntity, bool>> predicate);
    }
}
