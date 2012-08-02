using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppTestMVC.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewData["Message"] = "Testing my first deploy on AppHarbor.com -- Cambio en controller";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
