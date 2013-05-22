using System;
using App.WebForms.Helpers;
using App.WebForms.Model;
using WebFormsMvp;

namespace App.WebForms.Views.Artists
{
    public interface IArtistView : IView<ArtistsModel>
    {
        event EventHandler<EventArgs> GetArtistEvent;
        event EventHandler<ArtistEventArgs> AddArtistEvent;
    }
}