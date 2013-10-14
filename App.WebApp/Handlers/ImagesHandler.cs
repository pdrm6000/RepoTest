using System;
using System.IO;
using System.Web;

namespace App.WebApp.Handlers
{
    public class ImagesHandler : IHttpHandler
    {
        /// <summary>
        /// You will need to configure this handler in the Web.config file of your 
        /// web and register it with IIS before being able to use it. For more information
        /// see the following link: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members

        public bool IsReusable
        {
            // Return false in case your Managed Handler cannot be reused for another request.
            // Usually this would be false in case you have some state information preserved per request.
            get { return true; }
        }


        public void Init(HttpApplication context)
        {
            context.BeginRequest += ContextBeginRequest;
        }

        private void ContextBeginRequest(object sender, EventArgs e)
        {
            var context = (HttpApplication)sender;

            // this is the file in question
            string requestPhysicalPath = context.Request.PhysicalPath;

            if (File.Exists(requestPhysicalPath))
            {
                Console.WriteLine("ops !");
            }
        }

        public void ProcessRequest(HttpContext context)
        {
            //write your handler implementation here.
            Console.WriteLine("hey dude !");

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

        #endregion
    }
}
