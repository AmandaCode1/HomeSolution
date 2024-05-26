﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace homesolutionBack.Models;

public partial class FreedbHomesolutiondbContext : DbContext
{
    public FreedbHomesolutiondbContext()
    {
    }

    public FreedbHomesolutiondbContext(DbContextOptions<FreedbHomesolutiondbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Oferta> Ofertas { get; set; }

    public virtual DbSet<Servicio> Servicios { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=sql.freedb.tech;port=3306;database=freedb_homesolutiondb;uid=freedb_amanda;pwd=C8XQUCQTas5@%%X", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Oferta>(entity =>
        {
            entity.HasKey(e => e.OfertaId).HasName("PRIMARY");

            entity.HasIndex(e => e.ServicioId, "ServicioID");

            entity.Property(e => e.OfertaId).HasColumnName("OfertaID");
            entity.Property(e => e.CategoriaServicio).HasColumnType("enum('electricidad','fontaneria','climatizacion','pladur')");
            entity.Property(e => e.DescripcionOferta).HasMaxLength(200);
            entity.Property(e => e.ServicioId).HasColumnName("ServicioID");

            entity.HasOne(d => d.Servicio).WithMany(p => p.Oferta)
                .HasForeignKey(d => d.ServicioId)
                .HasConstraintName("Ofertas_ibfk_1");
        });

        modelBuilder.Entity<Servicio>(entity =>
        {
            entity.HasKey(e => e.ServicioId).HasName("PRIMARY");

            entity.Property(e => e.ServicioId).HasColumnName("ServicioID");
            entity.Property(e => e.CategoriaServicio).HasColumnType("enum('electricidad','fontaneria','climatizacion','pladur')");
            entity.Property(e => e.DescripcionServicio).HasMaxLength(200);
            entity.Property(e => e.Precio).HasPrecision(10, 2);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PRIMARY");

            entity.HasIndex(e => e.NombreUsuario, "NombreUsuario").IsUnique();

            entity.Property(e => e.UsuarioId).HasColumnName("UsuarioID");
            entity.Property(e => e.CorreoElectronico).HasMaxLength(100);
            entity.Property(e => e.Direccion).HasMaxLength(200);
            entity.Property(e => e.NombreUsuario).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.Rol)
                .HasDefaultValueSql("'Usuario'")
                .HasColumnType("enum('Usuario','Admin')");
            entity.Property(e => e.Telefono).HasMaxLength(15);

            entity.HasMany(d => d.Oferta).WithMany(p => p.Usuarios)
                .UsingEntity<Dictionary<string, object>>(
                    "UsuariosOferta",
                    r => r.HasOne<Oferta>().WithMany()
                        .HasForeignKey("OfertaId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Usuarios_Ofertas_ibfk_2"),
                    l => l.HasOne<Usuario>().WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Usuarios_Ofertas_ibfk_1"),
                    j =>
                    {
                        j.HasKey("UsuarioId", "OfertaId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("Usuarios_Ofertas");
                        j.HasIndex(new[] { "OfertaId" }, "OfertaID");
                        j.IndexerProperty<int>("UsuarioId").HasColumnName("UsuarioID");
                        j.IndexerProperty<int>("OfertaId").HasColumnName("OfertaID");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
