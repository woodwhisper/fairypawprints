var wolfcms = angular.module('wolfcms', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });

wolfcms.controller('pageController', ['$scope', '$http', '$sce', '$location',
    function ($scope, $http, $sce, $location) {
        $scope.pageLoad = function (pageLoadId) {
            var url = wolfcms.initialNav.nav[pageLoadId].url;
            var i;
            $http.get(url).success(function (data) {
                $scope.bodyContent = $sce.trustAsHtml(data);
                $scope.nav = wolfcms.initialNav.nav;
                $location.url($scope.nav[pageLoadId].friendlyurl);
                for (i = 0; i < $scope.nav.length; i++) {
                    $scope.nav[i].active = '';
                }
                $scope.nav[pageLoadId].active = 'active';
            });
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
        var loadPage = findLocationId(currentUrl,$scope.nav);

        $scope.pageLoad(loadPage);
    }]);

wolfcms.initialNav = {
    nav: [
        {
            id: 0,
            name: 'Home',
            url: 'contentPages/subpage1.html',
            friendlyurl: 'home',
            nav: 0,
            active: ''
        },

        {
            id: 1,
            name: 'Writing',
            url: 'contentPages/subpage2.html',
            friendlyurl: 'writing',
            nav: 1,
            active: ''
        },

        {
            id: 2,
            name: 'Video',
            url: 'contentPages/subpage3.html',
            friendlyurl: 'video',
            nav: 1,
            active: ''
        },

        {
            id: 3,
            name: 'Web Developement',
            url: 'contentPages/subpage4.html',
            friendlyurl: 'development',
            nav: 1,
            active: ''
        },

        {
            id: 4,
            name: 'Free Reading & Viewing',
            url: 'contentPages/freestuff.html',
            friendlyurl: 'free',
            nav: 1,
            active: ''
        },
        {
            id: 5,
            name: 'Store',
            url: 'contentPages/store.html',
            friendlyurl: 'store',
            nav: 1,
            active: ''
        },
        {
            id: 6,
            name: 'Contact Us',
            url: 'contentPages/subpage5.html',
            friendlyurl: 'contact',
            nav: 1,
            active: ''
        },
        {
            id: 7,
            name: 'Thank You',
            url: 'contentPages/subpage5_1.html',
            nav: 0,
            active: ''
        }
    ]};


var localCode = {

    getPageIdByURI: function (uriPart) {
        if (uriPart == "") {
            return 0; // Default empty
        }
        for (i = 0; i < this.nav.length; i++) {
            if (uriPart == '/' + this.nav[i].friendlyurl) {
                return i;
            }
        }
        return 0; // Default not found
    },


    submitContact: function () {
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
            this.loadPage(6);
        } else {
            $('#contactUsError').show();
        }
    }
}

/**
 * This is to prevent older browsers from dieing when trying to backfil the URL.
 */
if (typeof(history.pushState) == "undefined") {
    history.pushState = function (fake1, fake2, fake3) {
    }
}
;

