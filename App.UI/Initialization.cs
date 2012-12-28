using App.CrossCutting.Caching;
using Microsoft.Practices.Unity;
using App.CrossCutting.IoC;
using AppTest.Metadata;

namespace AppTest
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(IUnityContainer container)
        {
            container
                .RegisterType<IDataCollector, DataCollector>()
                .RegisterType<IAlbumsNavigationCache, AlbumsNavigationCache>()
                .RegisterType<ICacheService, CacheService>(new ContainerControlledLifetimeManager());
            IDependencyInitializer initializer = new App.DistributedServices.Initialization();
            initializer.RegisterDependencies(container);
        }
    }
}