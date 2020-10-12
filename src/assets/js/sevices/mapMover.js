class MapMover {
    constructor (object) {
        this.urlContainer = object.urlContainer;
        this.urlSelect = object.urlSelect;
        this.urlTabItems = object.urlTabItems;
        this.urlMapContainer = object.urlMapContainer;
        this.zoomValue = object.zoomValue || 13;
    }

    init () {
        var map;
        const mapContainer = document.querySelector(this.urlMapContainer);
        const zoom = this.zoomValue;
        const container = document.querySelector(this.urlContainer);
        const tabItems = document.querySelectorAll(this.urlTabItems);
        const select = document.querySelector(this.urlSelect);

        DG.then(function () {
            map = DG.map(mapContainer, {
                center: [55.899212, 49.326129],
                zoom: zoom
            });

            const pin = DG.icon({
                iconUrl: process.env.NODE_ENV == 'development' ? 'assets/images/logos/pin.svg' : 'http://nova:7888/wp-content/themes/nova/assets/images/logos/pin.svg',
                iconSize: [48, 48],
                // html: '<img src="assets/images/logos/pin.svg">'
            });

            const projects = {
                alley: [55.899212, 49.326129],
                sokurov: [55.618114, 49.398771],
                bereg: [55.621149, 49.143422]
            }
    
            DG.marker(projects.alley,{
                icon: pin
            })
                .addTo(map)
                .bindPopup('ЖК Белая Аллея'); // ба

            DG.marker(projects.sokurov,{
                icon: pin
            })
                .addTo(map)
                .bindPopup('Таун хаус Сокуров'); // сокуров

            DG.marker(projects.bereg,{
                icon: pin
            })
                .addTo(map)
                .bindPopup('ЖК Янтарный Берег'); // яб

            
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
    
                        const name = event.target.dataset.item;
    
                        map.setView(projects[name], zoom);
                    }
                }
                container.addEventListener('click', handler);                
            }
            if (window.matchMedia('(max-width:768px)').matches) {
                const handler = () => {
                    const index = select.selectedIndex; // индекс выбранного options

                    const item = select.options[index];

                    map.setView(projects[item.value], zoom);
                }
                select.addEventListener('change', handler);
            }

        });
    }
}

export { MapMover }