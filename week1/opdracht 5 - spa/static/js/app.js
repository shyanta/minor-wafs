//1.
//Maak in je JavaScript bestand onderstaande objecten met methods en parameters aan:
//app.init()
//routes.init()
//sections.toggle(route)
//Er zijn dus drie objecten, ieder met één methode

//2.
//Omsluit je code met een IIFE en zorg ervoor dat de code in strict mode wordt uitgevoerd

(function () {
    "use strict";
    
    
//4.1 
//    Roep vanuit app.init() routes.init() aan.

    
    var app = {
        init: function () {}
    }


    
    
//4.2
//    In routes.init() zet je een ‘hashchange’ eventlistener.
//    De eventlistener verwijst naar sections.toggle(route) met de route die je hebt aangeklikt als parameter.
//    Let op de scope!  
    var routes {
        init: function (sections, window) {}
    }


    
    
    
//5.  
//    In de toggle functie zorg je ervoor dat de gewenste sectie wordt getoond en alle andere secties (in dit geval één) worden verborgen	
    var sections {
        toggle: function () {}
    }
    
    
//3.   
//Roep onderaan de code (maar wel in de IIFE) app.init() aan om de applicatie te starten
app.init(routes, sections, window);
    
})();