using homesolutionBack.Models;
using homesolutionBack.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace homesolutionBack.Controllers
{
    public class UsuariosOfertasController : Controller
    {
        //declaramos objeto de nuestra base de batos para crud
        public readonly FreedbHomesolutiondbContext _dbcontext;

        //constructor
        public UsuariosOfertasController(FreedbHomesolutiondbContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet("VerLista")]
        public async Task<IActionResult> UsuarioOfertas()
        {

            try
            {
                //include hace que se cargen las entidades usuario y oferta, para ver los detalles.
                var usuariosOfertas = await _dbcontext.UsuariosOfertas
                    .Include(uo => uo.Usuario)
                    .Include(uo => uo.Oferta)
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, (usuariosOfertas));

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener la lista de ofertas de usuarios: {e.Message}");
            }
        }

        [HttpPost("EnlazarOfertaUsuario")]
        public async Task<IActionResult> EnlazarOfertaUsuario(int usuarioId, int ofertaId)
        {
            try
            {

                var usuario = await _dbcontext.Usuarios.FindAsync(usuarioId);
                var oferta = await _dbcontext.Ofertas.FindAsync(ofertaId);

                if (usuario == null || oferta == null)
                {
                    return BadRequest("Usuario u Oferta no encontrado");
                }

                var usuariosOferta = new UsuariosOferta
                {
                    UsuarioId = usuarioId,
                    OfertaId = ofertaId
                };

                _dbcontext.UsuariosOfertas.Add(usuariosOferta);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status201Created, usuariosOferta);

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al enlazar la oferta con el usuario: {e.Message}");
            }

        }

        [HttpDelete("BorrarOfertaUsuario")]
        public async Task<IActionResult> BorrarOfertaUsuario(int usuarioId, int ofertaId)
        {
            try
            {
                var usuariosOferta = await _dbcontext.UsuariosOfertas
                    .FirstOrDefaultAsync(uo => uo.UsuarioId == usuarioId && uo.OfertaId == ofertaId);

                if (usuariosOferta == null)
                {
                    return NotFound("La relacion entre Usuario y Oferta no existe");
                }

                _dbcontext.UsuariosOfertas.Remove(usuariosOferta);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, $"Oferta del usuario eliminada correctamente");

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar la oferta del usuario: {e.Message}");
            }
        }

    }
}
