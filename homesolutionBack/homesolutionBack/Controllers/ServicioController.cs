using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using homesolutionBack.Models;

namespace homesolutionBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicioController : ControllerBase
    {
        //declaramos objeto de nuestra base de batos para crud
        public readonly HomesolutionbdContext _dbcontext;

        //constructor
        public ServicioController(HomesolutionbdContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("Servicios")]
        public IActionResult Servicios()
        {
            //objeto de lista de servicios
            List<Servicios> servicios = new List<Servicios>();

            try
            {
                servicios = _dbcontext.Servicios.ToList();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = servicios });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ERROR "+ex.Message, response = servicios });
            }
        }
    }
}
