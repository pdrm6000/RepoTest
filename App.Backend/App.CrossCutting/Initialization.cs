using App.CrossCutting.Authentication;
using App.CrossCutting.IoC;

namespace App.CrossCutting
{
	public class Initialization : IDependencyInitializer
	{
		public void RegisterDependencies(Microsoft.Practices.Unity.IUnityContainer container)
		{
			container.RegisterType(typeof(ITwitterAuthenticationService), typeof(TwitterAuthenticationService), "", null);
		}
	}
}
