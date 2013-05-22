using System;
using App.Domain.ValueObjects.DTO;

namespace App.WebForms.Helpers
{
    public class ArtistEventArgs : EventArgs
    {
        public ArtistDTO Artist { get; set; }
    }
}