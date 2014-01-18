using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using App.Domain.EntityContract;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.BaseTypes
{
	public abstract class BaseDomainService<T> : IDomainService<T> where T : IEntity
	{
	    private IBaseRepository<T> _repository;

	    public BaseDomainService(IBaseRepository<T> repository)
	    {
	        _repository = repository;
	    }

		public int Add(T item)
		{
            return _repository.Add(item);
		}

		public int Modify(T item)
		{
            return _repository.Modify(item);
		}

		public int Remove(T item)
		{
            return _repository.Remove(item);
		}

		public IQueryable<T> GetAll()
		{
            return _repository.GetAll();
		}

		public int Remove(int id)
		{
            return _repository.Remove(id);
		}

		public T GetById(int id)
		{
            return _repository.GetById(id);
		}

		public IEnumerable<T> GetByCondition(Expression<Func<T, bool>> predicate)
		{
            return _repository.GetByCondition(predicate);
		}
	}
}
