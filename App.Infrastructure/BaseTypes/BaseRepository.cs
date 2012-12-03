using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using App.DataModel.DataModel;
using App.Domain.RepositoryContracts;
using System.Linq.Expressions;
using App.Domain.ValueObjects.EntityContract;


namespace App.Repositories.BaseTypes
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class, IEntity
    {
        protected DbSet<TEntity> DbSet { get; set; }
        protected ModelContext ModelContext { get; set; }

        public BaseRepository(DbSet<TEntity> context)
        {
            DbSet = context;
        }

        public int Add(TEntity item)
        {
            DbSet.Add(item);
            return ModelContext.SaveChanges();
        }

        public int Modify(TEntity item)
        {
            DbSet.Attach(item);
            return ModelContext.SaveChanges();
        }

        public int Remove(TEntity item)
        {
            DbSet.Remove(item);
            return ModelContext.SaveChanges();
        }

        public TEntity GetById(int id)
        {
            return DbSet.FirstOrDefault(entity => entity.Id == id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return DbSet.AsEnumerable();
        }

        public IEnumerable<TEntity> GetByCondition(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.Where(predicate);
        }

    }
}
