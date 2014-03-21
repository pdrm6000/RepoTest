using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace App.Rest.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			var route1 = routes.MapHttpRoute(
                name: "ActionApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var route2 = routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

			var route3 = routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

			route1.RouteHandler = new MyHttpControllerRouteHandler();
			route2.RouteHandler = new MyHttpControllerRouteHandler();
			route3.RouteHandler = new MyHttpControllerRouteHandler();
        }
    }
}