using System.Web.Mvc;
using AppTest.Metadata;

namespace AppTest.Controllers
{
    public class AlbumsController : Controller
    {
        private readonly IDataCollector _dataCollector;

        public AlbumsController(IDataCollector datacollector)
        {
            _dataCollector = datacollector;
        }

        public ActionResult Index()
        {
            //var result = _dataCollector.GetAlbumRamdon();
            //return View(result);
            return View();
        }

    }
}
