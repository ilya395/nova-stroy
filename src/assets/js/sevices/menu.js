// const fileJson = require('./menu-V2.json');
// import './menu-V2.json';
// import fileJson from './menu-V2.json';
// import { bodymovin } from 'bodymovin';

// import '../libs/lottie_svg.js';
// import '../libs/lottie_svg.min.js';
// import '../libs/bodymovin';

class MobileMenu {

    constructor (object) {
        this.urlOpenBtn = object.urlOpenBtn;
        this.urlContainer = object.urlContainer;
        this.state = 'close';
        this.activatingButton = () => {
            return document.querySelector(this.urlOpenBtn);
        }
        this.container = () => {
            return document.querySelector(this.urlContainer);
        }
        this.animationMenuBtn = bodymovin.loadAnimation({
            container: this.activatingButton(),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: process.env.NODE_ENV == 'development' ? '/assets/js/utils/menu-V2.json' : 'https://novastroyrt.ru/wp-content/themes/nova/assets/js/utils/menu-V2.json', // "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/menu.json",
            rendererSettings: {
                className: 'header-menu__icon-image'
            }
        });
        this.directionMenu = 1;
    }

    getState () {
        return this.state;
    } 

    open () {
        if (window.matchMedia('(max-width:1140px)').matches) {
            this.container().classList.add('open-mob-menu');
            document.querySelector('.work-area').classList.add('hidden');
            //
            this.animationMenuBtn.setDirection(this.directionMenu);
            this.animationMenuBtn.play();
            this.directionMenu = -this.directionMenu;
            //
            this.state = 'open';
        }
    }

    close () {
        if (window.matchMedia('(max-width:1140px)').matches) {
            this.container().classList.remove('open-mob-menu');
            document.querySelector('.work-area').classList.remove('hidden');
            //
            this.animationMenuBtn.setDirection(this.directionMenu);
            this.animationMenuBtn.play();
            this.directionMenu = -this.directionMenu;
            //
            this.state = 'close';
        }        
    }

    init () {
        // this.animationMenuBtn();
        window.addEventListener('click', (event) => {
            if ( event.target === this.activatingButton() || this.activatingButton().contains(event.target) ) {
                this.state == 'close' ? this.open() : this.close();
            }
        });
    }

    openingListenerInit () {
        if (window.matchMedia('(max-width:1140px)').matches) {
            const activatingButton = document.querySelector(this.urlOpenBtn);
            const container = document.querySelector(this.urlContainer);

            const animationMenuBtn = bodymovin.loadAnimation({
                container: activatingButton,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: process.env.NODE_ENV == 'development' ? '/assets/js/utils/menu-V2.json' : 'https://novastroyrt.ru/wp-content/themes/nova/assets/js/utils/menu-V2.json', // "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/menu.json",
                rendererSettings: {
                    className: 'header-menu__icon-image'
                }
            });

            let directionMenu = 1;
            window.addEventListener('click', (event) => {
                if ( event.target === activatingButton || activatingButton.contains(event.target) ) {
                    container.classList.toggle('open-mob-menu');
                    document.querySelector('.work-area').classList.toggle('hidden');
                    //
                    animationMenuBtn.setDirection(directionMenu);
                    animationMenuBtn.play();
                    directionMenu = -directionMenu;
                }
            });
        }
    }

}

class SimpleMenu {
    constructor(object) {
        this.url = object.url;
    }

    init () {
        const menu = document.querySelector(this.url);

        window.addEventListener('scroll', function() {
              if(pageYOffset > 0){
                  menu.classList.add("filling");
              }else{
                  menu.classList.remove("filling");
              }
            });
    }
}

export { SimpleMenu, MobileMenu };