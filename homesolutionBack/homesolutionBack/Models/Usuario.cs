//using System;
//using System.Collections.Generic;
//using System.Text.Json.Serialization;

namespace homesolutionBack.Models;

public partial class Usuario
{
    
    public int UsuarioId { get; set; }

    public string NombreUsuario { get; set; } = null!;

    public string CorreoElectronico { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Rol { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public virtual ICollection<Oferta> Oferta { get; set; } = new List<Oferta>();
  
    public ICollection<UsuariosOferta> UsuariosOfertas { get; set; }
}
