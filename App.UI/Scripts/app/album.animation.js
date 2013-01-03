window.albumApp.reviewAnimator = (function() {

    var boxOut;
    var boxIn;
    var currentAlbumAnimation;
    var nextAlbumAnimation;


    init = function() {
        boxOut = '#AlbumData0';
        boxIn = '#AlbumData1';
        setLeftAnimation();
    },
    slideOutCurrentAlbum = function() {
        var options = { mode: "hide", direction: currentAlbumAnimation };
        $(boxOut).effect('slide', options, 500, slideInNextAlbum);
    },
    slideInNextAlbum = function() {
        var options = { direction: nextAlbumAnimation };
        $(boxIn).effect('slide', options, 500, unlockControls);
        changeBoxes();
    },
    animationNoPreviousData = function() {
        $(boxOut).animate({ "left": "+=40px" }, 150, animationNoPreviousDataStepTwo);
    },
    animationNoPreviousDataStepTwo = function() {
        $(boxOut).animate({ "left": "-=40px" }, 150, unlockControls);
    },
    animationNoNextData = function() {
        $(boxOut).animate({ "left": "-=40px" }, 150, animationNoNextDataStepTwo);
    },
    animationNoNextDataStepTwo = function() {
        $(boxOut).animate({ "left": "+=40px" }, 150, unlockControls);
    },
    unlockControls = function() {
        window.albumApp.albumViewModel.setAreControlsLocked(false);
    },
    setLeftAnimation = function() {
        currentAlbumAnimation = 'left';
        nextAlbumAnimation = 'right';
    },
    setRightAnimation = function() {
        currentAlbumAnimation = 'right';
        nextAlbumAnimation = 'left';
    },
    changeBoxes = function() {
        var boxTmp = boxOut;
        boxOut = boxIn;
        boxIn = boxTmp;
    };
    
    var review = {
        slideOutCurrentAlbum: slideOutCurrentAlbum,
        animationNoPreviousData: animationNoPreviousData,
        animationNoNextData: animationNoNextData,
        setLeftAnimation: setLeftAnimation,
        setRightAnimation: setRightAnimation,
        init: init,
    };
    return review;
    
})();