window.albumApp.reviewAnimator = (function() {

    var boxOut;
    var boxIn;
    var currentAlbumAnimation;
    var nextAlbumAnimation;
    
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
        boxOut = '#AlbumData0';
        boxIn = '#AlbumData1';
        setLeftAnimation();
    }

    function slideOutCurrentAlbum() {
        var options = { mode: "hide", direction: currentAlbumAnimation };
        $(boxOut).effect('slide', options, 500, slideInNextAlbum);
    }

    function slideInNextAlbum() {
        var options = { direction: nextAlbumAnimation };
        $(boxIn).effect('slide', options, 500, unlockControls);
        changeBoxes();
    }

    function animationNoPreviousData() {
        $(boxOut).animate({ "left": "+=40px" }, 150, animationNoPreviousDataStepTwo);
    }

    function animationNoPreviousDataStepTwo() {
        $(boxOut).animate({ "left": "-=40px" }, 150, unlockControls);
    }

    function animationNoNextData() {
        $(boxOut).animate({ "left": "-=40px" }, 150, animationNoNextDataStepTwo);
    }

    function animationNoNextDataStepTwo() {
        $(boxOut).animate({ "left": "+=40px" }, 150, unlockControls);
    }

    function unlockControls() {
        window.albumApp.albumViewModel.setAreControlsLocked(false);
    }

    function setLeftAnimation() {
        currentAlbumAnimation = 'left';
        nextAlbumAnimation = 'right';
    }
    
    function setRightAnimation() {
        currentAlbumAnimation = 'right';
        nextAlbumAnimation = 'left';
    }
    
    function changeBoxes() {
        var boxTmp = boxOut;
        boxOut = boxIn;
        boxIn = boxTmp;
    }
})();