using Microsoft.EntityFrameworkCore;
using WebAPISample.Models;

namespace WebAPISample.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            :base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Movie>()
             .HasData(
                new Movie { MovieId = 1, Title = "The Departed", Genre = "Drama", Director = "Martin Scorsese" },
                new Movie { MovieId = 2, Title = "The Dark Knight", Genre = "Drama", Director = "Christopher Nolan" },
                new Movie { MovieId = 3, Title = "Inception", Genre = "Drama", Director = "Christopher Nolan" });

        }

        public DbSet<Movie> Movies { get; set; }
    }
}
