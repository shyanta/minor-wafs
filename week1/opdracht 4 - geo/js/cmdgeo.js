/* 
* Bronnen:
* Dave Bitter (advies)
* https://github.com/pierman1/web-app-from-scratch/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
*/

/***
* cmdaan.js
*   Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
*   zijn tijdens het techniek college in week 5.
*
*   Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
*   Credit: Dive into html5, geo.js, Nicholas C. Zakas
*
*   Copyleft 2012, all wrongs reversed.
*/

//Creats a IIFE.
(function () {
"use strict";
    // Object filled with different variable values, that get used globally within this document
     var globalUsage = {
        sandbox: "SANDBOX",
        lineair: "LINEAIR",
        currentPosition: false,
        currentPositionMarker: false,
        customDebugging: false,
        map: false,
        updateMap: false,
        locationArray: [],
        markerArray: []
     };


    // Event functies - bron: http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/ Copyright (c) 2010 Nicholas C. Zakas. All rights reserved. MIT License
    // Gebruik: ET.addListener('foo', handleEvent); ET.fire('event_name'); ET.removeListener('foo', handleEvent);
    function EventTarget() {
        this._listeners = {};
    }
    EventTarget.prototype = {
            constructor: EventTarget,
            addListener: function(a, c) {
                "undefined" === typeof this._listeners[a] && (this._listeners[a] = []);
                this._listeners[a].push(c);
            },
            fire: function(a) {
                "string" == typeof a && (a = {
                    type: a
                });
                a.target || (a.target = this);
                if(!a.type) throw new Error("Event object missing 'type' property.");
                if(this._listeners[a.type] instanceof Array)
                    for (var c=this._listeners[a.type],b=0,d=c.length;b<d;b++)c[b].call(this,a);
            },
            removeListener:function(a,c){
                if(this._listeners[a]instanceof Array)
                    for(var b=this._listeners[a],d=0,e=b.length;d<e;d++)
                    if(b[d]===c){
                        b.splice(d,1);
                        break;
                    }
            }
        };
    var ET = new EventTarget();



    // POSITION FUNCTION
    var positionRelatedFunctions = {
        /**  Explenation :
            * object containing the map related functions.
            * config has al the map related variables 
            * Int test of the gps is availible, If availible, start startInterval
            * startInterval choses the refreshrate and starts the update_position
            * update_position gets the CurrentPosition, by starting set_position
            * set_position sends the current position (that he got by the check_locations activated by the startInterval)
            * calculate_distance calculates the distence between the spots and makes the circle move.
            * geo_error_handler shows error message where needed.
        */ 

            var config = {
            GPS_AVAILABLE : 'GPS_AVAILABLE',
            GPS_UNAVAILABLE : 'GPS_UNAVAILABLE',
            POSITION_UPDATED : 'POSITION_UPDATED',
            intervalCounter: false,
            interval: false,
            REFRESH_RATE : 1000,
        
        },

        // Test of GPS beschikbaar is (via geo.js) en vuur een event af
            int: function(){
                console.log(int);
                debug_message("Controleer of GPS beschikbaar is...");

                ET.addListener(config.GPS_AVAILABLE, start_interval);
                ET.addListener(config.GPS_UNAVAILABLE, function(){debug_message('GPS is niet beschikbaar.')});

                (geo_position_js.init())?ET.fire(config.GPS_AVAILABLE):ET.fire(config.GPS_UNAVAILABLE);
            },
                 console.log(int());

        // Start een interval welke op basis van REFRESH_RATE de positie updated
            startInterval: function(){
                debug_message("GPS is beschikbaar, vraag positie.");
                update_position();
                interval = self.setInterval(_update_position, config.REFRESH_RATE);
                ET.addListener(config.POSITION_UPDATED, check_locations);
            },
                console.log(startInterval());

        // Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
            updatePosition: function(){
                intervalCounter++;
                geo_position_js.getCurrentPosition(set_position, geo_error_handler, {enableHighAccuracy:true});
            },

        // Callback functie voor het instellen van de huidige positie, vuurt een event af
            setPosition: function(){
                globalUsage.currentPosition = position;
                ET.fire("POSITION_UPDATED");
                debug_message(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
            },
                console.log(setPosition());

        // Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
            check_locations: function(){
                // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
                for (var i = 0; i < locaties.length; i++) {
                    var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

                    if(calculate_distance(locatie, globalUsage.currentPosition)<locaties[i][2]){

                        // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
                        if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
                            // Probeer local storage, als die bestaat incrementeer de locatie
                            try {
                                (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
                            } catch(error) {
                                debug_message("Localstorage kan niet aangesproken worden: "+error);
                            }

            // TODO: Animeer de betreffende marker

                            window.location = locaties[i][1];
                            debug_message("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
                        }
                    }
                }
            },
              console.log(check_locations());  

        // Bereken het verchil in meters tussen twee punten
            calculate_distance: function(){
                var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
                var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
                return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
            },
                console.log(calculate_distance());  

        // FUNCTIES VOOR DEBUGGING
            geo_error_handler: function(){
                debug_message('geo.js error '+code+': '+message);
            },
                console.log(geo_error_handler());  
    }

    // GOOGLE MAPS FUNCTIES
    var googleMapsRelatedFunctions = {


        /**
         * generate_map(myOptions, canvasId)
         *  roept op basis van meegegeven opties de google maps API aan
         *  om een kaart te genereren en plaatst deze in het HTML element
         *  wat aangeduid wordt door het meegegeven id.
         *
         *  @param myOptions:object - een object met in te stellen opties
         *      voor de aanroep van de google maps API, kijk voor een over-
         *      zicht van mogelijke opties op http://
         *  @param canvasID:string - het id van het HTML element waar de
         *      kaart in ge-rendered moet worden, <div> of <canvas>
         */
        generate_map: function(){
        // TODO: Kan ik hier asynchroon nog de google maps api aanroepen? dit scheelt calls
            debug_message("Genereer een Google Maps kaart en toon deze in #"+canvasId)
            map = new google.maps.Map(document.getElementById(canvasId), myOptions);

            var routeList = [];
            // Voeg de markers toe aan de map afhankelijk van het tourtype
            debug_message("Locaties intekenen, tourtype is: "+tourType);
            for (var i = 0; i < locaties.length; i++) {

                // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
                try {
                    (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
                } catch (error) {
                    debug_message("Localstorage kan niet aangesproken worden: "+error);
                }

                var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
                routeList.push(markerLatLng);

                markerRij[i] = {};
                for (var attr in locatieMarker) {
                    markerRij[i][attr] = locatieMarker[attr];
                }
                markerRij[i].scale = locaties[i][2]/3;

                var marker = new google.maps.Marker({
                    position: markerLatLng,
                    map: map,
                    icon: markerRij[i],
                    title: locaties[i][0]
                });
            }
        // TODO: Kleur aanpassen op het huidige punt van de tour
            if(tourType == LINEAIR){
                // Trek lijnen tussen de punten
                debug_message("Route intekenen");
                var route = new google.maps.Polyline({
                    clickable: false,
                    map: map,
                    path: routeList,
                    strokeColor: 'Black',
                    strokeOpacity: 0.6,
                    strokeWeight: 3
                });

            }

            // Voeg de locatie van de persoon door
            globalUsage.currentPositionMarker = new google.maps.Marker({
                position: kaartOpties.center,
                map: map,
                icon: positieMarker,
                title: 'U bevindt zich hier'
            });

            // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
            ET.addListener(POSITION_UPDATED, update_positie);
        },
            console.log(generate_map()); 

        isNumber: function() {
          return !isNaN(parseFloat(n)) && isFinite(n);
        },
            console.log(isNumber()); 

        // Update de positie van de gebruiker op de kaart
        update_positie function(){
            // use currentPosition to center the map
            var newPos = new google.maps.LatLng(globalUsage.currentPosition.coords.latitude, globalUsage.currentPosition.coords.longitude);
            map.setCenter(newPos);
            globalUsage.currentPositionMarker.setPosition(newPos);
        },
            console.log(update_positie()); 
    }

    // DEBUGGING FUNCTIONS
    var debuggingRelatedFunctions = {
        var ifconfig ={
        debugId: false
        },
        
        
        debug_message: function(){
            (ifconfig.customDebugging && ifconfig.debugId)?document.getElementById(ifconfig.debugId).innerHTML:console.log(message);
        },
            console.log(debug_message()); 

        set_custom_debugging: function(){
            ifconfig.debugId = this.debugId;
            ifconfig.globalUsage.customDebugging = true;
        }
            console.log(set_custom_debugging()); 

    }

})();




























