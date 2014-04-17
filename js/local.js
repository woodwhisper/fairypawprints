var localCode = {
    nav:[{
        name:'Home',
        url:'contentPages/subpage1.html',
        friendlyurl:'home',
        nav:1
    },

    {
        name:'Writing',
        url:'contentPages/subpage2.html',
        friendlyurl:'writing',
        nav:1
    },

    {
        name:'Video',
        url:'contentPages/subpage3.html',
        friendlyurl:'video',
        nav:1
    },

    {
        name:'Web Developement',
        url:'contentPages/subpage4.html',
        friendlyurl:'development',
        nav:1
    },

    {
        name:'Free Reading & Viewing',
        url:'contentPages/freestuff.html',
        friendlyurl:'free',
        nav:1
    },

    {
        name:'Contact Us',
        url:'contentPages/subpage5.html',
        friendlyurl:'contact',
        nav:1
    },
    
    {
        name:'Thank You',
        url:'contentPages/subpage5_1.html',
        nav:0
    }
    ],
    currentNav:0,
     
    init: function(){
        var currentURL = window.location.href;
        var urlParts = currentURL.split('/');
        var subURL = '';
        for (i=4; i < urlParts.length; i++){
            if (urlParts[i] !== ''){
                subURL = subURL + '/' + urlParts[i];
            }
        }
        this.loadPage(this.getPageIdByURI(subURL));
    },

    getPageIdByURI: function(uriPart){
        if (uriPart == ""){
            return 0; // Default empty
        }
        for (i=0; i < this.nav.length; i++ ){
            if (uriPart == '/' + this.nav[i].friendlyurl)
            {
                return i;
            }
        }
        return 0; // Default not found
    },
    
    pageCache:[],
    
    buildNav: function(){
        var navHTML = '';
        var active = '';
        for (i=0; i < this.nav.length; i++ ){
            active = '';
            if (i == this.currentNav){
                active = 'active';   
            }
            if (this.nav[i].nav == 1){
                navHTML = navHTML + '<li class="' + active + '"><a href="' + this.nav[i].friendlyurl+ '" onclick="return localCode.loadPage(\'' + i + '\');" >' + this.nav[i].name + '</a></li>';
            }
        }
        $('#navBar').html(navHTML);
    },
    loadPage: function(pageId){
        if(this.pageCache[pageId] === undefined){
            $('#pageloaderModel').show();
            var localObj = this;
            var url = this.nav[pageId].url; 
            $.ajax({
                url: url
            }).success(function( data ){
                $('#pageloaderModel').hide();
                localObj.currentNav = pageId;
                $('#mainbody').html(data);
                localObj.pageCache[pageId] = data;
                localObj.buildNav();
                history.pushState({id: localObj.nav[pageId].friendlyurl}, '', localObj.nav[pageId].friendlyurl);
            }).error(function(data){
                $('#pageloaderModel').hide();
                $('#errorModel').show();
                setTimeout(function()
                { $('#errorModel').hide(); }
                , 3000);
            });
        } else {
            $('#mainbody').html(this.pageCache[pageId]);
            this.currentNav = pageId;
            this.buildNav();
            history.pushState({id: this.nav[pageId].friendlyurl}, '', this.nav[pageId].friendlyurl);
        }
        return false;
    },
    
    submitContact: function() {
        var formdata = {};
        formdata.name = $('#field0').val();
        formdata.email = $('#field1').val();
        formdata.feedback = $('#field3').val();
        formdata.phone = $('#field2').val();
        
        if ((formdata.name  !== '') && (formdata.email  !== '') && (formdata.feedback  !== '') && (formdata.phone !== '')){
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
    history.pushState = function(fake1, fake2, fake3){}
};

