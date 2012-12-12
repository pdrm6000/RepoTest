using App.CrossCutting.IoC;
using App.Domain.RepositoryContracts;
using App.Repositories.Repositories;

namespace App.Repositories
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(Microsoft.Practices.Unity.IUnityContainer container)
        {
            container.RegisterType(typeof(IAlbumsRepository), typeof(AlbumsRepository), "", null);
            container.RegisterType(typeof(IArtistsRepository), typeof(ArtistRepository), "", null);
        }
    }
}
