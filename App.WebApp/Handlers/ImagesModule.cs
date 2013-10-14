using System;
using System.IO;
using System.Web;

namespace App.WebApp.Handlers
{
    public class ImagesModule : IHttpModule
    {
        /// <summary>
        /// You will need to configure this module in the Web.config file of your
        /// web and register it with IIS before being able to use it. For more information
        /// see the following link: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpModule Members

        public void Dispose()
        {
            //clean-up code here.
        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += OnRequest;
        }   

        #endregion

        public void OnRequest(Object source, EventArgs e)
        {
            var context = (HttpApplication)source;
            if (context.Request.RawUrl.Contains("/Images/Artist/"))
            {
                context.Response.Clear();
                context.Response.ContentType = "Image/jpeg";
                if (File.Exists(context.Request.PhysicalPath))
                {
                    context.Response.WriteFile(context.Request.PhysicalPath);
                }
                else
                {
                    context.Response.WriteFile(context.Request.PhysicalApplicationPath + "Images\\Artist\\noimage.jpg");
                }
                context.Response.End();
            }
        }
    }
}
