using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace GymFit.Migrations
{
    /// <inheritdoc />
    public partial class Updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ClassRegistrations",
                table: "ClassRegistrations");

            migrationBuilder.DropIndex(
                name: "IX_ClassRegistrations_ClientId",
                table: "ClassRegistrations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ClassRegistrations");

            migrationBuilder.AlterColumn<string>(
                name: "Days",
                table: "Classes",
                type: "text",
                nullable: false,
                oldClrType: typeof(List<string>),
                oldType: "text[]");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClassRegistrations",
                table: "ClassRegistrations",
                columns: new[] { "ClientId", "ClassId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ClassRegistrations",
                table: "ClassRegistrations");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ClassRegistrations",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<List<string>>(
                name: "Days",
                table: "Classes",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClassRegistrations",
                table: "ClassRegistrations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ClassRegistrations_ClientId",
                table: "ClassRegistrations",
                column: "ClientId");
        }
    }
}
