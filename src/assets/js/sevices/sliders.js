import { swips } from './swips';

class AutoSlider {
    constructor (object) {
        this.urlItems = object.urlItems;
        this.delay = object.delay || 6;
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
        this.urlImagesItems = object.urlImagesItems; // || '[data-object="slider-image"]';
        this.urlTextsItems = object.urlTextsItems; // || '[data-object="slider-text"]';
        // this.urlArrowsItems = object.urlArrowsItems || '[data-object="slider-arrow"]';
        this.urlDotsItems = object.urlDotsItems; // || '[data-object="slider-dots"]';
    }

    _openNewSlide (number) {
        // console.log(this)
        const imageItems = document.querySelectorAll(this.urlImagesItems) || document.querySelector(this.urlContainer).querySelectorAll(this.urlImagesItems) || null;
        const textItems = document.querySelectorAll(this.urlTextsItems) || null;
        const dots = document.querySelectorAll(this.urlDotsItems) || null;
        // console.log(imageItems, textItems, dots);
        let thisIndex = 0;
        //
        if (imageItems.length > 0) {
            imageItems.forEach((item, index) => {
                if ( item.classList.contains('active') ) {
                    thisIndex = index;
                }
            }); 
        } else if (textItems && textItems.length > 0) {
            textItems.forEach((item, index) => {
                if ( item.classList.contains('active') ) {
                    thisIndex = index;
                }                
            });
        } else {
            dots.forEach((item, index) => {
                if ( item.classList.contains('active') ) {
                    thisIndex = index;
                }                
            });            
        }
        //
        if ( imageItems.length > 0 ) {
            // imageItems.forEach((item, index) => {
            //     if ( item.classList.contains('active') ) {
            //         thisIndex = index;
            //         const handlImage = () => {
            //             item.classList.remove('move_interact', 'active');
            //             //
            //             item.removeEventListener('transitionend', handlImage);
            //             //
            //             imageItems[number].classList.add('active');
            //             window.requestAnimationFrame(() => {
            //                 window.requestAnimationFrame(() => {
            //                     imageItems[number].classList.add('visible', 'move_interact');
            //                 });
            //             });
            //         }
            //         item.addEventListener('transitionend', handlImage);
            //         item.classList.remove('visible');
            //     }
            // });
            //
            const handlImage = () => {
                imageItems[thisIndex].classList.remove('move_interact', 'active');
                //
                imageItems[thisIndex].removeEventListener('transitionend', handlImage);
                //
                imageItems[number].classList.add('active');
                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                        imageItems[number].classList.add('visible', 'move_interact');
                    });
                });
            }
            imageItems[thisIndex].addEventListener('transitionend', handlImage);
            imageItems[thisIndex].classList.remove('visible');            
        }
        //
        if ( textItems.length > 0 ) {
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
        }
        //

        if ( dots.length > 0 ) {
            // dots[thisIndex].classList.remove('active');
            // dots[number].classList.add('active');

            dots.forEach((item, index) => {
                if ( item.classList.contains('active') ) {
                    item.classList.remove('active');
                }
                if ( index == number ) {
                    item.classList.add('active');
                }
            });
        }
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

    swipsInit () {
        const parent = document.querySelector(this.urlImagesItems).parentElement;
        const imageItems = document.querySelectorAll(this.urlImagesItems) || document.querySelector(this.urlContainer).querySelectorAll(this.urlImagesItems);

        const giveMePlzSliderIndex = (direction) => {
 
            let thisIndex = 0;

            imageItems.forEach((item, index) => {
                if ( item.classList.contains('active') ) {
                    thisIndex = index;
                }
            });

            let nextItem = thisIndex + 1;

            let prevItem = thisIndex - 1;

            if ( nextItem > imageItems.length - 1 ) {
                nextItem = 0;
            }

            if ( prevItem < 0 ) {
                prevItem = imageItems.length - 1;
            }

            // console.log(parent.className, document.querySelector(`.${parent.className}`))
            return direction == 'right' ? nextItem : prevItem;
        }

        const goNext = () => {
            console.log()
            this._openNewSlide( giveMePlzSliderIndex('left') );
        }

        const goPrev = () => {
            this._openNewSlide( giveMePlzSliderIndex('right') );
        }

        const swipeListener = swips({
            container: this.urlContainer, // `.${parent.className}`,
            move: {
                forvard: goNext,
                back: goPrev,
                up: null,
                down: null
            },
            destroy: false,
        });
        swipeListener.init();
    }

}

class BigSliderWithTabs extends BigSlider {
    constructor (object) {
        super(object);
        
        this.urlContainer = object.urlContainer;
        this.urlImagesItems = object.urlImagesItems;
        this.urlTextsItems = object.urlTextsItems;
        // this.urlArrowsItems = object.urlArrowsItems; //
        this.urlDotsItems = object.urlDotsItems;     //
        this.urlTabsItems = object.urlTabsItems;
    }

