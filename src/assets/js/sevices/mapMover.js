class MapMover {
    constructor (object) {
        this.urlContainer = object.urlContainer;
        this.urlSelect = object.urlSelect;
        this.urlTabItems = object.urlTabItems;
        this.urlMapContainer = object.urlMapContainer;
        this.zoomValue = object.zoomValue || 7;
    }

    async init () {
        var map;
        const mapContainer = document.querySelector(this.urlMapContainer);
        const zoom = this.zoomValue;
        const container = document.querySelector(this.urlContainer);
        const tabItems = document.querySelectorAll(this.urlTabItems);
        const select = document.querySelector(this.urlSelect);
        const projects = {};

        const asyncFunc = () => {
            if (window.matchMedia('(max-width:768px)').matches) {

                for (let j = 0; j < select.options.length; j++) {

                    const name = select.options[j].dataset.projectName;
                    const latitude = +select.options[j].dataset.latitude;
                    const longitude = +select.options[j].dataset.latitude;

                    projects[name] = {
                        // 'slug-name': item.dataset.item,
                        'coordinates': [latitude, longitude],
                        'name': name
                    };

                    if (select.options[j].selected == true) {
                        projects[name]['default'] = true;
                    } else {
                        projects[name]['default'] = false;
                    }                    
                }
                // console.log(projects);
            }
            if (window.matchMedia('(min-width:768px)').matches) {
                tabItems.forEach(item => {
                    const i = item.dataset.projectName;
                    projects[i] = {
                        // 'slug-name': item.dataset.item,
                        'coordinates': [+item.dataset.latitude, +item.dataset.longitude],
                        'name': i
                    };
                    if (item.classList.contains('active')) {
                        projects[i]['default'] = true;
                    } else {
                        projects[i]['default'] = false;
                    }
                });
            }
        }
        const move = () => {
            DG.then(function () {

                let centerCoordinates = [];
                for (let i in projects) {
                    if (projects[i]['default'] == true) {
                        centerCoordinates = projects[i]['coordinates'];
                    }
                }
                // console.log(centerCoordinates)
                map = DG.map(mapContainer, {
                    center: centerCoordinates,
                    zoom: zoom
                });
    
                const pin = DG.icon({
                    iconUrl: process.env.NODE_ENV == 'development' ? 'assets/images/logos/pin.svg' : 'https://novastroyrt.ru/wp-content/themes/nova/assets/images/logos/pin.svg',
                    iconSize: [48, 48],
                    // html: '<img src="assets/images/logos/pin.svg">'
                });
    
                for (let i in projects) {
                    DG.marker(projects[i]['coordinates'],{
                        icon: pin
                    })
                        .addTo(map)
                        .bindPopup(projects[i]['name']); // ба                
                }
                
                if (window.matchMedia('(min-width:768px)').matches) {
                    const handler = (event) => {
                        event.preventDefault();
                        if ( event.target.dataset.object == 'tab' ) {
                            tabItems.forEach(item => {
                                if (item.classList.contains('active')) {
                                    item.classList.remove('active');
                                }
                            });
        
                            event.target.classList.add('active');
        
                            const slug = event.target.dataset.projectName;
        
                            map.setView(projects[slug]['coordinates'], zoom);
                        }
                    }
                    container.addEventListener('click', handler);                
                }

                if (window.matchMedia('(max-width:768px)').matches) {
                    const handler = () => {
                        const index = select.selectedIndex; // индекс выбранного options
    
                        const item = select.options[index];
    
                        map.setView(projects[item.dataset.projectName].coordinates, zoom);
                    }
                    select.addEventListener('change', handler);
                }
    
            });
        }

        await asyncFunc();

        await move();
    }
}

class SimpleMap {
    constructor(object) {
        this.container = object.containerDOMUrl;
        this.data = object.data;
        this.zoom = object.zoomValue || 9;
    }

    init() {
        let map = '';
        const mapContainer = document.querySelector(this.container);
        const zoom = this.zoom;
        const data = this.data;

        DG.then(function () {

            function getCoordinates(string) {
                const value = string.split(',');

                return [+value[0], +value[1]]
            }

            let centerCoordinates = [];

            let count = 0;

            for (let i in data) {
                if (count == 0) {
                    centerCoordinates = getCoordinates(data[i]);
                }
                count += 1; 
            }

            map = DG.map(mapContainer, {
                center: centerCoordinates,
                zoom: zoom
            });

            const pin = (param) => DG.icon({
                // iconUrl: process.env.NODE_ENV == 'development' ? 'assets/images/logos/pin.svg' : 'https://novastroyrt.ru/wp-content/themes/nova/assets/images/logos/pin.svg',
                iconSize: [48, 48],
                html: '<b style="color:blue;">HTML-код</b>'
            });

            for (let i in data) {

                const value = (i) => {
                    return `
                        <div 
                            clas="pin-on-map"
                            style="width: 250px;
                            height: 40px;
                            pointer-events: none;
                            transform: translateY(-10px)"
                        >
                            <div 
                                class="pin-on-map__wrap"
                                style="background-color: #ff7f50;
                                color: #fff;
                                display: inline-flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 5px 10px;
                                border-radius: 27px;"
                            >
                                <div 
                                    class="pin-on-map__icon"
                                    style="width: 26px;height: 21px;"
                                >
                                    <img style="width: auto;height: 100%;" src="${ process.env.NODE_ENV == 'development' ? 'assets/images/logos/pin-white.svg' : 'https://novastroyrt.ru/wp-content/themes/nova/assets/images/logos/pin-white.svg' }">
                                </div>
                                <div 
                                    class="pin-on-map__name"
                                    style="        font-family: Montserrat;
                                    font-size: 16px;
                                    font-weight: bold;
                                    font-stretch: normal;
                                    font-style: normal;
                                    line-height: 1.75;
                                    letter-spacing: normal;
                                    color: #ffffff;
                                    height: 100%;"
                                >
                                    ${i}
                                </div>
                            </div>
                        </div>
                    `
                }
                    
                const myDivIcon = DG.divIcon({
                    iconSize: [70, 20],
                    html: value(i)
                });
                DG.marker(getCoordinates(data[i]), {
                    icon: myDivIcon
                })
                    .addTo(map)
                    .bindPopup(i);

                const defaultActiveZones = document.querySelectorAll('.leaflet-marker-icon.leaflet-div-icon');
                defaultActiveZones.forEach(item => {
                    item.style.width = '190px';
                    item.style.height = '40px';
                });
            }
            
        });
    }
}

export { MapMover, SimpleMap }