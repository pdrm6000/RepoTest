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

		public IQueryable<Album> GetAllAlbumsWithArtist()
		{
			return DbSet.Include(a => a.Artist).AsQueryable();
		}
	}
}
