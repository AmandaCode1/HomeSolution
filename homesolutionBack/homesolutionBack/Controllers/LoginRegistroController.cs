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
        private readonly HomesolutionbdContext _dbcontext;

        //parametros para crear token
        private readonly TokenValidationParameters _tokenParameters;

        public LoginRegistroController(IOptionsMonitor<JwtBearerOptions> jwtOptions, HomesolutionbdContext dbcontext)
        {
            _dbcontext = dbcontext;
            _tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme).TokenValidationParameters;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            //hashea la contraseña
            var hashedPassword = PasswordHash.Hash(loginDto.Password);

            //busca en la bd un usuario que coincida
            var usuario = await _dbcontext.Usuarios.FirstOrDefaultAsync(u => u.Nombre == loginDto.Nombre && u.Password == loginDto.Password);
            
            if (usuario == null) 
            {
                return Unauthorized("El usuario no existe o la contraseña es incorrecta");
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //datos para autorizar al usuario
                Claims = new Dictionary<string, object>
                {
                    { "id", Guid.NewGuid().ToString() },
                    { "idUsuario", usuario.UserId }
                },
                //Expiracion token
                Expires = DateTime.UtcNow.AddDays(200),
                //Clave y algoritmo de cifrado
                SigningCredentials = new SigningCredentials(
                    _tokenParameters.IssuerSigningKey, 
                    SecurityAlgorithms.HmacSha256Signature)
            };

            //creamos token y devolvemos al usuario logueado
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string stringToken = tokenHandler.WriteToken(token);

            return StatusCode(StatusCodes.Status200OK, stringToken);
        }

        [HttpPost("Registro")]
        public async Task<IActionResult> Registro([FromBody] RegistroDto registroDto)
        {
            var usuarioExiste = await _dbcontext.Usuarios.FirstOrDefaultAsync(u => u.Nombre == registroDto.Nombre);
            if (usuarioExiste != null)
            {
                return BadRequest("El usuario ya existe");
            }

            //hashea la contraseña
            var hashedPassword = PasswordHash.Hash(registroDto.Password);

            var newUsuario = new Usuarios
            {
                Nombre = registroDto.Nombre,
                CorreoElectronico = registroDto.CorreoElectronico,
                Password = registroDto.Password,
                Rol = registroDto.Rol,
                Telefono = registroDto.Telefono,
                Direccion = hashedPassword
            };

            //añade el usuario a la bd y guarda
            _dbcontext.Usuarios.Add(newUsuario);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "Usuario regisrado correctamente");
        }

    }
}
