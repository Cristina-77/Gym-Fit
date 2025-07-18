using System.ComponentModel.DataAnnotations;
namespace GymFit.Models;

public class ClassRegistration
{
    public int ClassId { get; set; } 
    public int ClientId { get; set; } 
    public Class? Class { get; set; }
    public Client? Client { get; set; }
}