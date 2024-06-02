namespace homesolutionBack.Models
{
    public class UsuariosOferta
    {
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public int OfertaId { get; set; }
        public Oferta Oferta { get; set; }
    }
}