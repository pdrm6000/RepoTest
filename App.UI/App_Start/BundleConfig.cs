using System.Web;
using System.Web.Optimization;

namespace AppTest
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/lib/jquery*"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/lib/jquery-ui-1.9.2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/lib/jquery.unobtrusive*",
                        "~/Scripts/lib/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/lib/bootstrap*"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
                        "~/Scripts/lib/toastr*"));

            bundles.Add(new ScriptBundle("~/bundles/ko").Include(
                        "~/Scripts/lib/knockout*"));

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
            "~/Scripts/lib/sammy.js",
            "~/Scripts/lib/sammy.template.js"));




            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css",
                "~/Content/bootstrap.css",
                "~/Content/toastr.css"));


            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery-ui.css"));
        }
    }
}