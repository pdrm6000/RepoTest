using Microsoft.Practices.Unity;

namespace App.CrossCutting.IoC
{
    public interface IDependencyInitializer
    {
        void RegisterDependencies(IUnityContainer container);
    }
}
