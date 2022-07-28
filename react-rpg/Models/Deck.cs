namespace Tnewg.Models
{
    public class Deck
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserProfileId { get; set; }
        public string BackgroundImage { get; set; }
        public int CardCount { get; set; }
    }
}
