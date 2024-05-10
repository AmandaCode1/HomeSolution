using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using homesolutionBack.Models;

namespace homesolutionBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiciosController : ControllerBase
    {
        //declaramos objeto de nuestra base de batos para crud
        public readonly HomesolutionbdContext _dbcontext;

        //constructor
        public ServiciosController(HomesolutionbdContext _context)
        {
            _dbcontext = _context;
        }

        //Asincrono para que sea mas eficiente, que no bloquee el proceso principal mientras espera respuesta de la bd

        [HttpGet("VerLista")]
        public async Task<IActionResult> Servicios()
        {
            //objeto de lista de servicios
            List<Servicios> servicios = new List<Servicios>();

            try
            {
                servicios = await _dbcontext.Servicios.ToListAsync();
                return StatusCode(StatusCodes.Status200OK, (servicios));

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener la lista de servicios: {e.Message}");
            }
        }

        
    }
}
