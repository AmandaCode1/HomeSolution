using System.Text.Json.Serialization;

namespace homesolutionBack.Models
{
    public class UsuariosOferta
    {
        public int UsuarioId { get; set; }
        [JsonIgnore]
        public Usuario Usuario { get; set; }

        public int OfertaId { get; set; }
        [JsonIgnore]
        public Oferta Oferta { get; set; }
    }
}