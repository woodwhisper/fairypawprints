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
            $scope.pageLoad(8);
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


