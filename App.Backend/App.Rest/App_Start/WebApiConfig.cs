using System.Web.Http;
using App.Rest.Metadata;

namespace App.Rest.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MessageHandlers.Add(new SessionIdHandler());
        }
    }
}