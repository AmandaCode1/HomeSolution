using System;
using System.Collections.Generic;

namespace homesolutionBack.Models;

public partial class Servicio
{
    public int ServicioId { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public decimal? Precio { get; set; }

    public int? DuracionEstimada { get; set; }

    public string? Categoria { get; set; }

    public virtual ICollection<SolicitudServicio> SolicitudServicios { get; set; } = new List<SolicitudServicio>();
}
