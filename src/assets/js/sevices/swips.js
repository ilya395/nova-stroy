const swips = (object) => {
    const { container, move, destroy } = object;

    let startX,
        startY,
        distanceX, distanceY,
        minInterval = 100, // минимальное расстояние для swipe
        minTimeMovie = 400, // максимальное время прохождения установленного расстояния  
        startTime, // время контакта с поверхностью сенсора
        elapsedTime // время жизнь swipe

    const _destroy = () => {
        const objectForSwipes = document.querySelector(container);

        // свайпы/swipes
        objectForSwipes.removeEventListener('touchstart', _touchStartHadler, false);
        
        objectForSwipes.removeEventListener('touchmove', _touchMoveHandler, false);
        
        objectForSwipes.removeEventListener('touchend', _touchEndHandler, false);
    }

    function _showMustGoOn(  
        distanceX, 
        distanceY
    ){  
        
        if(Math.abs(distanceX) > Math.abs(distanceY)){
            // листай
            if(distanceX > 0){
                // вправо
                // alert('вправо: ' + ' x: ' + distanceX + '; y: ' + distanceY);
                if (move.forvard != null) {
                    move.forvard();
                    if (destroy == true) {
                        _destroy();
                    }
                }
            }else{
                // влево
                // alert('влево: ' + '; x: ' + distanceX + '; y: ' + distanceY);
                if (move.back != null) {
                    move.back();
                    if (destroy == true) {
                        _destroy();
                    }
                }
            }
        }else{
            // скроль
            if(distanceY > 0){
                // вниз
                // alert('вниз: ' + '; x: ' + distanceX + '; y: ' + distanceY);
                if (move.up != null) {
                    move.up();
                    if (destroy == true) {
                        _destroy();
                    }
                }
            }else{
                // вверх
                // alert('вверх: ' + '; x: ' + distanceX + '; y: ' + distanceY);
                if (move.down != null) {
                    move.down();
                    if (destroy == true) {
                        _destroy();
                    }
                }
            }
        }   
        
    }

    const _touchStartHadler = (e) => {
        // console.log('### touchstart');
            
        let touchObject = e.changedTouches[0];
        distanceX = 0;
        distanceY = 0;
        startX = touchObject.pageX
        startY = touchObject.pageY
        startTime = new Date().getTime() // время (точная дата) контакта с поверхностью сенсора
        // e.preventDefault();        
    }

    const _touchMoveHandler = (e) => {
        e.preventDefault() // отключаем стандартную реакцию скроллинга
    }

    const _touchEndHandler = (e) => {
        // console.log('#### touchend');

        let touchObject = e.changedTouches[0];
        distanceX = touchObject.pageX - startX; // получаем пройденную дистанцию
        distanceY = touchObject.pageY - startY;
        elapsedTime = new Date().getTime() - startTime; // узнаем пройденное время
        // проверяем затраченное время,горизонтальное перемещение >= minInterval, и вертикальное перемещение <= 100
        // var swiperightBol = (elapsedTime <= minTimeMovie && dist >= minInterval && Math.abs(touchObject.pageY - startY) <= 100);
        // console.log(elapsedTime, Math.abs(distanceX), distanceX);
        if (
            elapsedTime <= minTimeMovie
            && Math.abs(distanceY) <= 100
            && Math.abs(distanceX) >= minInterval
        ) {
            console.log('#### success swipe');
            _showMustGoOn(distanceX, distanceY);
            e.preventDefault();
        } else {
            console.log('#### unsuccess swipe');
        }
        
    }

    function _run() { // для свайпов

        const objectForSwipes = document.querySelector(container);

        // свайпы/swipes
        objectForSwipes.addEventListener('touchstart', _touchStartHadler, false);
      
        objectForSwipes.addEventListener('touchmove', _touchMoveHandler, false);
      
        objectForSwipes.addEventListener('touchend', _touchEndHandler, false);
    }

    const methods = {
        init () {
            _run();
        },
        destroy () {
            _destroy();
        }
    }

    return methods;
}

export { swips }