using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymFit.Migrations
{
    /// <inheritdoc />
    public partial class Chestii2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Clients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Clients",
                type: "text",
                nullable: true);
        }
    }
}
