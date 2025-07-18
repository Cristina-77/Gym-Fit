using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymFit.Data;
using GymFit.Models;

namespace GymFit.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class TrainersController : ControllerBase
{
    private readonly GymFitContext _context;
    private readonly IWebHostEnvironment _env;

    public TrainersController(GymFitContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Trainer>>> GetTrainers()
    {
        return await _context.Trainers
            .Include(t => t.Class)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Trainer>> AddTrainer([FromForm] TrainerDto dto)
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

        var trainer = new Trainer
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Description = dto.Description,
            ClassId = dto.ClassId,
            ImageUrl = imageUrl
        };

        _context.Trainers.Add(trainer);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTrainer), new { id = trainer.Id }, trainer);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Trainer>> GetTrainer(int id)
    {
        var trainer = await _context.Trainers.Include(t => t.Class).FirstOrDefaultAsync(t => t.Id == id);
        if (trainer == null) return NotFound();
        return trainer;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTrainer(int id, [FromForm] TrainerDto dto)
    {
        var trainer = await _context.Trainers.FindAsync(id);
        if (trainer == null) return NotFound();

        if (dto.Image != null)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
            var folder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
            Directory.CreateDirectory(folder);
            var path = Path.Combine(folder, fileName);
            using var stream = new FileStream(path, FileMode.Create);
            await dto.Image.CopyToAsync(stream);
            trainer.ImageUrl = "/uploads/" + fileName;
        }

        trainer.FirstName = dto.FirstName;
        trainer.LastName = dto.LastName;
        trainer.Description = dto.Description;
        trainer.ClassId = dto.ClassId;

        await _context.SaveChangesAsync();

        return Ok(trainer);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTrainer(int id)
    {
        var trainer = await _context.Trainers.FindAsync(id);
        if (trainer == null) return NotFound();

        _context.Trainers.Remove(trainer);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

    public class TrainerDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Description { get; set; }
        public int ClassId { get; set; }
        public IFormFile? Image { get; set; }
    }
}
