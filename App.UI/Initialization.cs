using Microsoft.Practices.Unity;
using App.CrossCutting.IoC;
using AppTest.Metadata;

namespace AppTest
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(IUnityContainer container)
        {
            container.RegisterType<IDataCollector, DataCollector>();
            IDependencyInitializer initializer = new App.DistributedServices.Initialization();
            initializer.RegisterDependencies(container);
        }
    }
}