﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace homesolutionBack.Models;

public partial class HomesolutionbdContext : DbContext
{
    public HomesolutionbdContext()
    {
    }

    public HomesolutionbdContext(DbContextOptions<HomesolutionbdContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Servicio> Servicios { get; set; }

    public virtual DbSet<SolicitudServicio> SolicitudServicios { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3307;database=homesolutionbd;uid=root;pwd=harrypopotter", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.37-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Servicio>(entity =>
        {
            entity.HasKey(e => e.ServicioId).HasName("PRIMARY");

            entity.ToTable("servicios");

            entity.Property(e => e.ServicioId).HasColumnName("ServicioID");
            entity.Property(e => e.Categoria).HasMaxLength(255);
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);
            entity.Property(e => e.Precio).HasPrecision(10, 2);
        });

        modelBuilder.Entity<SolicitudServicio>(entity =>
        {
            entity.HasKey(e => e.SolicitudId).HasName("PRIMARY");

            entity.ToTable("solicitud_servicios");

            entity.HasIndex(e => e.UserId, "fk_UserID");

            entity.HasIndex(e => e.ServicioId, "solicitud_servicios_ibfk_2");

            entity.Property(e => e.SolicitudId)
                .ValueGeneratedNever()
                .HasColumnName("SolicitudID");
            entity.Property(e => e.ServicioId).HasColumnName("ServicioID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Servicio).WithMany(p => p.SolicitudServicios)
                .HasForeignKey(d => d.ServicioId)
                .HasConstraintName("solicitud_servicios_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.SolicitudServicios)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_UserID");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("usuarios");

            entity.HasIndex(e => e.CorreoElectronico, "CorreoElectronico").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Direccion).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Rol)
                .HasMaxLength(255)
                .HasDefaultValueSql("'usuario'");
            entity.Property(e => e.Telefono).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
