using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using App.Domain.Model;
using App.Repositories.BaseTypes;
using App.Repositories.DataModel;
using App.Repositories.Repositories.Contracts;

namespace App.Repositories.Repositories.Implementations
{
	public class ArtistRepository : BaseRepository<Artist>, IArtistsRepository, IDisposable
	{
		public ArtistRepository()
			: base(null)
		{
			ModelContext = new ModelContext("DefaultConnection");
			DbSet = ModelContext.ArtistsSet;
		}

		public IEnumerable<Artist> GetAllWithAlbums()
		{
			return DbSet.Include(p => p.Albums).AsEnumerable();
		}

		public void Dispose()
			{
			ModelContext.Dispose();
			ModelContext = null;
		}
	}
}
