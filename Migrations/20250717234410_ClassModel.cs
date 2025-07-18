using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymFit.Migrations
{
    /// <inheritdoc />
    public partial class ClassModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DurationMinutes",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "Schedule",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "Day",
                table: "Classes",
                newName: "Duration");

            migrationBuilder.AddColumn<List<string>>(
                name: "Days",
                table: "Classes",
                type: "text[]",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Days",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Classes",
                newName: "Day");

            migrationBuilder.AddColumn<int>(
                name: "DurationMinutes",
                table: "Classes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Schedule",
                table: "Classes",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
