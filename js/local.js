var wolfcms = angular.module('wolfcms',[]);

wolfcms.controller('pageController', ['$scope', '$http', '$sce', function($scope,$http,$sce){
    $scope.pageLoad = function(pageLoadId){
        var url = wolfcms.initialNav.nav[pageLoadId].url;
        $http.get(url).success(function(data){
            $scope.bodyContent = $sce.trustAsHtml(data);
            $scope.nav = wolfcms.initialNav.nav;
            history.pushState({id:  $scope.nav[pageLoadId].friendlyurl}, '',  $scope.nav[pageLoadId].friendlyurl);
            $scope.nav[pageLoadId].active = 'active';
        });
        return false;
    };
    $scope.pageLoad(1);
}]);

wolfcms.initialNav = {
    nav: [
        {
            name: 'Home',
            url: 'contentPages/subpage1.html',
            friendlyurl: 'home',
            nav: 0,
            active: ''
        },

        {
            name: 'Writing',
            url: 'contentPages/subpage2.html',
            friendlyurl: 'writing',
            nav: 1,
            active: ''
        },

        {
            name: 'Video',
            url: 'contentPages/subpage3.html',
            friendlyurl: 'video',
            nav: 1,
            active: ''
        },

        {
            name: 'Web Developement',
            url: 'contentPages/subpage4.html',
            friendlyurl: 'development',
            nav: 1,
            active: ''
        },

        {
            name: 'Free Reading & Viewing',
            url: 'contentPages/freestuff.html',
            friendlyurl: 'free',
            nav: 1,
            active: ''
        },
        {
            name: 'Store',
            url: 'contentPages/store.html',
            friendlyurl: 'store',
            nav: 1,
            active: ''
        },
        {
            name: 'Contact Us',
            url: 'contentPages/subpage5.html',
            friendlyurl: 'contact',
            nav: 1,
            active: ''
        },
        {
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

    pageCache: [],


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

        return false;
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

