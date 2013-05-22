using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using App.WebForms.Model;
using WebFormsMvp;

namespace App.WebForms.Presenters.Artists
{
    public class ArtistsPresenter : Presenter<IView<DefaultPageModel>>
    {
        public ArtistsPresenter(IView<DefaultPageModel> view) 
            : base(view)
        {
            View.Load +=ViewOnLoad;
        }

        private void ViewOnLoad(object sender, EventArgs eventArgs)
        {
            View.Model.PageTitle = "Artist directory";
        }
    }
}