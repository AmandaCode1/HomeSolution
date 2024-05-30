namespace homesolutionBack.Models.Dto
{
    public class AdminEditarServicioDto
    {
        public string DescripcionServicio { get; set; }
        public decimal? Precio { get; set; }
        public int? Duracion { get; set; }
        public string CategoriaServicio { get; set; }

    }
}
