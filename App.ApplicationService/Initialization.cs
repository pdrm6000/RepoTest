using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using App.CrossCutting.IoC;
using App.ApplicationService.Services;
using App.Domain.AppServiceContracts;
using App.Domain.DomainServices.Contracts;
using App.Domain.DomainServices.Implementations;

namespace App.ApplicationService
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(Microsoft.Practices.Unity.IUnityContainer container)
        {
            container.RegisterType(typeof(IAlbumsCollectorAppService), typeof(AlbumsCollectorAppService), "", null);
            container.RegisterType(typeof(IAlbumDTOGeneratorService), typeof(AlbumDTOGeneratorService), "", null);
            container.RegisterType(typeof(IRandomAlbumSelector), typeof(RandomAlbumSelector), "", null);

            IDependencyInitializer initializer = new App.Repositories.Initialization();
            initializer.RegisterDependencies(container);
        }
    }
}
