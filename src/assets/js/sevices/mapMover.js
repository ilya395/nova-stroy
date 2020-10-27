class MapMover {
    constructor (object) {
        this.urlContainer = object.urlContainer;
        this.urlSelect = object.urlSelect;
        this.urlTabItems = object.urlTabItems;
        this.urlMapContainer = object.urlMapContainer;
        this.zoomValue = object.zoomValue || 13;
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
                console.log(projects);
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
                console.log(centerCoordinates)
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

export { MapMover }