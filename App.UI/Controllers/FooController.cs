using System.Linq;
using System.Web.Mvc;
using App.Domain.AppServiceContracts;

namespace App.UI.Controllers
{
    public class FooController : Controller
    {
        private readonly IArtistCollectorAppService _artistCollectorAppService;

        public FooController(IArtistCollectorAppService artistCollectorAppService)
        {
            _artistCollectorAppService = artistCollectorAppService;
        }

        //
        // GET: /Foo/

        public ActionResult Index()
        {
            var result = _artistCollectorAppService.GetAll().ToList();
            return View(result);
        }
    }
}
