using App.CrossCutting.Caching;
using Microsoft.Practices.Unity;
using App.CrossCutting.IoC;

namespace App.Rest
{
	public class Initialization : IDependencyInitializer
	{
		public void RegisterDependencies(IUnityContainer container)
		{
			container.RegisterType<ICacheService, CacheService>(new ContainerControlledLifetimeManager());
			IDependencyInitializer appServiceinitializer = new ApplicationService.Initialization();
			IDependencyInitializer crossCuttinginitializer = new CrossCutting.Initialization();
			crossCuttinginitializer.RegisterDependencies(container);
			appServiceinitializer.RegisterDependencies(container);
		}
	}
}