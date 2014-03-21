using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web.SessionState;

namespace App.Rest.App_Start
{
	public class MyHttpControllerHandler : HttpControllerHandler, IRequiresSessionState
	{
		public MyHttpControllerHandler(RouteData routeData)
			: base(routeData)
		{
		}
	}
}