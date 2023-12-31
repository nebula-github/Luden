﻿using Luden.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Luden.Infrastructure.Data.Mappings
{
    public class CharacterSkillMapping : IEntityTypeConfiguration<CharacterSkill>
    {
        public void Configure(EntityTypeBuilder<CharacterSkill> builder)
        {
            //Primary Key
            builder.HasKey(cs => cs.Id);
            builder.Property(cs => cs.Id).ValueGeneratedOnAdd();

            //Base Entity Properties
            builder.Property(cs => cs.IsDeleted).HasDefaultValue(false);
            builder.Property(c => c.CreatedAt).HasColumnType("datetime2").HasDefaultValueSql("GETDATE()");
            builder.Property(c => c.UpdatedAt).HasColumnType("datetime2").HasDefaultValueSql("GETDATE()").IsRowVersion();

            //Properties
            builder.Property(cs => cs.Value).HasColumnType("int").IsRequired();

            //Relationships
            builder.HasOne(cs => cs.Character).WithMany(c => c.CharacterSkills).HasForeignKey(cs => cs.CharacterId);
            builder.HasOne(cs => cs.Skill).WithMany(s => s.CharacterSkills).HasForeignKey(cs => cs.SkillId);
        }
    }
}
