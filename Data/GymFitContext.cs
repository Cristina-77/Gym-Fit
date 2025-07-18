using Microsoft.EntityFrameworkCore;
using GymFit.Models;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.ChangeTracking;


namespace GymFit.Data
{
    public class GymFitContext : DbContext
{
    public GymFitContext(DbContextOptions<GymFitContext> options) : base(options) {}

    public DbSet<Class> Classes { get; set; }
    public DbSet<Trainer> Trainers { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<ClassRegistration> ClassRegistrations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Trainer>()
            .HasOne(t => t.Class)
            .WithMany(c => c.Trainers)
            .HasForeignKey(t => t.ClassId)
            .OnDelete(DeleteBehavior.Cascade);
             // Many-to-many between Clients and Classes
            modelBuilder.Entity<ClassRegistration>()
                .HasKey(cr => new { cr.ClientId, cr.ClassId });

            modelBuilder.Entity<ClassRegistration>()
                .HasOne(cr => cr.Client)
                .WithMany(c => c.Registrations)
                .HasForeignKey(cr => cr.ClientId);

            modelBuilder.Entity<ClassRegistration>()
                .HasOne(cr => cr.Class)
                .WithMany(c => c.Registrations)
                .HasForeignKey(cr => cr.ClassId);

            
             modelBuilder.Entity<Class>()
        .Property(c => c.Days)
        .HasConversion(
            v => string.Join(',', v),          
            v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() 
        )
        .Metadata.SetValueComparer(
            new ValueComparer<List<string>>(
                (c1, c2) => c1.SequenceEqual(c2),
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                c => c.ToList()
            )
        );

    base.OnModelCreating(modelBuilder);
    }
}

}
