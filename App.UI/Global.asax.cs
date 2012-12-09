using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Microsoft.Practices.Unity;
using App.CrossCutting.Provider;
using App.CrossCutting.IoC;


namespace AppTest
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            UnityInstanceProvider.Container = new UnityContainer(); // create container
            IDependencyInitializer initializer = new Initialization(); //create initializer
            initializer.RegisterDependencies(UnityInstanceProvider.Container); //register dependencies
            Bootstrapper.Initialise(UnityInstanceProvider.Container); // register controller and apicontrollers
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters); 
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}