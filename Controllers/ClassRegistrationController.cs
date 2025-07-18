using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymFit.Data;
using GymFit.Models;

namespace GymFit.Controllers
{
[Route("api/[controller]")]
[ApiController]
public class ClassRegistrationController : ControllerBase
{
    private readonly GymFitContext _context;
    public ClassRegistrationController(GymFitContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] ClassRegistration reg)
    {
        _context.ClassRegistrations.Add(reg);
        await _context.SaveChangesAsync();
        return Ok(reg);
    }

    [HttpDelete("{clientId}/{classId}")]
    public async Task<IActionResult> Unregister(int clientId, int classId)
    {
        var reg = await _context.ClassRegistrations
            .FirstOrDefaultAsync(r => r.ClientId == clientId && r.ClassId == classId);

        if (reg == null) return NotFound();

        _context.ClassRegistrations.Remove(reg);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("client/{clientId}/classes")]
    public async Task<IActionResult> GetClientClasses(int clientId)
    {
        var classes = await _context.ClassRegistrations
            .Where(r => r.ClientId == clientId)
            .Select(r => r.Class)
            .ToListAsync();

        return Ok(classes);
    }
}

}
