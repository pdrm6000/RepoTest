define("app/albumsReview.animation", ['jquery', 'jquery-ui-1.9.2.min'],
    function ($, jqueryui) {

        var boxOut;
        var boxIn;
        var currentAlbumAnimation;
        var nextAlbumAnimation;
        var areControlsLocked;

        var anim =
        init = function () {
            boxOut = '#AlbumData0';
            boxIn = '#AlbumData1';
            areControlsLocked = false;
            setLeftAnimation();
        },
        slideOutCurrentAlbum = function () {
            var options = { mode: "hide", direction: currentAlbumAnimation };
            $(boxOut).effect('slide', options, 500, slideInNextAlbum);
        },
        slideInNextAlbum = function () {
            var options = { direction: nextAlbumAnimation };
            $(boxIn).effect('slide', options, 500, unlockControls);
            changeBoxes();
        },
        animationNoPreviousData = function () {
            $(boxOut).animate({ "left": "+=40px" }, 150, animationNoPreviousDataStepTwo);
        },
        animationNoPreviousDataStepTwo = function () {
            $(boxOut).animate({ "left": "-=40px" }, 150, unlockControls);
        },
        animationNoNextData = function () {
            $(boxOut).animate({ "left": "-=40px" }, 150, animationNoNextDataStepTwo);
        },
        animationNoNextDataStepTwo = function () {
            $(boxOut).animate({ "left": "+=40px" }, 150, unlockControls);
        },
        unlockControls = function () {
            setAreControlsLocked(false);
        },
        setLeftAnimation = function () {
            currentAlbumAnimation = 'left';
            nextAlbumAnimation = 'right';
        },
        setRightAnimation = function () {
            currentAlbumAnimation = 'right';
            nextAlbumAnimation = 'left';
        },
        changeBoxes = function () {
            var boxTmp = boxOut;
            boxOut = boxIn;
            boxIn = boxTmp;
        },
        setAreControlsLocked = function (value) {
            areControlsLocked = value;
        },
        getAreControlsLocked = function () {
            return areControlsLocked;
        };

        var review = {
            slideOutCurrentAlbum: slideOutCurrentAlbum,
            animationNoPreviousData: animationNoPreviousData,
            animationNoNextData: animationNoNextData,
            setLeftAnimation: setLeftAnimation,
            setRightAnimation: setRightAnimation,
            init: init,
            setAreControlsLocked: setAreControlsLocked,
            areControlsLocked: getAreControlsLocked
        };
        return review;

    });