using System.Data.Entity;
using App.Domain.Model;

namespace App.Repositories.DataModel
{

	public class ModelContext : DbContext
	{
		public ModelContext(string connString)
		{
			//disable database autogeneration
			Database.SetInitializer<ModelContext>(null);
		}

		public DbSet<Album> AlbumsSet { get; set; }
		public DbSet<Artist> ArtistsSet { get; set; }
        public DbSet<Comment> CommentsSet { get; set; }
        public DbSet<Rate> RatesSet { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
            //Model definition
			modelBuilder.Entity<Artist>().ToTable("t_artists");
			modelBuilder.Entity<Artist>().HasKey(p => p.Id);

			modelBuilder.Entity<Album>().ToTable("t_albums");
			modelBuilder.Entity<Album>().HasKey(p => p.Id);

            modelBuilder.Entity<Comment>().ToTable("t_comments");
            modelBuilder.Entity<Comment>().HasKey(p => p.Id);

            modelBuilder.Entity<Rate>().ToTable("t_rates");
            modelBuilder.Entity<Rate>().HasKey(p => p.Id);
            
            //Relationships
            modelBuilder.Entity<Artist>().HasMany(c => c.Albums);
            modelBuilder.Entity<Album>().HasRequired(c => c.Artist);
            modelBuilder.Entity<Comment>().HasRequired(c => c.Album);
            modelBuilder.Entity<Rate>().HasRequired(c => c.Album);


			base.OnModelCreating(modelBuilder);
		}
	}
}
