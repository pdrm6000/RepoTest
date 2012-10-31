using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.Unity;

namespace App.CrossCutting.IoC
{
    public interface IDependencyInitializer
    {
        void RegisterDependencies(IUnityContainer container);
    }
}
