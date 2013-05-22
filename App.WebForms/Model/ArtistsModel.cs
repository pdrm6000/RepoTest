using System.Collections.Generic;
using App.Domain.ValueObjects.DTO;

namespace App.WebForms.Model
{
    public class ArtistsModel
    {
        public IEnumerable<ArtistDTO> ArtistCollection { get; set; }
    }
}