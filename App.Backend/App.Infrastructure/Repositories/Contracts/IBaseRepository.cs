using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using App.Domain.EntityContract;

namespace App.Repositories.Repositories.Contracts
{
	public interface IBaseRepository<TEntity> where TEntity : IEntity
	{
		int Add(TEntity item);
		int Modify(TEntity item);
		int Remove(TEntity item);
		IQueryable<TEntity> GetAll();
		int Remove(int id);
		TEntity GetById(int id);
		IEnumerable<TEntity> GetByCondition(Expression<Func<TEntity, bool>> predicate);
	}
}
