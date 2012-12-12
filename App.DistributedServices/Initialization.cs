using App.CrossCutting.IoC;

namespace App.DistributedServices
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(Microsoft.Practices.Unity.IUnityContainer container)
        {
            IDependencyInitializer initializer = new ApplicationService.Initialization();
            initializer.RegisterDependencies(container);
        }
    }
}