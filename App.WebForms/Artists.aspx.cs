using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using App.Domain.ValueObjects.DTO;
using WebFormsMvp;
using WebFormsMvp.Web;

namespace App.WebForms
{

    [PresenterBinding(typeof(ArtistsPresenter))]
    public partial class Artists : MvpPage<ArtistsModel>, IArtistView
    {
        protected void GetArtists(object sender, EventArgs e)
        {
            OnGetArtistEvent();
        }

        public event EventHandler<EventArgs> GetArtistEvent;

        private void OnGetArtistEvent()
        {
            if (GetArtistEvent != null)
            {
                GetArtistEvent(this, new EventArgs());
            }
        }
    }

    public class ArtistsModel
    {
        public string PageTitle { get; set; }
        public IEnumerable<ArtistDTO> ArtistCollection { get; set; }
    }

    public interface IArtistView : IView<ArtistsModel>
    {
        event EventHandler<EventArgs> GetArtistEvent;
    }

    public class ArtistsPresenter : Presenter<IArtistView>
    {
        public ArtistsPresenter(IArtistView view)
            : base(view)
        {
            View.Load += ViewLoad;
            View.GetArtistEvent += ViewGetArtistEvent;
        }

        void ViewGetArtistEvent(object sender, EventArgs e)
        {
            View.Model.ArtistCollection = new List<ArtistDTO>
                                           {
                                               new ArtistDTO { Id = 1, ImageUrl = "lll", Name = "Artist 1" }, 
                                               new ArtistDTO { Id = 2, ImageUrl = "222", Name = "Artist 2" }
                                           };
        }

        void ViewLoad(object sender, EventArgs e)
        {
            View.Model.PageTitle = "MVP rules !!";
        }
    }
}