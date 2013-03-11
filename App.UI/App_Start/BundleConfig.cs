using System.Web.Optimization;

namespace App.UI.App_Start
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

            bundles.Add(new ScriptBundle("~/bundles/sammy").Include(
            "~/Scripts/lib/sammy.js",
            "~/Scripts/lib/sammy.template.js"));




            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css",
                "~/Content/toastr.css"));


            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery-ui.css"));
        }
    }
}