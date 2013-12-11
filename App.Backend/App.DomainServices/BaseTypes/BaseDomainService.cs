using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using App.Domain.EntityContract;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.BaseTypes
{
	public class BaseDomainService<T> : IDomainService<T> where T : IEntity
	{
		protected virtual IBaseRepository<T> Repository { get; set; }

		public int Add(T item)
		{
			return Repository.Add(item);
		}

		public int Modify(T item)
		{
			return Repository.Modify(item);
		}

		public int Remove(T item)
		{
			return Repository.Remove(item);
		}

		public IQueryable<T> GetAll()
		{
			return Repository.GetAll();
		}

		public int Remove(int id)
		{
			return Repository.Remove(id);
		}

		public T GetById(int id)
		{
			return Repository.GetById(id);
		}

		public IEnumerable<T> GetByCondition(Expression<Func<T, bool>> predicate)
		{
			return Repository.GetByCondition(predicate);
		}
	}
}
