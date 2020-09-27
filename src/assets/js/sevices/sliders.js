class AutoSlider {
    constructor (object) {
        this.urlItems = object.urlItems;
        this.delay = object.delay || 5;
    }

    autoSlidingInit () {
        const items = document.querySelectorAll(this.urlItems);
        
        const slideItem = () => {
            // console.log(items);
            let thisActiveItem = 0;
            let nextActiveItem = 0;

            items.forEach((item, index) => {
                if ( item.classList.contains('active') ) {
                    thisActiveItem = index;
                }
            }); 
            nextActiveItem = thisActiveItem + 1;
            
            if ( nextActiveItem >= items.length ) {
                nextActiveItem = 0;
            }
            
            // console.log(items[thisActiveItem], items[nextActiveItem]);
            // items[thisActiveItem].classList.remove('active', 'move_interact');
            // items[nextActiveItem].classList.add('active', 'move_interact');

            const handler = () => {
                items[thisActiveItem].classList.remove('active');
                items[thisActiveItem].classList.remove('move_interact');
                //
                items[nextActiveItem].classList.add('active');
                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                        items[nextActiveItem].classList.add('move_opacity', 'move_interact');
                    });
                });
                //
                items[thisActiveItem].removeEventListener('transitionend', handler);
            }
            items[thisActiveItem].addEventListener('transitionend', handler);
            items[thisActiveItem].classList.remove('move_opacity');

        }

        setInterval(() => {
            slideItem()
        }, this.delay*1000);
    }
}

class BigSlider {
    constructor (object) {
        this.urlImagesItems = object.urlImagesItems;
        this.urlTextsItems = objects.urlTextsItems;
        this.urlArrowsItems = object.urlArrowsItems;
        this.urlDotsItems = object.urlDotsItems;
    }
    // #openNewSlide (number) {

    // }
}

export { AutoSlider }