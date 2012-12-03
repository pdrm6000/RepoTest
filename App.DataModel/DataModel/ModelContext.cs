using System.Data.Entity;
using App.Domain.Model;

namespace App.DataModel.DataModel
{

    public class ModelContext : DbContext
    {
        public ModelContext(string connString)
        {
            Database.SetInitializer<ModelContext>(null);
        }

        public DbSet<Album> AlbumsSet { get; set; }
        public DbSet<Artist> ArtistsSet { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Album>().ToTable("t_albums");
            modelBuilder.Entity<Album>().Property(p => p.Id).HasColumnName("id");
            modelBuilder.Entity<Album>().Property(p => p.Name).HasColumnName("name");
            modelBuilder.Entity<Album>().Property(p => p.ArtistId).HasColumnName("artistid");
            modelBuilder.Entity<Album>().Property(p => p.CoverUrl).HasColumnName("coverurl");
            modelBuilder.Entity<Album>().Property(p => p.Year).HasColumnName("year");

            modelBuilder.Entity<Artist>().ToTable("t_artists");

            base.OnModelCreating(modelBuilder);
        }
    }
}
