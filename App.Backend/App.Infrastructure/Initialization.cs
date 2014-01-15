using App.CrossCutting.IoC;
using App.Domain.Model;
using App.Repositories.Repositories.Contracts;
using App.Repositories.Repositories.Implementations;

namespace App.Repositories
{
    public class Initialization : IDependencyInitializer
    {
        public void RegisterDependencies(Microsoft.Practices.Unity.IUnityContainer container)
        {
            container.RegisterType(typeof(IAlbumsRepository), typeof(AlbumsRepository), "", null);
            container.RegisterType(typeof(IArtistsRepository), typeof(ArtistRepository), "", null);
            container.RegisterType(typeof(IBaseRepository<Rate>), typeof(RatesRepository), "", null);
            container.RegisterType(typeof(IBaseRepository<Comment>), typeof(CommentsRepository), "", null);
        }
    }
}
