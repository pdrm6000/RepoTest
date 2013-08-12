namespace App.Domain.ValueObjects.DTO
{
    public class AlbumEditingDTO
    {
        public int Id { get; set; }
        public string AlbumName { get; set; }
        public int Year { get; set; }
        public string CoverUrl { get; set; }
        public int ArtistId { get; set; }
    }
}