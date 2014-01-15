using App.CrossCutting.IoC;
using App.Domain.Model;
using App.DomainServices.BaseTypes;
using App.DomainServices.Services.Contracts;
using App.DomainServices.Services.Implementations;
using Microsoft.Practices.Unity;

namespace App.DomainServices
{
	public class Initialization : IDependencyInitializer
	{
		public void RegisterDependencies(IUnityContainer container)
		{
			container.RegisterType(typeof(IArtistsDomainService), typeof(ArtistsDomainService), "", null);
			container.RegisterType(typeof(IAlbumsDomainService), typeof(AlbumDomainService), "", null);
			container.RegisterType(typeof(IAlbumsSelectionPolicyService), typeof(RandomSelectionPolicyService), "", null);
            container.RegisterType(typeof(ICommentsDomainService), typeof(CommentsDomainService), "", null);
            container.RegisterType(typeof(IRatesDomainService), typeof(RatesDomainService), "", null);
            container.RegisterType(typeof(IRateCalculator), typeof(RateAverageCalculator), "", null);


			var initializer = new Repositories.Initialization();
			initializer.RegisterDependencies(container);
		}
	}
}
