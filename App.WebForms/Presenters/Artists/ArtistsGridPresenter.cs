using System;
using App.Domain.AppServiceContracts;
using App.WebForms.Views.Artists;
using WebFormsMvp;

namespace App.WebForms.Presenters.Artists
{
    public class ArtistsGridPresenter : Presenter<IArtistView>
    {
        private readonly IArtistCollectorAppService _artistCollectorAppService;

        public ArtistsGridPresenter(IArtistView view, IArtistCollectorAppService artistCollectorAppService)
            : base(view)
        {
            _artistCollectorAppService = artistCollectorAppService;
            View.Load += ViewLoad;
            View.GetArtistEvent += ViewGetArtistEvent;
            View.AddArtistEvent += ViewAddArtistEvent;
        }

        public void ViewAddArtistEvent(object sender, Helpers.ArtistEventArgs e)
        {
            _artistCollectorAppService.AddArtist(e.Artist);
        }

        void ViewGetArtistEvent(object sender, EventArgs e)
        {
            View.Model.ArtistCollection = _artistCollectorAppService.GetAll();
        }

        void ViewLoad(object sender, EventArgs e)
        {
        }
    }
}