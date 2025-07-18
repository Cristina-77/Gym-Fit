using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymFit.Data;
using GymFit.Models;

namespace GymFit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly GymFitContext _context;

        private const string AdminEmail = "admin@gymfit.com";
        private const string AdminPassword = "admin123";

        public LoginController(GymFitContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            if (login.Email == AdminEmail && login.Password == AdminPassword)
            {
                return Ok(new
                {
                    Email = AdminEmail,
                    FirstName = "Admin",
                    LastName = "",
                    IsAdmin = true
                });
            }

            var client = await _context.Clients.FirstOrDefaultAsync(c =>
                c.Email == login.Email && c.Password == login.Password);

            if (client == null)
                return Unauthorized("Invalid credentials");

            return Ok(new
            {
                Id = client.Id,
                FirstName = client.FirstName,
                LastName = client.LastName,
                Email = client.Email,
                IsAdmin = false
            });
        }
    }

    public class LoginDto
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}

