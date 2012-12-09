namespace App.Domain.ValueObjects.DTO
{
    public class AlbumDTO
    {
        public string AlbumName { get; set; }
        public string Year { get; set; }
        public string ArtistName { get; set; }
        public string CoverUrl { get; set; }
        public int ActualRating { get; set; }
        public string Comments { get; set; }
    }
}
