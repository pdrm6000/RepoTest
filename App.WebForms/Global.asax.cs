using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using App.ApplicationService;
using App.CrossCutting.IoC;
using App.CrossCutting.Provider;
using App.WebForms;
using Microsoft.Practices.Unity;
using WebFormsMvp.Binder;
using WebFormsMvp.Unity;

namespace App.WebForms
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterOpenAuth();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            UnityInstanceProvider.Container = new UnityContainer(); // create container
            IDependencyInitializer initializer = new Initialization(); //create initializer
            initializer.RegisterDependencies(UnityInstanceProvider.Container); //register dependencies
            PresenterBinder.Factory = new UnityPresenterFactory(UnityInstanceProvider.Container);
        }

        void Application_End(object sender, EventArgs e)
        {
            //  Code that runs on application shutdown

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

        }
    }
}
