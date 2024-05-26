using Pomelo.EntityFrameworkCore;
using homesolutionBack.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using Microsoft.IdentityModel.Tokens;
using System.Text;
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
            builder.Services.AddDbContext<FreedbHomesolutiondbContext>(opt => 
            {
                // Obtener la cadena de conexión desde appsettings.json
                string connectionString = builder.Configuration.GetConnectionString("cadenaMySql");

            });

            //Utilizar la autenticacion por JWT
            builder.Services.AddAuthentication().AddJwtBearer(options =>
            {
                //Guardamos la clase privada en variables de entorno
                string key = Environment.GetEnvironmentVariable("JWT_KEY");

                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    //Clave secreta para firmar y validar el token
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                };
            });

            //Permite cors para que no bloquee las peticiones
            if (builder.Environment.IsDevelopment())
            {
                builder.Services.AddCors(options =>
                {
                    options.AddDefaultPolicy(builder =>
                    {
                        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
                });
            }

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

                app.UseCors();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            //Habilita autenticacion y autorizacion
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();

            
        }
    }
}
