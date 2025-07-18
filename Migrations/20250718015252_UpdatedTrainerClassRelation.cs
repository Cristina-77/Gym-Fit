using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymFit.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedTrainerClassRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassTrainers");

            migrationBuilder.DropColumn(
                name: "Specialization",
                table: "Trainers");

            migrationBuilder.AddColumn<int>(
                name: "ClassId",
                table: "Trainers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Trainers_ClassId",
                table: "Trainers",
                column: "ClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainers_Classes_ClassId",
                table: "Trainers",
                column: "ClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainers_Classes_ClassId",
                table: "Trainers");

            migrationBuilder.DropIndex(
                name: "IX_Trainers_ClassId",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "ClassId",
                table: "Trainers");

            migrationBuilder.AddColumn<string>(
                name: "Specialization",
                table: "Trainers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ClassTrainers",
                columns: table => new
                {
                    ClassId = table.Column<int>(type: "integer", nullable: false),
                    TrainerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassTrainers", x => new { x.ClassId, x.TrainerId });
                    table.ForeignKey(
                        name: "FK_ClassTrainers_Classes_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Classes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassTrainers_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassTrainers_TrainerId",
                table: "ClassTrainers",
                column: "TrainerId");
        }
    }
}
