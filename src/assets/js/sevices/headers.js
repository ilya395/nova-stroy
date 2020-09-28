class MovingHeader {
    constructor (object) {
        this.urlHeaders = object.urlHeaders;
    }

    _foo () {
        // метод который ничего не делает
    }

    _visibleElement (element) {
        const elementPosition = {
            top: window.pageYOffset + element.getBoundingClientRect().top,
            bottom: window.pageYOffset + element.getBoundingClientRect().bottom
        }

        const windowPosition = {
            top: window.pageYOffset,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        }

        if ( elementPosition.top < windowPosition.bottom ) { // верхняя граница элемента < нижней границы окна
            !element.classList.contains('visible', 'section-move_interact') ? element.classList.add('visible', 'section-move_interact') : this._foo ();
            // element.classList.add('visible', 'section-move_interact');
        }
    }

    init () {
        const headers = document.querySelectorAll(this.urlHeaders);
        headers.forEach(item => {
            const handler = () => {
                this._visibleElement(item);
            }
            window.addEventListener('scroll', handler);
        });
    }

}

export { MovingHeader }