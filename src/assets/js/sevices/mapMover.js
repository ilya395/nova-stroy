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
                // html: `
                //     <div 
                //         class="pin-on-map" 
                //         style="width: 217px;
                //         height: 45px;
                //         border-radius: 27px;
                //         background-color: #ff7f50;
                //         color: #fff;
                //         border: #ff7f50;"
                //     >
                //         <div class="pin-on-map__icon">
                //             <svg width="55px" height="68px" viewBox="0 0 55 68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                //                 <!-- Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch -->
                //                 <title>pin</title>
                //                 <desc>Created with Sketch.</desc>
                //                 <g id="Main" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                //                     <g id="desktop-/-main" transform="translate(-1014.000000, -3169.000000)" fill="#0A2896">
                //                         <g id="006_maps_cmplx" transform="translate(0.000000, 2798.000000)">
                //                             <g id="Group" transform="translate(637.000000, 0.000000)">
                //                                 <path d="M382.038118,414.080636 C382.802461,415.153408 383.642704,416.168814 384.551107,417.119441 L401.4662,437.574694 C403.037157,439.474386 405.963864,439.475167 407.536039,437.576645 L424.654357,416.902077 C425.408643,416.095449 426.114214,415.243553 426.767143,414.350682 L427.117964,413.92649 L427.070821,413.92649 C430.177929,409.501823 432,404.120714 432,398.316858 C432,383.230186 419.687857,371 404.5,371 C389.312182,371 377,383.230186 377,398.316858 C377,404.120714 378.82213,409.501823 381.929139,413.92649 L381.910714,413.92649 L382.038118,414.080636 Z M416.285714,398.316858 C416.285714,404.782563 411.009054,410.024082 404.5,410.024082 C397.990946,410.024082 392.714286,404.782563 392.714286,398.316858 C392.714286,391.851152 397.990946,386.609633 404.5,386.609633 C411.009054,386.609633 416.285714,391.851152 416.285714,398.316858 Z" id="pin"></path>
                //                             </g>
                //                         </g>
                //                     </g>
                //                 </g>
                //             </svg>
                //         </div>
                //         <div class="pin-on-map__name">
                //             11${param}
                //         </div>
                //     </div>
                // `


            //     <svg width="55px" height="68px" viewBox="0 0 55 68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            //     <!-- Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch -->
            //     <title>pin</title>
            //     <desc>Created with Sketch.</desc>
            //     <g id="Main" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            //         <g id="desktop-/-main" transform="translate(-1014.000000, -3169.000000)" fill="#0A2896">
            //             <g id="006_maps_cmplx" transform="translate(0.000000, 2798.000000)">
            //                 <g id="Group" transform="translate(637.000000, 0.000000)">
            //                     <path d="M382.038118,414.080636 C382.802461,415.153408 383.642704,416.168814 384.551107,417.119441 L401.4662,437.574694 C403.037157,439.474386 405.963864,439.475167 407.536039,437.576645 L424.654357,416.902077 C425.408643,416.095449 426.114214,415.243553 426.767143,414.350682 L427.117964,413.92649 L427.070821,413.92649 C430.177929,409.501823 432,404.120714 432,398.316858 C432,383.230186 419.687857,371 404.5,371 C389.312182,371 377,383.230186 377,398.316858 C377,404.120714 378.82213,409.501823 381.929139,413.92649 L381.910714,413.92649 L382.038118,414.080636 Z M416.285714,398.316858 C416.285714,404.782563 411.009054,410.024082 404.5,410.024082 C397.990946,410.024082 392.714286,404.782563 392.714286,398.316858 C392.714286,391.851152 397.990946,386.609633 404.5,386.609633 C411.009054,386.609633 416.285714,391.851152 416.285714,398.316858 Z" id="pin"></path>
            //                 </g>
            //             </g>
            //         </g>
            //     </g>
            // </svg>
            });

            for (let i in data) {
                // DG.marker(getCoordinates(data[i]),{
                //     icon: pin(i)
                // })
                //     .addTo(map)
                    // .bindPopup(projects[i]['name']); // ба 

                const value = (i) => {
                    return `
                    <div 
                        class="pin-on-map" 
                    >
                        <div class="pin-on-map__icon">
                            <img src="${ process.env.NODE_ENV == 'development' ? 'assets/images/logos/pin-white.svg' : 'https://novastroyrt.ru/wp-content/themes/nova/assets/images/logos/pin-white.svg' }">
                        </div>
                        <div class="pin-on-map__name">
                            ${i}
                        </div>
                    </div>
                `;
                }
                    
                const myDivIcon = DG.divIcon({
                    iconSize: [70, 20],
                    html: value(i)
                });
                DG.marker(getCoordinates(data[i]), {
                    icon: myDivIcon
                }).addTo(map);
            }
            
        });
    }
}

export { MapMover, SimpleMap }