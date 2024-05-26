using System;
using System.Collections.Generic;

namespace homesolutionBack.Models;

public partial class Servicio
{
    public int ServicioId { get; set; }

    public string DescripcionServicio { get; set; } = null!;

    public decimal Precio { get; set; }

    public int Duracion { get; set; }

    public string CategoriaServicio { get; set; } = null!;

    public virtual ICollection<Oferta> Oferta { get; set; } = new List<Oferta>();
}
