using App.ApplicationService.Services.AppServiceContracts;
using App.ApplicationService.Services.Implementations;
using App.CrossCutting.Caching;
using Microsoft.Practices.Unity;
using App.CrossCutting.IoC;

namespace App.Rest
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(IUnityContainer container)
        {
            container
                .RegisterType<IAlbumsNavigationCache, AlbumsNavigationCache>()
                .RegisterType<ICacheService, CacheService>(new ContainerControlledLifetimeManager());
            IDependencyInitializer initializer = new App.ApplicationService.Initialization();
            initializer.RegisterDependencies(container);
        }
    }
}