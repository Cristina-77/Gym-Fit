using System.ComponentModel.DataAnnotations;
namespace GymFit.Models;

public class Client{
    public int Id { get; set; }
    public string? LastName { get; set; }
    public string? FirstName { get; set; }
    public string? Password { get; set; } 
    public string? Email { get; set; }

    public ICollection<ClassRegistration> Registrations { get; set; } = new List<ClassRegistration>();
}