//using Pomelo.EntityFrameworkCore;
using homesolutionBack.Models;
using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Options;
//using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
//using System;
using Microsoft.IdentityModel.Tokens;
using System.Text;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Swashbuckle.AspNetCore.Filters;
namespace homesolutionBack
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers()
                //incluyo serializacion para el ciclo de referencia circular al buscar la oferta de un usuario
                .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                //options.JsonSerializerOptions.MaxDepth = 64;
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();/*(options =>
            {
                options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    Description = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhMTdjODU3LTBkMmQtNGM0MS05ZmQyLTdkOWUxODRmMWE3NCIsImlkVXN1YXJpbyI6MSwicm9sIjoiQWRtaW4iLCJuYmYiOjE3MTc4NjQwMTgsImV4cCI6NDQ5MTc4NjQwMTgsImlhdCI6MTcxNzg2NDAxOH0.lJgcKiwzfEggSi6nj7JrohTDmCcJsXvDJPPc36HiEN4",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>(true, JwtBearerDefaults.AuthenticationScheme);
            });*/

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
                //app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            //Habilita autenticacion y autorizacion
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();

            
        }
    }
}