    tabsClickInit () {
        // console.log(this.urlContainer, this.urlImagesItems, this.urlDotsItems, this.urlArrowsItems, this.urlTabsItems);
        const tabs = document.querySelectorAll(this.urlTabsItems);
        if (tabs.length > 0) {
            const handler = (event) => {
                if ( event.target.dataset.object === 'tab' ) {
                    // dotIndex = event.target.dataset.index;
                    
                    tabs.forEach(item => {
                        // if ( item.classList.contains('active') ) {
                        //     item.classList.remove('active');
                        // }
                        item.dataset.tab == +event.target.dataset.tab ? item.classList.add('active') : item.classList.remove('active');
                    });
                    super._openNewSlide(+event.target.dataset.tab);
                }
            }
            document.querySelector(this.urlContainer).addEventListener('click', handler);
        }
    }
}

class BigSliderWithTabsAndSelect extends BigSliderWithTabs {
    constructor (object) {
        super(object);

        this.urlSelectElement = object.urlSelectElement;
    }

    selectClickInit () {
        const select = document.querySelector(this.urlSelectElement);
        const handler = () => {
            const index = select.selectedIndex; // индекс выбранного options
            const value = select.options[index];

            super._openNewSlide(+index);
        }
        select.addEventListener('change', handler);
    }
}


class DefCarousel {
    constructor (object) {
        this.urlContainer = object.urlContainer;
        this.urlItems = object.urlItems;
        this.containerForItems = object.containerForItems;
        //
        this.sdvig = 0;
        this.notVisibleElements = {
            left: null,
            right: null
        }
    }

    _changeDotInDirection (direction) {
        const allDots = document.querySelector(this.urlContainer).querySelectorAll('[data-object="slider-dots"]');
        let activeDot = 0;
        allDots.forEach((item, index) => {
            if (item.classList.contains('active')) {
                activeDot = index;
                item.classList.remove('active');
            }
            
        });
        let nextDot = 0;
        direction == 'right' ? nextDot = activeDot + 1 : nextDot = activeDot - 1;
        if (nextDot > allDots.length) {
            nextDot = allDots.length - 1;
        }
        if (nextDot < 0) {
            nextDot = 0;
        }
        allDots[nextDot].classList.add('active');        
    }

    _go (direction) {
        const containerForItems = document.querySelector(this.containerForItems);
        const items = containerForItems.querySelectorAll(this.urlItems);

        const activeItemWidth = items[0].offsetWidth;

        const visibleItemsCount = Math.round( containerForItems.offsetWidth/activeItemWidth ); // от 1 до 3

        if (direction == 'left') {
            this.sdvig += activeItemWidth;
            containerForItems.style.transform = `translateX(${this.sdvig}px)`;
            // console.log(`-${activeItemWidth}`);
            this._changeDotInDirection('left');
        } else if (direction == 'right') {
            this.sdvig -= activeItemWidth;
            containerForItems.style.transform = `translateX(${this.sdvig}px)`;
            // console.log(`+${activeItemWidth}`);
            this._changeDotInDirection('right');
        } else {
            console.log('Барин, да не могу я!!!')
        }
    }

    _jump (number) {
        if ( window.matchMedia('(max-width:768px)').matches ) {
            const containerForItems = document.querySelector(this.containerForItems);
            const items = containerForItems.querySelectorAll(this.urlItems);
    
            const activeItemWidth = items[0].offsetWidth;

            const visibleItemsCount = Math.round( containerForItems.offsetWidth/items[0].offsetWidth ); // от 1 до 3
    
            let localSdvig = -activeItemWidth*(number);
            containerForItems.style.transform = `translateX(${localSdvig}px)`;
            this.sdvig = localSdvig;

            // if (this.sdvig == 0) {
            //     this._permissionGoToLeft('no');
            //     this._permissionGoToRight('yes');
            // }
            // if (this.sdvig == +activeItemWidth * +items.length) {
            //     this._permissionGoToLeft('yes');
            //     this._permissionGoToRight('no');
            // }

            const allDots = document.querySelector(this.urlContainer).querySelectorAll('[data-object="slider-dots"]');
            allDots.forEach(item => item.classList.remove('active'));
            allDots[number].classList.add('active');
            if (number == 0) {
                this._permissionGoToLeft('no');
                this._permissionGoToRight('yes');
                this.notVisibleElements.right = items.length - Math.round(containerForItems.offsetWidth/items[0].offsetWidth);
                this.notVisibleElements.left = 0;
            } else if (number == allDots.length - 1) {
                this._permissionGoToLeft('yes');
                this._permissionGoToRight('no');
                this.notVisibleElements.right = 0;
                this.notVisibleElements.left = items.length - Math.round(containerForItems.offsetWidth/items[0].offsetWidth);
            } else {
                this._permissionGoToLeft('yes');
                this._permissionGoToRight('yes');  
                this.notVisibleElements.right = items.length - number;
                this.notVisibleElements.left = number;              
            }
            console.log(this.notVisibleElements.left, this.notVisibleElements.right);
        }
    }

