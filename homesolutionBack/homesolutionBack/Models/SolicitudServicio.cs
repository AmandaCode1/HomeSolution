using System;
using System.Collections.Generic;

namespace homesolutionBack.Models;

public partial class SolicitudServicio
{
    public int SolicitudId { get; set; }

    public int? UserId { get; set; }

    public int? ServicioId { get; set; }

    public DateOnly? FechaSolicitud { get; set; }

    public virtual Servicio? Servicio { get; set; }

    public virtual Usuario? User { get; set; }
}
