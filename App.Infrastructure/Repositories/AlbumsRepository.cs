using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using App.DBModel.DataModel;
using App.Domain.RepositoryContracts;
using App.Domain.Model;
using App.Repositories.BaseTypes;
using System.Data.Entity;

namespace App.Repositories.Repositories
{
    public class AlbumsRepository : BaseRepository<Album>, IAlbumsRepository, IDisposable
    {

        public AlbumsRepository()
            : base(null)
        {
            ModelContext = new ModelContext("DefaultConnection");
            DbSet = ModelContext.AlbumsSet;
        }

        public void Dispose()
        {
            ModelContext.Dispose();
            ModelContext = null;
        }

        public IEnumerable<int> GetAlbumsIds()
        {
            return ModelContext
                .AlbumsSet
                .Select(a => a.Id)
                .ToList();
        }
    }
}
