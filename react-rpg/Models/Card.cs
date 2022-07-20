namespace Tnewg.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Damage { get; set; }
        public int HitPoints { get; set; }
        public int Cost { get; set; }
        public string BackgroundColor { get; set; }
        public string BorderColor { get; set; }
        public string StatsBackgroundColor { get; set; }
        public string Image { get; set; }
    }
}
