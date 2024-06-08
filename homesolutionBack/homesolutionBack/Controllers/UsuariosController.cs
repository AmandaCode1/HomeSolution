using homesolutionBack.Models;
using homesolutionBack.Models.Dto;
using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace homesolutionBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        public readonly FreedbHomesolutiondbContext _dbcontext;

        //constructor
        public UsuariosController(FreedbHomesolutiondbContext _context)
        {
            _dbcontext = _context;
        }

        [Authorize]
        [HttpGet("VerLista")]
        public async Task <IActionResult> Usuarios()
        {
            //objeto de lista de usuarios
            //List<Usuarios> usuarios = new List<Usuarios>();

            try
            {
                var usuario = await _dbcontext.Usuarios.Select(u => new 
                {
                    u.UsuarioId,
                    u.NombreUsuario,
                    u.Rol,
                    u.CorreoElectronico,
                    u.Direccion,
                    u.Telefono 
                })
                .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, usuario);

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener la lista de usuarios: {e.Message}");
            }
        }

        [Authorize]
        [HttpGet("VerUsuario/{idUsuario}")]
        public async Task<IActionResult> VerUsuario(int idUsuario)
        {
            try
            {
                var usuario = await _dbcontext.Usuarios
                .Where(u => u.UsuarioId == idUsuario)
                .Select(u => new
                {
                    u.UsuarioId,
                    u.NombreUsuario,
                    u.Rol,
                    u.CorreoElectronico,
                    u.Direccion,
                    u.Telefono
                })
                .FirstOrDefaultAsync();

                if (usuario == null)
                {
                    return NotFound($"Usuario con ID {idUsuario} no encontrado");
                }

                return StatusCode(StatusCodes.Status200OK, usuario);
            }
            catch (Exception e) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener el usuario: {e.Message}");
            }
        }

        [Authorize]
        [HttpPut("AdminEditarUsuario/{idUsuario}")]
        public async Task<IActionResult> AdminEditarUsuario(int idUsuario, [FromBody] AdminEditarUsuarioDto adminEditarUsuarioDto)
        {
            try
            {
                var usuario = await _dbcontext.Usuarios.FindAsync(idUsuario);

                if(usuario == null)
                {
                    return NotFound($"Usuario con ID {idUsuario} no encontrado");

                }

                //actualizar bd con los valores del dto, si estan vacios se deja el valor anterior
                if (!string.IsNullOrEmpty(adminEditarUsuarioDto.NombreUsuario))
                {
                    usuario.NombreUsuario = adminEditarUsuarioDto.NombreUsuario;
                }
                if (!string.IsNullOrEmpty(adminEditarUsuarioDto.Rol))
                {
                    usuario.Rol = adminEditarUsuarioDto.Rol;
                }
                if (!string.IsNullOrEmpty(adminEditarUsuarioDto.CorreoElectronico))
                {
                    usuario.CorreoElectronico = adminEditarUsuarioDto.CorreoElectronico;
                }
                if (!string.IsNullOrEmpty(adminEditarUsuarioDto.Direccion))
                {
                    usuario.Direccion = adminEditarUsuarioDto.Direccion;
                }
                if (!string.IsNullOrEmpty(adminEditarUsuarioDto.Telefono))
                {
                    usuario.Telefono = adminEditarUsuarioDto.Telefono;
                }

                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, new { message = $"Usuario con ID {idUsuario} editado correctamente" });

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al editar el usuario: {e.Message}");
            }
            
        }

        [Authorize]
        [HttpDelete("BorrarUsuario/{idUsuario}")]
        public async Task<IActionResult> BorrarUsuario(int idUsuario)
        {
            try
            {
                var usuario = await _dbcontext.Usuarios.FindAsync(idUsuario);
                
                if (usuario == null)
                {
                    return NotFound($"Usuario con ID {idUsuario} no encontrado");

                }

                _dbcontext.Usuarios.Remove(usuario);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, $"Usuario con ID {idUsuario} eliminado correctamente");

            }
            catch (Exception e) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar el usuario: {e.Message}");
            }
        }

    }
}
