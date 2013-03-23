using System.Collections.Generic;

namespace App.Domain.ValueObjects.DTO
{
    public class ArtistWithAlbumsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<AlbumEditingDTO> Albums { get; set; }
    }
}