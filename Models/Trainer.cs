using System.ComponentModel.DataAnnotations;
namespace GymFit.Models;

public class Trainer
{
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }

    public int ClassId { get; set; }
    public Class? Class { get; set; }
}
