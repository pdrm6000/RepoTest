using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using App.Domain.Model;
using App.Repositories.BaseTypes;
using App.Domain.RepositoryContracts;
using App.DBModel.DataModel;

namespace App.Repositories.Repositories
{
    public class ArtistRepository : BaseRepository<Artist>, IArtistsRepository, IDisposable
    {
        public ArtistRepository()
            : base(null)
        {
            ModelContext = new ModelContext("DefaultConnection");
            DbSet = ModelContext.ArtistsSet;
        }

        public void Dispose()
        {
            ModelContext.Dispose();
            ModelContext = null;
        }
    }
}
