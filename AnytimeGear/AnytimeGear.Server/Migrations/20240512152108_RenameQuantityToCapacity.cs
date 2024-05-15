using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnytimeGear.Server.Migrations
{
    /// <inheritdoc />
    public partial class RenameQuantityToCapacity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Product",
                newName: "Capacity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Capacity",
                table: "Product",
                newName: "Quantity");
        }
    }
}
