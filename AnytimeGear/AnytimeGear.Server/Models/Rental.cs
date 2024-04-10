namespace AnytimeGear.Server.Models
{
    public class Rental
    {
        public int Id { get; set; }
        public bool Completed { get; set; }
        public DateTime StartPeriod { get; set; }
        public DateTime EndPeriod { get; set; }
        public required User User { get; set; }
        public required Product Product { get; set; }
    }
}
