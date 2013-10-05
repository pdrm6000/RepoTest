namespace App.ApplicationService.DTO
{
    public class AlbumCatalogDTO : IDataTransferObject
    {
        public int Id { get; set; }
        public string AlbumName { get; set; }
        public int Year { get; set; }
        public string CoverUrl { get; set; }

        public int ArtistId { get; set; }
        public string ArtistName { get; set; }
    }
}