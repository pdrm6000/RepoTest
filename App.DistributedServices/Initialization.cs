using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using App.CrossCutting.IoC;

namespace App.DistributedServices
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(Microsoft.Practices.Unity.IUnityContainer container)
        {
            IDependencyInitializer initializer = new App.ApplicationService.Initialization();
            initializer.RegisterDependencies(container);
        }
    }
}