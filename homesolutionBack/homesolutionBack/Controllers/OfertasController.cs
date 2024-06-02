using homesolutionBack.Models;
using homesolutionBack.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace homesolutionBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfertasController : ControllerBase
    {
        //declaramos objeto de nuestra base de batos para crud
        public readonly FreedbHomesolutiondbContext _dbcontext;

        //constructor
        public OfertasController(FreedbHomesolutiondbContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet("VerLista")]
        public async Task<IActionResult> Ofertas()
        {
            //objeto de lista de ofertas
            List<Oferta> ofertas = new List<Oferta>();

            try
            {
                ofertas = await _dbcontext.Ofertas.ToListAsync();
                return StatusCode(StatusCodes.Status200OK, (ofertas));

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener la lista de ofertas: {e.Message}");
            }
        }

        [HttpGet("VerOferta/{idOferta}")]
        public async Task<IActionResult> VerServicio(int idOferta)
        {
            try
            {
                var oferta = await _dbcontext.Ofertas
                .Where(o => o.OfertaId == idOferta)
                .Select(o => new
                {
                    o.OfertaId,
                    o.DescripcionOferta,
                    o.CategoriaServicio,
                    o.ServicioId
                })
                .FirstOrDefaultAsync();

                if (oferta == null)
                {
                    return NotFound($"Oferta con ID {idOferta} no encontrado");
                }

                return StatusCode(StatusCodes.Status200OK, oferta);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener la oferta: {e.Message}");
            }
        }

        [HttpPost("CrearOferta")]
        public async Task<IActionResult> CrearOferta([FromBody] CrearOfertaDto crearOfertaDto)
        {
            try
            {
                var categoriasValidas = new[] { "electricidad", "fontaneria", "climatizacion", "pladur" };
                if (!categoriasValidas.Contains(crearOfertaDto.CategoriaServicio.ToLower()))
                {
                    return BadRequest("La categoria no existe, debe ser electricidad, fontaneria, climatizacion o pladur");
                }

                var oferta = new Oferta
                {
                    DescripcionOferta = crearOfertaDto.DescripcionOferta,
                    CategoriaServicio = crearOfertaDto.CategoriaServicio,
                    ServicioId = crearOfertaDto.ServicioId
                };

                _dbcontext.Ofertas.Add(oferta);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status201Created, oferta);

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al crear la oferta: {e.Message}");
            }

        }

        [HttpPut("AdminEditarOferta/{idOferta}")]
        public async Task<IActionResult> AdminEditarOferta(int idOferta, [FromBody] AdminEditarOfertaDto adminEditarOfertaDto)
        {
            try
            {
                var oferta = await _dbcontext.Ofertas.FindAsync(idOferta);

                if (oferta == null)
                {
                    return NotFound($"Oferta con ID {idOferta} no encontrada");

                }

                //actualizar bd con los valores del dto, si estan vacios se deja el valor anterior
                if (!string.IsNullOrEmpty(adminEditarOfertaDto.DescripcionOferta))
                {
                    oferta.DescripcionOferta = adminEditarOfertaDto.DescripcionOferta;
                }
                if (!string.IsNullOrEmpty(adminEditarOfertaDto.CategoriaServicio))
                {
                    oferta.CategoriaServicio = adminEditarOfertaDto.CategoriaServicio;
                }
                if (adminEditarOfertaDto.ServicioId.HasValue)
                {
                    oferta.ServicioId = adminEditarOfertaDto.ServicioId.Value;
                }
                

                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, $"Oferta con ID {idOferta} editada correctamente");

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al editar la oferta: {e.Message}");
            }

        }

        [HttpDelete("BorrarOferta/{idOferta}")]
        public async Task<IActionResult> BorrarOferta(int idOferta)
        {
            try
            {
                var oferta = await _dbcontext.Ofertas.FindAsync(idOferta);

                if (oferta == null)
                {
                    return NotFound($"Oferta con ID {idOferta} no encontrado");

                }

                _dbcontext.Ofertas.Remove(oferta);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, $"Oferta con ID {idOferta} eliminada correctamente");

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar la oferta: {e.Message}");
            }
        }


    }
}
