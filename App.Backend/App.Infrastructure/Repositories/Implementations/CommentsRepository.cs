using System;
using App.Domain.Model;
using App.Repositories.BaseTypes;
using App.Repositories.DataModel;

namespace App.Repositories.Repositories.Implementations
{
    public class CommentsRepository : BaseRepository<Comment>, IDisposable
    {
        public CommentsRepository() : base(null)
        {
            ModelContext = new ModelContext("DefaultConnection");
            DbSet = ModelContext.CommentsSet;
        }

        public void Dispose()
        {
            ModelContext.Dispose();
            ModelContext = null;
        }
    }
}