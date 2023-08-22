VanillaTilt.init(document.querySelector(".box-item"), {
            max: 25,
            speed: 400
        });
        
        //It also supports NodeList
        VanillaTilt.init(document.querySelectorAll(".box-item"));


AOS.init();