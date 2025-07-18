using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymFit.Data;
using GymFit.Models;
using GymFit.Dtos;
using System.Text.Json;

namespace GymFit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly GymFitContext _context;
        private readonly IWebHostEnvironment _env;

        public ClassesController(GymFitContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpPost]
        public async Task<IActionResult> AddClass([FromForm] ClassDto dto)
        {
            string? imageUrl = null;

            if (dto.Image != null)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
                var folder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
                Directory.CreateDirectory(folder);

                var path = Path.Combine(folder, fileName);
                using var stream = new FileStream(path, FileMode.Create);
                await dto.Image.CopyToAsync(stream);
                imageUrl = "/uploads/" + fileName;
            }

            var newClass = new Class
            {
                Name = dto.Name,
                Description = dto.Description,
                Duration = dto.Duration,
                MaxParticipants = dto.MaxParticipants,
                Days = dto.Days?.Split(',').Select(d => d.Trim()).ToList() ?? new List<string>(),
                Time = dto.Time,
                ImageUrl = imageUrl
            };


            _context.Classes.Add(newClass);
            await _context.SaveChangesAsync();

            return Ok(newClass);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var all = await _context.Classes.ToListAsync();
            return Ok(all);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var c = await _context.Classes.FindAsync(id);
            if (c == null) return NotFound();
            return Ok(c);
        }

        [HttpGet("client/{clientId}")]
        public async Task<IActionResult> GetClientClasses(int clientId)
        {
            var classes = await _context.ClassRegistrations
                .Where(r => r.ClientId == clientId)
                .Select(r => r.Class)
                .ToListAsync();

            return Ok(classes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(int id)
        {
            var c = await _context.Classes.FindAsync(id);
            if (c == null) return NotFound();

            _context.Classes.Remove(c);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClass(int id, [FromForm] ClassDto dto)
        {
            var existing = await _context.Classes.FindAsync(id);
            if (existing == null) return NotFound();

            if (dto.Image != null)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
                var folder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
                Directory.CreateDirectory(folder);
                var path = Path.Combine(folder, fileName);
                using var stream = new FileStream(path, FileMode.Create);
                await dto.Image.CopyToAsync(stream);
                existing.ImageUrl = "/uploads/" + fileName;
            }

          
    existing.Name = dto.Name;
    existing.Description = dto.Description;
    existing.Duration = dto.Duration;
    existing.MaxParticipants = dto.MaxParticipants;
    existing.Days = dto.Days?.Split(',').Select(d => d.Trim()).ToList() ?? new List<string>();
    existing.Time = dto.Time;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpGet("schedule")]
        public async Task<ActionResult<IEnumerable<ClassScheduleDto>>> GetSchedule()
        {
            var schedule = await _context.Classes
                .Include(c => c.Registrations)
                .Select(c => new ClassScheduleDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    Time = c.Time,
                    Duration = c.Duration,
                    MaxParticipants = c.MaxParticipants,
                    ImageUrl = c.ImageUrl,
                    Days = c.Days,
                    ParticipantsCount = c.Registrations.Count
                })
                .ToListAsync();

            return Ok(schedule);
        }
    }

    public class ClassDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Duration { get; set; }
        public int MaxParticipants { get; set; }
        public string? Days { get; set; }
        public string? Time { get; set; }
        public IFormFile? Image { get; set; }
    }
}