    _permissionGoToLeft (what) {
        const containerForItems = document.querySelector(this.containerForItems);
        
        const items = containerForItems.querySelectorAll(this.urlItems);

        const visibleItemsCount = Math.round( containerForItems.offsetWidth/items[0].offsetWidth ); // от 1 до 3

        const leftArrow = document.querySelector(this.urlContainer).querySelector('[data-direction="left"]')
        if ( what == 'no') {
            leftArrow.classList.add('stop');
            this.notVisibleElements.left = 0;
            this.notVisibleElements.right = items.length - visibleItemsCount;
        } else {
            if ( leftArrow.classList.contains('stop') ) {
                leftArrow.classList.remove('stop');
            }
        }
        console.log(this.notVisibleElements.left, this.notVisibleElements.right);
    }
    _permissionGoToRight (what) {
        const containerForItems = document.querySelector(this.containerForItems);
        
        const items = containerForItems.querySelectorAll(this.urlItems);

        const visibleItemsCount = Math.round( containerForItems.offsetWidth/items[0].offsetWidth ); // от 1 до 3

        const rightArrow = document.querySelector(this.urlContainer).querySelector('[data-direction="right"]')
        if ( what == 'no' ) {
            rightArrow.classList.add('stop');
            this.notVisibleElements.right = 0;
            this.notVisibleElements.left = items.length - visibleItemsCount; 
        } else {
            if ( rightArrow.classList.contains('stop') ) {
                rightArrow.classList.remove('stop');
            }
        }
        console.log(this.notVisibleElements.left, this.notVisibleElements.right);
    }

    // init () {
    //     const containerForItems = document.querySelector(this.containerForItems);

    //     const items = containerForItems.querySelectorAll(this.urlItems);

    //     const visibleItemsCount = containerForItems.offsetWidth/items[0].offsetWidth; // от 1 до 3
        
    //     this.notVisibleElements.left = 0;

    //     this.notVisibleElements.right = items.length - visibleItemsCount;
    // }

    initArrows () {
        const containerForItems = document.querySelector(this.containerForItems);
        
        const items = containerForItems.querySelectorAll(this.urlItems);

        const visibleItemsCount = Math.round( containerForItems.offsetWidth/items[0].offsetWidth ); // от 1 до 3
        
        this.notVisibleElements.left = 0;

        this.notVisibleElements.right = items.length - visibleItemsCount;

        const container = document.querySelectorAll(this.urlContainer);

        const handler = (event) => {
            if (event.target.dataset.object == 'slider-arrow') { // клик по стрелкам
                if ( event.target.dataset.direction == 'right' ) {
                    console.log(this.notVisibleElements.left, this.notVisibleElements.right);
                    this.notVisibleElements.left++;
                    this.notVisibleElements.right--;
                    if ( this.notVisibleElements.left <= ( items.length - visibleItemsCount ) && this.notVisibleElements.right >= 0 ) {
                        this._permissionGoToRight('yes');
                        this._permissionGoToLeft('yes');
                        this._go('right');                       
                    } else {
                        this._permissionGoToRight('no');
                        // this.notVisibleElements.right = 0;
                        this._permissionGoToLeft('yes');
                        // this.notVisibleElements.left = items.length - visibleItemsCount;
                    }
                }
                if ( event.target.dataset.direction == 'left' ) {
                    console.log(this.notVisibleElements.left, this.notVisibleElements.right);
                    this.notVisibleElements.left--;
                    this.notVisibleElements.right++;
                    if ( this.notVisibleElements.left >= 0 && this.notVisibleElements.right <= ( items.length - visibleItemsCount ) ) {
                        this._permissionGoToLeft('yes');
                        this._permissionGoToRight('yes');
                        this._go('left');
                    } else {
                        this._permissionGoToLeft('no');
                        // this.notVisibleElements.left = 0;
                        this._permissionGoToRight('yes');
                        // this.notVisibleElements.right = items.length - visibleItemsCount;
                    }
                    
                }
                console.log(this.notVisibleElements.left, this.notVisibleElements.right);
            }
        }
        container[0].addEventListener('click', handler);
    }
    initDots () {
        const container = document.querySelectorAll(this.urlContainer);
        const handler = (event) => {
            if (event.target.dataset.object == 'slider-dots') {
                this._jump( +event.target.dataset.index );
            }
        }
        container[0].addEventListener('click', handler);        
    }
}

const DefaultCarusel = (object) => {

    const { urlContainer, urlArrows, options } = object;

    const elemsOfMCarousel = document.querySelectorAll(urlContainer);
    const mCarouselInstances = M.Carousel.init(elemsOfMCarousel, options || {});

    const arrows = document.querySelectorAll(urlArrows);

    const methods = {
        init () {
            const handler = (event) => {
                if (event.target.dataset.object == 'slider-arrow') {
                    event.target.dataset.direction == 'right' ? mCarouselInstances.next() : mCarouselInstances.prev()
                }
            }
            elemsOfMCarousel[0].addEventListener('click', handler);
        }
    }

    return methods;
}

export { AutoSlider, BigSlider, BigSliderWithTabs, DefaultCarusel, DefCarousel, BigSliderWithTabsAndSelect }