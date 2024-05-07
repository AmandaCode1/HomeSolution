using System;
using System.Collections.Generic;

namespace homesolutionBack.Models;

public partial class Usuario
{
    public int UserId { get; set; }

    public string? Nombre { get; set; }

    public string? CorreoElectronico { get; set; }

    public string? Password { get; set; }

    public string? Rol { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public virtual ICollection<SolicitudServicio> SolicitudServicios { get; set; } = new List<SolicitudServicio>();
}
