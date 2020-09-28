class Preloader {
    constructor (object) {
        this.urlContainer = object.urlContainer;
    }

    _close () {
        const container = document.querySelector(this.urlContainer);
        const handler = () => {
            document.querySelector('.work-area').classList.remove('hidden');
            container.classList.add('close');
            container.removeEventListener('transitionend', handler);
        }
        container.addEventListener('transitionend', handler);
        container.classList.add('stop');
    }

    init () {
        
        const animationPreload = bodymovin.loadAnimation({
            container: document.querySelector('.preloader__container'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: '/assets/js/utils/load.json', // "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/menu.json",
            rendererSettings: {
                className: 'header-menu__icon-image'
            }
        });
        // let directionMenu = 1;
        // animationMenuBtn.setDirection(directionMenu);
        animationPreload.play();
        const handler = () => {
            this._close ();
            //
            animationPreload.removeEventListener('complete', handler);
        }
        animationPreload.addEventListener('complete', handler);
        // directionMenu = -directionMenu;
    }
}

export { Preloader }