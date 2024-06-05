using homesolutionBack.Models;
using homesolutionBack.Models.Dto;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace homesolutionBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginRegistroController : ControllerBase
    {
        private readonly FreedbHomesolutiondbContext _dbcontext;

        //parametros para crear token
        private readonly TokenValidationParameters _tokenParameters;

        public LoginRegistroController(IOptionsMonitor<JwtBearerOptions> jwtOptions, FreedbHomesolutiondbContext dbcontext)
        {
            _dbcontext = dbcontext;
            _tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme).TokenValidationParameters;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                //hashea la contraseña
                var hashedPassword = PasswordHash.Hash(loginDto.Password);

                //busca en la bd un usuario que coincida
                var usuario = await _dbcontext.Usuarios.FirstOrDefaultAsync(u => u.NombreUsuario == loginDto.Nombre);

                if ((usuario == null) || (usuario.Password != hashedPassword))
                {
                    return Unauthorized("El usuario no existe o la contraseña es incorrecta");
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    //datos para autorizar al usuario
                    Claims = new Dictionary<string, object>
                {
                    { "id", Guid.NewGuid().ToString() },
                    { "idUsuario", usuario.UsuarioId },
                    { "rol", usuario.Rol }
                },
                    //Expiracion token
                    Expires = DateTime.UtcNow.AddDays(500000),
                    //Clave y algoritmo de cifrado
                    SigningCredentials = new SigningCredentials(
                        _tokenParameters.IssuerSigningKey,
                        SecurityAlgorithms.HmacSha256Signature)
                };

                //creamos token y lo devolvemos al usuario logueado
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                string stringToken = tokenHandler.WriteToken(token);

                return Ok(new { token = stringToken, rol = usuario.Rol });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al iniciar sesion: {ex.Message}");
            }
           
        }

        [HttpPost("Registro")]
        public async Task<IActionResult> Registro([FromBody] RegistroDto registroDto)
        {
            try
            {
                var usuarioExiste = await _dbcontext.Usuarios.FirstOrDefaultAsync(u => u.NombreUsuario == registroDto.Nombre);
                if (usuarioExiste != null)
                {
                    return BadRequest("El usuario ya existe");
                }

                //hashea la contraseña
                var hashedPassword = PasswordHash.Hash(registroDto.Password);

                string rol = string.IsNullOrEmpty(registroDto.Rol) ? "Usuario" : registroDto.Rol;

                var newUsuario = new Usuario
                {
                    NombreUsuario = registroDto.Nombre,
                    CorreoElectronico = registroDto.CorreoElectronico,
                    Password = hashedPassword,
                    Rol = rol,
                    Telefono = registroDto.Telefono,
                    Direccion = registroDto.Direccion
                };

                //añade el usuario a la bd y guarda
                _dbcontext.Usuarios.Add(newUsuario);
                await _dbcontext.SaveChangesAsync();
                return Ok(new { message = "Usuario registrado correctamente" });
                //return StatusCode(StatusCodes.Status200OK, "Usuario regisrado correctamente");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al registrar el usuario: {ex.Message}");
            }
        }

    }
}
