using System.Web;
using System.Web.Optimization;

namespace AppTest
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/jquery*"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-1.9.2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/app/bootstrap*"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
                        "~/Scripts/toastr*"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/app/home.viewmodel.js",
                "~/Scripts/app/viewsRenderer.js",
                "~/Scripts/app/styles.js",
                "~/Scripts/app/datacontext.js",
                "~/Scripts/app/albumreview.binding.js",
                "~/Scripts/app/albumreview.model.js",
                "~/Scripts/app/albumreview.animation.js",
                "~/Scripts/app/albumreview.viewmodel.js",
                "~/Scripts/app/artist.model.js",
                "~/Scripts/app/artist.viewmodel.js",
                "~/Scripts/app/artist.albums.model.js",
                "~/Scripts/app/artist.albums.viewmodel.js"));

            bundles.Add(new ScriptBundle("~/bundles/sammy").Include(
            "~/Scripts/sammy.js",
            "~/Scripts/sammy.template.js"));




            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css",
                "~/Content/bootstrap.css",
                "~/Content/toastr.css"));


            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery-ui.css"));
        }
    }
}