using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using App.Domain.EntityContract;

namespace App.DomainServices.BaseTypes
{
	public interface IDomainService<T> where T : IEntity
	{
		int Add(T item);
		int Modify(T item);
		int Remove(T item);
		int Remove(int id);
		IQueryable<T> GetAll();
		T GetById(int id);
		IEnumerable<T> GetByCondition(Expression<Func<T, bool>> predicate);
	}
}