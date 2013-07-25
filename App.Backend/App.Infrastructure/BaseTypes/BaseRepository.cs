using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using App.DBModel.DataModel;
using App.Domain.RepositoryContracts;
using System.Linq.Expressions;
using App.Domain.ValueObjects.EntityContract;


namespace App.Repositories.BaseTypes
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class, IEntity
    {
        public DbSet<TEntity> DbSet { get; set; }
        public ModelContext ModelContext { get; set; }

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
            var original = DbSet.Find(item.Id);
            if (original != null)
            {
                ModelContext.Entry(original).CurrentValues.SetValues(item);
                return ModelContext.SaveChanges();
            }
            return 0;
        }

        public int Remove(TEntity item)
        {
            DbSet.Remove(item);
            return ModelContext.SaveChanges();
        }

        public int Remove(int id)
        {
            var item = DbSet.Find(id);
            var result = 0;
            if (item != null)
            {
                DbSet.Remove(item);
                result = ModelContext.SaveChanges();
            }
            return result;
        }

        public TEntity GetById(int id)
        {
            return DbSet.FirstOrDefault(entity => entity.Id == id);
        }

        public IQueryable<TEntity> GetAll()
        {
            return DbSet.AsQueryable();
        }

        public IEnumerable<TEntity> GetByCondition(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.Where(predicate);
        }

    }
}
