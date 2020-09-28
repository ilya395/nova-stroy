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
        this.urlContainer = object.urlContainer;
        this.urlImagesItems = object.urlImagesItems || '[data-object="slider-image"]';
        this.urlTextsItems = object.urlTextsItems || '[data-object="slider-text"]';
        this.urlArrowsItems = object.urlArrowsItems || '[data-object="slider-arrow"]';
        this.urlDotsItems = object.urlDotsItems || '[data-object="slider-dots"]';
    }

    _openNewSlide (number) {
        const imageItems = document.querySelectorAll(this.urlImagesItems) || document.querySelector(this.urlContainer).querySelectorAll(this.urlImagesItems);
        const textItems = document.querySelectorAll(this.urlTextsItems);
        const dots = document.querySelectorAll(this.urlDotsItems);
        let thisIndex = 0;
        //
        imageItems.forEach((item, index) => {
            if ( item.classList.contains('active') ) {
                thisIndex = index;
                const handlImage = () => {
                    item.classList.remove('move_interact', 'active');
                    //
                    item.removeEventListener('transitionend', handlImage);
                    //
                    imageItems[number].classList.add('active');
                    window.requestAnimationFrame(() => {
                        window.requestAnimationFrame(() => {
                            imageItems[number].classList.add('visible', 'move_interact');
                        });
                    });
                }
                item.addEventListener('transitionend', handlImage);
                item.classList.remove('visible');
            }
        });
        //
        const handleText = () => {
            textItems[thisIndex].classList.remove('move_interact', 'active');
            //
            textItems[thisIndex].removeEventListener('transitionend', handleText);
            //
            textItems[number].classList.add('active');
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    textItems[number].classList.add('visible', 'move_interact');
                });
            });
        }
        textItems[thisIndex].addEventListener('transitionend', handleText);
        textItems[thisIndex].classList.remove('visible');
        //
        dots[thisIndex].classList.remove('active');
        //
        

        //
        dots[number].classList.add('active');
    }

    dotsJumpInit () {
        // let dotIndex = 0;
        const handler = (event) => {
            if ( event.target.dataset.object === 'slider-dots' ) {
                // dotIndex = event.target.dataset.index;
                this._openNewSlide(+event.target.dataset.index);
            }
        }
        document.querySelector(this.urlContainer).addEventListener('click', handler);
    }

    arrowsMoveInit () {
        const handler = (event) => {
            
            if ( event.target.dataset.object === 'slider-arrow' ) {
                const direction = event.target.dataset.direction;
                const imageItems = document.querySelectorAll(this.urlImagesItems) || document.querySelector(this.urlContainer).querySelectorAll(this.urlImagesItems);
                let thisIndex = 0;
                imageItems.forEach((item, index) => {
                    if ( item.classList.contains('active') ) {
                        thisIndex = index;
                    }
                });
                let nextItem = direction === 'right' ? thisIndex + 1 : thisIndex - 1;
                if ( nextItem > imageItems.length - 1 ) {
                    nextItem = 0;
                }
                if ( nextItem < 0 ) {
                    nextItem = imageItems.length - 1;
                }
                this._openNewSlide (nextItem);
            }
        }
        document.querySelector(this.urlContainer).addEventListener('click', handler);
    }

}

export { AutoSlider, BigSlider }