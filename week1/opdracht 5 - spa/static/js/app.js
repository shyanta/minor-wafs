/*
*Bronnen:
*1. https://developer.mozilla.org/en-US/docs/Web/Events/hashchange
*2. http://www.w3schools.com/jsref/prop_style_display.asp
*3. Timo Verkroost overleg / advies
*/

(function () {
"use strict";

    var location = window.location,
        oldURL = location.href,
        oldHash = location.hash;
    
    
    //object App, with int method.
    var app = {
        init: function () {
            console.log("app");
            routes.init(); // start routes.int
        } 
    };
    
    //Object routes, with int method.
    var routes = {
        init: function () {
            console.log("routes");
            var location = window.location;
            var oldHash = location.hash;
            var newHash = location.hash;
            var defaultHash = "#startScreen"
            if(!oldHash){ //if on index page without hash, old and new hash are defaultHash.
                oldHash = defaultHash;
                newHash = defaultHash;
            }
            
            sections.toggle(newHash, oldHash);
            window.onhashchange = function () {
                newHash = location.hash;
                sections.toggle(newHash, oldHash);
                oldHash = newHash;
            };
        }
    };

    var sections = {
        toggle: function (newRoute, oldRoute) {
                console.log("Old route = "+ oldRoute);
                console.log("New route = "+ newRoute);
                console.log("oldroute is a " +typeof oldRoute);
                
                if(!oldRoute){
                    newRoute = "#startScreen";
                }
            
                if(oldRoute){
                    oldRoute = oldRoute.replace('#','');
                    var hideOldSection = document.getElementById(oldRoute);
                    hideOldSection.classList.remove("active"); 
                }
            
                if(newRoute){
                    newRoute = newRoute.replace('#','');
                    var showNewSection = document.getElementById(newRoute);
                    showNewSection.classList.add("active");
                }

        }
    };

app.init();
    
})();