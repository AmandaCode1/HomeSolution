namespace homesolutionBack.Models.Dto
{
    public class CrearUsuarioDto
    {   
        public string NombreUsuario { get; set; } = null!;

        public string CorreoElectronico { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Rol { get; set; }

        public string Telefono { get; set; }

        public string Direccion { get; set; }
        
    }

}
