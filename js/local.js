var wolfcms = angular.module('wolfcms', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });

wolfcms.controller('pageController', ['$scope', '$http', '$sce', '$location',
    function ($scope, $http, $sce, $location, $compile) {
        $scope.pageLoad = function (pageLoadId) {
            var url = wolfcms.initialNav.nav[pageLoadId].url;
            var i;
            $scope.contentUrl = url;

            $scope.nav = wolfcms.initialNav.nav;
            $location.url($scope.nav[pageLoadId].friendlyurl);
            for (i = 0; i < $scope.nav.length; i++) {
                $scope.nav[i].active = '';
            }
            $scope.nav[pageLoadId].active = 'active';
            $scope.title = $scope.nav[pageLoadId].title;
            $scope.description = $scope.nav[pageLoadId].description;

            ga('send', 'pageview', {page:url});
        };

        /**
         * Location determined and loaded.
         */


        var findLocationId = function (uriPart, navStructure) {
            navStructure = wolfcms.initialNav.nav;
            if (uriPart == "") {
                return 0; // Default empty
            }
            for (i = 0; i < navStructure.length; i++) {
                if (uriPart == '/' + navStructure[i].friendlyurl) {
                    return i;
                }
            }
            return 0; // Default not found
        };

        var currentUrl = $location.url();
        var loadPage = findLocationId(currentUrl, $scope.nav);

        $scope.pageLoad(loadPage);
    }]);


wolfcms.controller('contactusform', ['$scope', function ($scope) {
    $scope.submitContact = function () {
        var formdata = {};
        formdata.name = $('#field0').val();
        formdata.email = $('#field1').val();
        formdata.feedback = $('#field3').val();
        formdata.phone = $('#field2').val();

        if ((formdata.name !== '') && (formdata.email !== '') && (formdata.feedback !== '') && (formdata.phone !== '')) {
            $.ajax({
                type: 'POST',
                url: 'cms/feedback/store',
                data: formdata
            });
            $scope.pageLoad(7);
        } else {
            $('#contactUsError').show();
        }
    }
}]);

wolfcms.controller('comingSoon', ['$scope', function ($scope){
    $scope.comingSoon = function(){
        $('#comingSoon').show();
    }
    $scope.comingSoonClose = function(){
        $('#comingSoon').hide();
    }

}]);
wolfcms.initialNav = {
    nav: [
        {
            id: 0,
            name: 'Home',
            url: 'contentPages/subpage1.html',
            friendlyurl: 'home',
            nav: 1,
            active: '',
            title: 'Fairy Paw Prints - Welcome',
            description: "The business website of editor Alex Chevallier and Programmer Neale Wolfson."
        },

        {
            id: 1,
            name: 'Writing',
            url: 'contentPages/subpage2.html',
            friendlyurl: 'writing',
            nav: 1,
            active: '',
            title: 'Fairy Paw Prints - Writing',
            description: "The writings of Alex Chevallier"
        },

        {
            id: 2,
            name: 'Video',
            url: 'contentPages/subpage3.html',
            friendlyurl: 'video',
            nav: 1,
            active: '',
            title: 'Fairy Paw Prints - Videos',
            description: "The videos of Alex Chevallier"
        },

        {
            id: 3,
            name: 'Web Development',
            url: 'contentPages/subpage4.html',
            friendlyurl: 'development',
            nav: 1,
            active: '',
            title: 'Fairy Paw Prints - Web Development',
            description: "The web programming by Neale Wolfson"
        },

        {
            id: 4,
            name: 'Free Reading & Viewing',
            url: 'contentPages/freestuff.html',
            friendlyurl: 'free',
            nav: 1,
            active: '',
            title: 'Fairy Paw Prints - Free Stuff',
            description: "Free stuff to enjoy by Fairy Paw Prints"
        },
        {
            id: 5,
            name: 'Store',
            url: 'contentPages/store.html',
            friendlyurl: 'store',
            nav: 1,
            active: '',
            title: 'Fairy Paw Prints - Store',
            description: "Buy stuff from Fairy Paw Prints"
        },
        {
            id: 6,
            name: 'Contact Us',
            url: 'contentPages/subpage5.html',
            friendlyurl: 'contact',
            nav: 1,
            active: '',
            title: 'Fairy Paw Prints - Contact Us',
            description: "Contact Fairy Paw Prints"
        },
        {
            id: 7,
            name: 'Thank You',
            url: 'contentPages/subpage5_1.html',
            nav: 0,
            active: '',
            title: 'Fairy Paw Prints - Thank You'
        }
    ]};

/**
 * This is to prevent older browsers from dieing when trying to backfil the URL.
 */
if (typeof(history.pushState) == "undefined") {
    history.pushState = function (fake1, fake2, fake3) {
    }
}

var _gaq=[["_setAccount","UA-50463348-1"],["_trackPageview"]];

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-50463348-1', 'fairypawprints.com');
ga('send', 'pageview');


