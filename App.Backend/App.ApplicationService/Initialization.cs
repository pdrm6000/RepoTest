using App.ApplicationService.DTO;
using App.ApplicationService.Services.BaseServices;
using App.ApplicationService.Services.Implementations;
using App.CrossCutting.IoC;
using App.ApplicationService.Services.AppServiceContracts;

namespace App.ApplicationService
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(Microsoft.Practices.Unity.IUnityContainer container)
        {
            container.RegisterType(typeof(IAlbumsCollectorAppService), typeof(AlbumsCollectorAppService), "", null);
            container.RegisterType(typeof(IBreezeApplicationService<ArtistDTO>), typeof(ArtistCollectorAppService), "", null);
            container.RegisterType(typeof(ICommentsCollectorAppService), typeof(CommentsCollectorAppService), "", null);
            container.RegisterType(typeof(IRatesCollectorAppService), typeof(RatesCollectorAppService), "", null);
            var initializer = new DomainServices.Initialization();
            initializer.RegisterDependencies(container);
        }
    }
}
