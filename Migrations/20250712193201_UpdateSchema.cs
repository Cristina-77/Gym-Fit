using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymFit.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Trainers",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Trainers",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Trainers",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Clients",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Clients",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Clients",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Trainers",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Trainers",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Trainers",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Clients",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Clients",
                newName: "Address");
        }
    }
}
