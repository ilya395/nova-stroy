class MoreObjects {
    constructor(object) {
        this.container = object.containerDOMUrl;
        this.items = +object.visibleItems;
        this.slug = object.slug;
    }

    _giveMoreBlock() {
        const container = document.querySelector(this.container);

        const items = container.querySelectorAll(`[data-object="${this.slug}"]`);

        const btn = container.querySelector(`[data-object="more-${this.slug}"]`);  

        const arrayAlreadyVisible = [];

        const arrayNotYetVisible = [];
        
        items.forEach(item => {
            item.classList.contains('none') ? arrayNotYetVisible.push(item) : arrayAlreadyVisible.push(item);
        });

        console.log(arrayAlreadyVisible, arrayNotYetVisible)

        if (arrayNotYetVisible.length > this.items) { // после открытия this.items элементов, есть остаток
            for (let i = 0; i < this.items; i++) {
                arrayNotYetVisible[i].classList.remove('none');
            }
        } else { // нет остатка
            arrayNotYetVisible.forEach(item => item.classList.remove('none'));
            btn.classList.add('none');
        }
    }

    init() {
        const container = document.querySelector(this.container);

        const items = container.querySelectorAll(`[data-object="${this.slug}"]`);

        items.forEach((item, index) => {
            if (index + 1 > this.items) {
                item.classList.add('none');
            }
        });

        const btn = container.querySelector(`[data-object="more-${this.slug}"]`);

        btn.addEventListener('click', this._giveMoreBlock.bind(this));

        function handler() {
            btn.removeEventListener('click', this._giveMoreBlock.bind(this));

            window.removeEventListener('unload', handler);

            document.querySelector(`[data-object="more-${this.slug}"]`).removeEventListener('click', this._giveMoreBlock.bind(this));
        }

        window.addEventListener('unload', handler.bind(this));
    }


}

export { MoreObjects }