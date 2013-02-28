define("requiresammy", ["jquery","/Scripts/lib/sammy.js"], function ($) {
    // Raw jQuery does not return anything, so return it explicitly here.
    return $.sammy;
})