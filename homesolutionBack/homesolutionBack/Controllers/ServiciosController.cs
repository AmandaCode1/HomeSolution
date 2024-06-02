using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using homesolutionBack.Models;
using homesolutionBack.Models.Dto;

namespace homesolutionBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiciosController : ControllerBase
    {
        //declaramos objeto de nuestra base de batos para crud
        public readonly FreedbHomesolutiondbContext _dbcontext;

        //constructor
        public ServiciosController(FreedbHomesolutiondbContext _context)
        {
            _dbcontext = _context;
        }

        //Asincrono para que sea mas eficiente, que no bloquee el proceso principal mientras espera respuesta de la bd

        [HttpGet("VerLista")]
        public async Task<IActionResult> Servicios()
        {
            //objeto de lista de servicios
            List<Servicio> servicios = new List<Servicio>();

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

        [HttpGet("VerServicio/{idServicio}")]
        public async Task<IActionResult> VerServicio(int idServicio)
        {
            try
            {
                var servicio = await _dbcontext.Servicios
                .Where(s => s.ServicioId == idServicio)
                .Select(s => new
                {
                    s.ServicioId,
                    s.DescripcionServicio,
                    s.Precio,
                    s.Duracion,
                    s.CategoriaServicio
                })
                .FirstOrDefaultAsync();

                if (servicio == null)
                {
                    return NotFound($"Servicio con ID {idServicio} no encontrado");
                }

                return StatusCode(StatusCodes.Status200OK, servicio);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener el servicio: {e.Message}");
            }
        }

        [HttpPost("CrearServicio")]
        public async Task<IActionResult> CrearServicio([FromBody] CrearServicioDto crearServicioDto)
        {
            try
            {
                var categoriasValidas = new[] { "electricidad", "fontaneria", "climatizacion", "pladur" };
                if (!categoriasValidas.Contains(crearServicioDto.CategoriaServicio.ToLower()))
                {
                    return BadRequest("La categoria no existe, debe ser electricidad, fontaneria, climatizacion o pladur");
                }

                var servicio = new Servicio
                {
                    DescripcionServicio = crearServicioDto.DescripcionServicio,
                    Precio = crearServicioDto.Precio,
                    Duracion = crearServicioDto.Duracion,
                    CategoriaServicio = crearServicioDto.CategoriaServicio
                };

                _dbcontext.Servicios.Add(servicio);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status201Created, servicio);

            } catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al crear el servicio: {e.Message}");
            }
            
        }
    

        [HttpPut("AdminEditarServicio/{idServicio}")]
        public async Task<IActionResult> AdminEditarServicio(int idServicio, [FromBody] AdminEditarServicioDto adminEditarServicioDto)
        {
            try
            {
                var servicio = await _dbcontext.Servicios.FindAsync(idServicio);

                if (servicio == null)
                {
                    return NotFound($"Servicio con ID {idServicio} no encontrado");

                }

                //actualizar bd con los valores del dto, si estan vacios se deja el valor anterior
                if (!string.IsNullOrEmpty(adminEditarServicioDto.DescripcionServicio))
                {
                    servicio.DescripcionServicio = adminEditarServicioDto.DescripcionServicio;
                }
                if (adminEditarServicioDto.Precio.HasValue)
                {
                    servicio.Precio = adminEditarServicioDto.Precio.Value;
                }
                if (adminEditarServicioDto.Duracion.HasValue)
                {
                    servicio.Duracion = adminEditarServicioDto.Duracion.Value;
                }
                if (!string.IsNullOrEmpty(adminEditarServicioDto.CategoriaServicio))
                {
                    servicio.CategoriaServicio = adminEditarServicioDto.CategoriaServicio;
                }

                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, $"Servicio con ID {idServicio} editado correctamente");

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al editar el servicio: {e.Message}");
            }

        }

        [HttpDelete("BorrarServicio/{idServicio}")]
        public async Task<IActionResult> BorrarServicio(int idServicio)
        {
            try
            {
                var servicio = await _dbcontext.Servicios.FindAsync(idServicio);

                if (servicio == null)
                {
                    return NotFound($"Servicio con ID {idServicio} no encontrado");

                }

                _dbcontext.Servicios.Remove(servicio);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, $"Servicio con ID {idServicio} eliminado correctamente");

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar el servicio: {e.Message}");
            }
        }


    }
}
