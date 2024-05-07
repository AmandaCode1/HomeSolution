using Pomelo.EntityFrameworkCore;
using homesolutionBack.Models;
using Microsoft.EntityFrameworkCore;
namespace homesolutionBack
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //Para configurar nuestro contexto con nuestra cadena de conexion para utlizarla en los controladores
            builder.Services.AddDbContext<HomesolutionbdContext>(opt => opt.UseMySql(builder.Configuration.GetConnectionString("cadenaMySql")));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
