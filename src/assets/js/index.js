console.log('Hello, bro! This project work with Webpack!');
import { Preloader } from './sevices/preloader';
//
import 'normalize.css';
// import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../sass/style.scss';
//
// import './libs/lottie_svg.js';
// import './libs/bodymovin';
import { SimpleMenu, MobileMenu } from './sevices/menu';
import { AutoSlider, BigSlider, BigSliderWithTabs, DefaultCarusel, DefCarousel } from './sevices/sliders';
import { MovingHeader, MovingRows } from './sevices/headers';
import { PopUp } from './sevices/modal';
import { DefaultForm } from './sevices/forms';


// work area
const preLoader = new Preloader({
    urlContainer: '.preloader',
});
preLoader.init();

window.addEventListener('load', () => {
    console.log('scripts starting');

    const topMenu = new SimpleMenu({url: 'nav.navigation'});
    topMenu.init();

    const mobMenu = new MobileMenu({
        urlOpenBtn: '[data-object="mob-menu"]', // '.burger-button__wrap',
        urlContainer: '.navigation__menu'
    });
    mobMenu.openingListenerInit();

    if ( document.querySelector('.main-page') ) {

        if ( window.matchMedia('(min-width:728px)').matches ) {
            const autoSlider = new AutoSlider({
                urlItems: '.hello-block .slider-block__container',
                delay: 5
            });
            autoSlider.autoSlidingInit();
        }

        const stocksSlider = new BigSlider({
            urlContainer: '.stocks',
            urlImagesItems: '.stocks .stocks__block-image [data-object="slider-image"]',
            urlTextsItems: '.stocks .block-information__wrap [data-object="slider-text"]',
            urlArrowsItems: '.stocks .block-image__slider-navigation [data-object="slider-arrow"]',
            urlDotsItems: '.stocks .block-image__slider-dots [data-object="slider-dots"]'
        });
        stocksSlider.dotsJumpInit();
        stocksSlider.arrowsMoveInit();

        const urlsHeader = [
            '.stocks .section-move_default',
            '.instagram-card .section-move_default',
            '.all-progects .section-move_default',
            '.map-with-projects .section-move_default',
            '.advantages .section-move_default',
            '.clips-about-projects .section-move_default',// <--
            '.consultation-about-credits .section-move_default',
            '.question-panel .section-move_default',
            '.news .section-move_default',
            '.instagram-gallery .section-move_default'
        ];
        urlsHeader.forEach(item => {
            new MovingHeader({urlHeaders: item}).init();
        });

        const sliderWithTabs = new BigSliderWithTabs({
            urlContainer: '.all-progects',
            urlImagesItems: '.all-progects [data-object="slider-image"]',
            urlTextsItems: '.all-progects [data-object="slider-text"]',
            urlArrowsItems: null, // '.block-image__slider-navigation [data-object="slider-arrow"]',
            urlDotsItems: '.all-progects [data-object="slider-dots"]',
            urlTabsItems: '.all-progects [data-object="tab"]'         
        });
        sliderWithTabs.tabsClickInit();
        if ( window.matchMedia('(max-width:727px)').matches ) {
            sliderWithTabs.dotsJumpInit();
        }

        const rows = [
            '.advantages .move_default'
        ];

        const rowMove = new MovingRows({
            urlRows: rows[0]
        });
        rowMove.init();

        const carousel = new DefCarousel({
            urlContainer: '.news',
            containerForItems: '.news .default-carousel',
            urlItems: '.news .news__one-news',

        });
        carousel.initArrows();
    }

    const callPopUp = (object) => {
        const popUpForForm = new PopUp({
            content: {
                object: DefaultForm,
                data: {
                    urlContainer: '.modal .modal__container',
                    title: object.titleForPopUp,
                    subTitle: object.subTitleForPopUp,
                    formTitle: object.hiddenTitleForPopUp,
                }
            }
        });
        popUpForForm.init();
    }

    const openPopUpHandler = (event) => {

        let titleForPopUp = 'Форма обратной связи';
        let subTitleForPopUp = 'Отправьте ваш номер и мы перезвоним в ближайшее время';
        let hiddenTitleForPopUp = 'Вызов формы обратной связи по умолчанию';

        if ( event.target.dataset.object == 'ipoteka' ) {
            event.preventDefault();
            const target = event.target;

            titleForPopUp = 'Бесплатная консультация по ипотеке';
            subTitleForPopUp = 'Отправьте ваш номер и мы перезвоним в ближайшее время';
            hiddenTitleForPopUp = target.dataset.title;

            callPopUp({
                titleForPopUp,
                subTitleForPopUp,
                hiddenTitleForPopUp
            });

        } else if ( event.target.dataset.object == 'stock' ) {
            event.preventDefault();
            const target = event.target;

            titleForPopUp = 'Наши специалисты расскажут вам об условиях акции подробнее ';
            subTitleForPopUp = 'Просто отправьте ваш номер и мы перезвоним в ближайшее время';
            hiddenTitleForPopUp = target.dataset.title;

            callPopUp({
                titleForPopUp,
                subTitleForPopUp,
                hiddenTitleForPopUp
            });
        }

    }
    window.addEventListener('click', openPopUpHandler);

});

window.addEventListener('click', (event) => {
    console.log(event.target);
});