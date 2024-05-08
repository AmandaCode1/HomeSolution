using System;
using System.Collections.Generic;

namespace homesolutionBack.Models;

public partial class SolicitudServicios
{
    public int SolicitudId { get; set; }

    public int? UserId { get; set; }

    public int? ServicioId { get; set; }

    public DateOnly? FechaSolicitud { get; set; }

    public virtual Servicios? Servicio { get; set; }

    public virtual Usuarios? User { get; set; }
}
