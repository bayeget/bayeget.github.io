ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 10,
            controls: []
        }, {
            searchControlProvider: 'yandex#search',
            suppressMapOpenBlock: true
        }),
        emi = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            geoObjectOpenBalloonOnClick: false
        });
        emi1 = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32
        });

    emi.objects.options.set('preset', 'islands#greenDotIcon');
    emi.clusters.options.set('preset', 'islands#greenClusterIcons');
    emi1.objects.options.set('preset', 'islands#blueDotIcon');
    emi1.clusters.options.set('preset', 'islands#blueClusterIcons');

 //получаем json файл
    $.ajax({
        url: "data.json"
    }).done(function(data) {
        emi.add(data);
    });
      
       

    $.ajax({
        url: "data1.json"
    }).done(function(data) {
        emi1.add(data);
    });


    var showEat = document.querySelector('.eat');
    var showProducts = document.querySelector('.products');
    var showPharmacy = document.querySelector('.pharmacy');
    var showFlowers = document.querySelector('.flowers');
    var showClothes = document.querySelector('.clothes');
    var showBeauty = document.querySelector('.beauty');
    var showEntertainment = document.querySelector('.entertainment');

    showEat.onclick = function() {
       myMap.geoObjects.removeAll();
       showEats(emi, myMap);
   };
    showProducts.onclick = function() {
       myMap.geoObjects.removeAll();
       showEats(emi1, myMap);
   };
    showPharmacy.onclick = function() {
       myMap.geoObjects.removeAll();
       showEats(emi3);
   };
    showFlowers.onclick = function() {
       
       init();
   };
    showClothes.onclick = function() {
       
       init();
   };
    showBeauty.onclick = function() {
       
       init();
   };
    showEntertainment.onclick = function() {
       
       init();
   };

};

 function showEats (params, myMap) {
       
       /*  if (otherParams!=params){
            myMap.geoObjects.remove(otherParams);
         }*/
        console.log(params.objects._objectsById);

        var content = document.getElementById('content');
        if (content == null){
            createContent();
        };
        

         var li_titles = document.getElementById('li_titles');
        if (li_titles != null){
            content.removeChild(li_titles);
            
        };
       createListParams(params);

        myMap.geoObjects.add(params);
        // myMap.setBounds(myMap.geoObjects.getBounds());

       

        // Назначаем обработчик событий для коллекции объектов менеджера.   
        params.objects.events.add(['click'], onObjectEvent);

        //Назначаем обработчик событий при наведение на маркеры  и класстыеры.  
        params.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent1);
        params.clusters.events.add(['mouseenter', 'mouseleave'], onClusterEvent);
 
    
        function createListParams(params){

            var object_card = document.getElementById('object_card');
            var lists = params.objects._objectsById;
            var content = document.getElementById('content');
            var titlesDiv = document.createElement('div');

            if (object_card != null){
                content.removeChild(object_card);
            };

            titlesDiv.id="li_titles"
            content.insertBefore(titlesDiv, null);
            

            $.each(lists, function(index, val) {
                var title=val.content.title;
                var titleDiv = document.createElement('div');
                
                
                titleDiv.className="li_title";
                titleDiv.innerHTML=title;
                titlesDiv.insertBefore(titleDiv, null);
                console.log(index + val.content.title);

                

               // var titleDiv = document.querySelector('.li_title');
                titleDiv.onclick = function() {
                    console.log(val);
                    // createBalloon(val);
                        // val.balloon.isOpen();
                        var content = document.querySelector('.title');
                        if (content==null) {
                            createSelectContent(val, params);    
                            }
                        
                        innerSelectContent(val); 

                        myMap.panTo(val.geometry.coordinates, {
                                        delay: 0
                                    });
                };

            });
        };
        function createBalloon(object){
            // Создание независимого экземпляра балуна 
            

            var balloon = new ymaps.Balloon(myMap);
            // if (openBalloon.isOpen()){
                balloon.close();
            // };
            // Здесь родительскими устанавливаются опции карты,
            // где содержатся значения по умолчанию для обязательных опций.
            balloon.options.setParent(myMap.options);
            balloon.setData(object.properties.balloonContent);
            // Открываем балун в центре карты:
            balloon.open(object.geometry.coordinates);
            console.log(balloon.isOpen());
            var openBalloon=balloon;
            
        };

       
        function createContent(){
            
            var body = document.getElementById('body');
            var div = document.createElement('div');
            var exit = document.createElement('div');

            div.id = "content";
            exit.id="exit";
            exit.innerHTML="x"

            body.insertBefore(div, null);
            div.insertBefore(exit, null);

            var useExit = document.getElementById('exit');
            
            useExit.onclick = deleteContent;
            
        };

        function deleteContent() {
                var body = document.getElementById('body');
                var content = document.getElementById('content');
                body.removeChild(content);
            };
    //Функция вызывается нажатием по маркеру
        function onObjectEvent (e) {
            var objectId = e.get('objectId'),
                object = params.objects.getById(objectId);

                                
            myMap.panTo(object.geometry.coordinates, {
                                        delay: 0
                        });

           
           var content = document.querySelector('.title');
            if (content==null) {
                createSelectContent(object, params);    
            }
            
            innerSelectContent(object);             
        };
         
        //создания блока в content по нажатию на маркер 
        function createSelectContent(object, params){
            //проверка блока контент
            var titlesDiv = document.getElementById('li_titles');
             var content = document.getElementById('content');


            if (content == null){
                createContent();

            } else { 
                content.removeChild(titlesDiv);
            };

            var elem = document.querySelector('#content');
            var content = document.createElement('div'),
                title = document.createElement('div'),
                description = document.createElement('div'),
                back = document.createElement('div'),
                image = document.createElement('div'),
                imageSrc = document.createElement('img');

                
            content.id="object_card";
            title.className = "title";
            back.id="button_back";
            back.innerHTML="Назад";
            description.className="description";
            
            
            image.className="contentImage";
            
            elem.insertBefore(content, null);
            content.insertBefore(title, null);
            content.insertBefore(description, null);
            content.insertBefore(image, null);
            image.insertBefore(imageSrc, null);
            content.insertBefore(back, null);

            back.onclick = function() {
                createListParams(params);
            }

        };
        function innerSelectContent(object) {

           
            var title = document.querySelector('.title'),
                description = document.querySelector('.description'),
                imageSrc = document.querySelector('.contentImage img');


                title.innerHTML = object.content.title;
                description.innerHTML = object.content.description;
                imageSrc.src= object.img;

                
        };

        function onObjectEvent1 (e) {
            var objectId = e.get('objectId');
            var objectPreset = params.objects.options._options.preset;
            if (e.get('type') == 'mouseenter') {
                // Метод setObjectOptions позволяет задавать опции объекта "на лету".
               params.objects.setObjectOptions(objectId, {
                    preset: 'islands#yellowIcon'
                });
            } else {
                params.objects.setObjectOptions(objectId, {
                    preset: objectPreset
                });
            }
        }

        function onClusterEvent (e) {
            var objectId = e.get('objectId');
            var clustersPreset = params.clusters.options._options.preset;
            if (e.get('type') == 'mouseenter') {
                params.clusters.setClusterOptions(objectId, {
                    preset: 'islands#yellowClusterIcons'
                });
            } else {
                params.clusters.setClusterOptions(objectId, {
                    preset: clustersPreset
                });
            }
        }  
    };

