using App.CrossCutting.Caching;
using App.UI.Metadata;
using Microsoft.Practices.Unity;
using App.CrossCutting.IoC;

namespace App.UI
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