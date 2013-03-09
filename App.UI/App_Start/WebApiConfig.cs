using System.Web.Http;
using App.UI.Metadata;

namespace App.UI.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MessageHandlers.Add(new SessionIdHandler());
        }
    }
}