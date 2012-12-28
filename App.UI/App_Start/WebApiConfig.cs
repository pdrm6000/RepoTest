using System.Web.Http;
using AppTest.Controllers;
using AppTest.Metadata;

namespace AppTest.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MessageHandlers.Add(new SessionIdHandler());
        }
    }
}