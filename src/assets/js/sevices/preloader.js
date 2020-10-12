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
        
        console.log(process.env.NODE_ENV)
        const animationPreload = bodymovin.loadAnimation({
            container: document.querySelector('.preloader__container'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: process.env.NODE_ENV == 'development' ? '/assets/js/utils/load.json' : 'http://nova:7888/wp-content/themes/nova/assets/js/utils/load.json', // "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/menu.json",
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