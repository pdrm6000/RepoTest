namespace App.ApplicationService.DTO
{
    public class ArtistDTO : IDataTransferObject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
    }
}