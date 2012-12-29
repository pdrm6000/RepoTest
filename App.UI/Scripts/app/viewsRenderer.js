(function ($) {

    var app = $.sammy('#main', function () {
        this.use('Template','html');
      
        this.get('#/', function (context) {
            this.partial('Templates/Index.html');
        });
        
        this.get('#/AlbumConfiguration', function (context) {
            this.partial('Templates/Config.html');
        });
        
        this.get('#/AlbumSelection', function (context) {
            this.partial('Templates/Index.html');
        });
    });

    $(function() {
        app.run('#/');
    });
})(jQuery);

