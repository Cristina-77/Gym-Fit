using System.ComponentModel.DataAnnotations;
namespace GymFit.Models;

public class Class
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Duration { get; set; }
    public int MaxParticipants { get; set; }
    public List<string> Days { get; set; } = new List<string>();
    public string? Time { get; set; }
    public string? ImageUrl { get; set; }

    public ICollection<Trainer> Trainers { get; set; } = new List<Trainer>();
    public ICollection<ClassRegistration> Registrations { get; set; } = new List<ClassRegistration>();
}
