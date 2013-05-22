using System.Web.Services;
using App.CrossCutting.Provider;
using App.Domain.AppServiceContracts;
using App.Domain.ValueObjects.DTO;
using App.WebForms.Model;
using App.WebForms.Presenters.Artists;
using WebFormsMvp;
using WebFormsMvp.Web;

namespace App.WebForms
{
    [PresenterBinding(typeof(ArtistsPresenter))]
    public partial class Artists : MvpPage<DefaultPageModel>
    {
        [WebMethod]
        public static void AddArtist(ArtistDTO artistDTO)
        {
            var service = (IArtistCollectorAppService)UnityInstanceProvider.Container.Resolve(typeof (IArtistCollectorAppService), "");
            service.AddArtist(artistDTO);
        }
    }
}