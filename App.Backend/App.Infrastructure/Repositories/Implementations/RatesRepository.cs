using System;
using System.Data.Entity;
using App.Domain.Model;
using App.Repositories.BaseTypes;
using App.Repositories.DataModel;

namespace App.Repositories.Repositories.Implementations
{
    public class RatesRepository : BaseRepository<Rate>, IDisposable
    {
        public RatesRepository(DbSet<Rate> context) : base(context)
        {
            ModelContext = new ModelContext("DefaultConnection");
            DbSet = ModelContext.RatesSet;
        }

        public void Dispose()
        {
            ModelContext.Dispose();
            ModelContext = null;
        }
    }
}