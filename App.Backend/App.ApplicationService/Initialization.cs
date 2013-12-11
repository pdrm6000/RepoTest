using App.ApplicationService.Services.Implementations;
using App.CrossCutting.IoC;
using App.ApplicationService.Services.AppServiceContracts;
using App.DomainServices.Services.Contracts;
using App.DomainServices.Services.Implementations;

namespace App.ApplicationService
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(Microsoft.Practices.Unity.IUnityContainer container)
        {
            container.RegisterType(typeof(IAlbumsCollectorAppService), typeof(AlbumsCollectorAppService), "", null);
            container.RegisterType(typeof(IRandomAlbumSelector), typeof(RandomAlbumSelector), "", null);
            container.RegisterType(typeof (IArtistCollectorAppService), typeof (ArtistCollectorAppService), "", null);
            var initializer = new DomainServices.Initialization();
            initializer.RegisterDependencies(container);
        }
    }
}
