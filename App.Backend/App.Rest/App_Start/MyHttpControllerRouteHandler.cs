﻿using System.Web;
using System.Web.Http.WebHost;
using System.Web.Routing;

namespace App.Rest.App_Start
{
	public class MyHttpControllerRouteHandler : HttpControllerRouteHandler
	{
		protected override IHttpHandler GetHttpHandler(RequestContext requestContext)
		{
			return new MyHttpControllerHandler(requestContext.RouteData);
		}
	}
}