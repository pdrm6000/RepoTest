window.albumApp.reviewAnimator = (function(ko) {

    var BoxOut;
    var BoxIn;
    var CurrentAlbumAnimation;
    var NextAlbumAnimation;
    
    var review = {
        slideOutCurrentAlbum: slideOutCurrentAlbum,
        animationNoPreviousData: animationNoPreviousData,
        animationNoNextData: animationNoNextData,
        setLeftAnimation: setLeftAnimation,
        setRightAnimation: setRightAnimation,
        init : init,
    };
    return review;

    function init() {
        BoxOut = '#AlbumData0';
        BoxIn = '#AlbumData1';
        setLeftAnimation();
    }

    function slideOutCurrentAlbum() {
        var options = { mode: "hide", direction: CurrentAlbumAnimation };
        $(BoxOut).effect('slide', options, 500, slideInNextAlbum);
    }

    function slideInNextAlbum() {
        var options = { direction: NextAlbumAnimation };
        $(BoxIn).effect('slide', options, 500, unlockControls);
        changeBoxes();
    }

    function animationNoPreviousData() {
        $(BoxOut).animate({ "left": "+=40px" }, 150, animationNoPreviousDataStepTwo);
    }

    function animationNoPreviousDataStepTwo() {
        $(BoxOut).animate({ "left": "-=40px" }, 150, unlockControls);
    }

    function animationNoNextData() {
        $(BoxOut).animate({ "left": "-=40px" }, 150, animationNoNextDataStepTwo);
    }

    function animationNoNextDataStepTwo() {
        $(BoxOut).animate({ "left": "+=40px" }, 150, unlockControls);
    }

    function unlockControls() {
        window.albumApp.datacontext.setAreControlsLocked(false);
    }

    function setLeftAnimation() {
        CurrentAlbumAnimation = 'left';
        NextAlbumAnimation = 'right';
    }
    
    function setRightAnimation() {
        CurrentAlbumAnimation = 'right';
        NextAlbumAnimation = 'left';
    }
    
    function changeBoxes() {
        var boxTmp = BoxOut;
        BoxOut = BoxIn;
        BoxIn = boxTmp;
    }
})(ko);