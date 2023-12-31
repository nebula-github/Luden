﻿using Luden.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Luden.Infrastructure.Data.Mappings
{
    public class SkillMapping : IEntityTypeConfiguration<Skill>
    {
        public void Configure(EntityTypeBuilder<Skill> builder)
        {
            //Primary Key
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();

            //Base Entity Properties
            builder.Property(s => s.IsDeleted).HasDefaultValue(false);
            builder.Property(c => c.CreatedAt).HasColumnType("datetime2").HasDefaultValueSql("GETDATE()");
            builder.Property(c => c.UpdatedAt).HasColumnType("datetime2").HasDefaultValueSql("GETDATE()").IsRowVersion();

            //Properties
            builder.Property(s => s.Name).HasColumnType("varchar(150)").IsRequired();

            //Relationships
            builder.HasOne(s => s.RpgSystem).WithMany(rs => rs.Skills).HasForeignKey(s => s.RpgSystemId);
            builder.HasMany(s => s.CharacterSkills).WithOne(cs => cs.Skill).HasForeignKey(s => s.SkillId);
        }
    }
}
