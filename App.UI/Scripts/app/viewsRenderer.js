(function ($) {

    var app = $.sammy('#main', function () {
        this.use('Template', 'html');
      
        this.get('#/', function (context) {
            this.partial('Templates/Test.html');
        });
        
        this.get('#/AlbumConfiguration', function (context) {
            this.partial('Templates/Config.html');
        });
        
        this.get('#/AlbumSelection', function (context) {
            this.partial('Templates/Index.html')
                .then(Init);
        });
    });

    $(function() {
        app.run('#/');
    });
})(jQuery);

