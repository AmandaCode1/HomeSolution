using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace homesolutionBack.Models;

public partial class Oferta
{
    public int OfertaId { get; set; }

    public string DescripcionOferta { get; set; } = null!;

    public string CategoriaServicio { get; set; } = null!;

    public int? ServicioId { get; set; }

    public virtual Servicio? Servicio { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
    
    public ICollection<UsuariosOferta> UsuariosOfertas { get; set; }
}
