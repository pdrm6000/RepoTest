using System.Data.Entity;
using App.Domain.Model;

namespace App.DBModel.DataModel
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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Artist>().ToTable("t_artists");
            modelBuilder.Entity<Artist>().HasKey(p => p.Id);

            modelBuilder.Entity<Album>().ToTable("t_albums");
            modelBuilder.Entity<Album>().HasKey(p => p.Id);

            modelBuilder.Entity<Artist>().HasMany(c => c.Albums);


            base.OnModelCreating(modelBuilder);
        }
    }
}
