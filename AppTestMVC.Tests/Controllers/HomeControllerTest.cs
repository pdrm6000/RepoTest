using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AppTestMVC;
using AppTestMVC.Controllers;

namespace AppTestMVC.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Disponer
            HomeController controller = new HomeController();

            // Actuar
            ViewResult result = controller.Index() as ViewResult;

            // Declarar
            ViewDataDictionary viewData = result.ViewData;
            Assert.AreEqual("Testing my first deploy on AppHarbor.com -- Cambio en controller", viewData["Message"]);
        }

        [TestMethod]
        public void About()
        {
            // Disponer
            HomeController controller = new HomeController();

            // Actuar
            ViewResult result = controller.About() as ViewResult;

            // Declarar
            Assert.IsNotNull(result);
        }
    }
}
