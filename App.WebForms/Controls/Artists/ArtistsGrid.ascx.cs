using System;
using System.Web.Services;
using App.Domain.ValueObjects.DTO;
using App.WebForms.Helpers;
using App.WebForms.Model;
using App.WebForms.Presenters.Artists;
using App.WebForms.Views.Artists;
using WebFormsMvp;
using WebFormsMvp.Web;

namespace App.WebForms.Controls.Artists
{
    [PresenterBinding(typeof(ArtistsGridPresenter))]
    public partial class ArtistsGrid : MvpUserControl<ArtistsModel>, IArtistView
    {
        public event EventHandler<EventArgs> GetArtistEvent;
        public event EventHandler<ArtistEventArgs> AddArtistEvent;

        protected void GetArtists(object sender, EventArgs e)
        {
            if (GetArtistEvent != null)
            {
                GetArtistEvent(this, new EventArgs());
            }
        }

        protected void AddArtist(object sender, EventArgs e)
        {
            if (AddArtistEvent != null)
            {
                AddArtistEvent(this, new ArtistEventArgs()
                                         {
                                             Artist = new ArtistDTO
                                                          {
                                                              Id = 0,
                                                              ImageUrl = txtArtistName.Text,
                                                              Name = txtArtistImg.Text
                                                          }
                                         });
            }
        }
    }
}