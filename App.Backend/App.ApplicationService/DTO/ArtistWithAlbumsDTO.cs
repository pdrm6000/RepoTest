using System.Collections.Generic;

namespace App.ApplicationService.DTO
{
    public class ArtistWithAlbumsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<AlbumEditingDTO> Albums { get; set; }
    }
}