class PopUp {
    constructor (object) {
        // this.urlContainer = object.urlContainer;
        this.title = object.title || 'Дефолный заголовок';
        this.subTitle = object.subTitle || 'Дефолтный подзаголовок';
        this.content = object.content;
        this.html = () => {
            return `
                <div class="modal__wrap">
                    <div class="modal__close-btn" data-object="close-btn">
                    </div>
                    <div class="modal__container">
                        <div class="content-loader light">
                            <div class="loader__wrap">
                                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>
                    </div>
                </div>            
            `;
        }
        this.element = null;
        this.initObj = null;
    }

    _pasteModal () {
        const html = this.html();
        this.element = document.createElement('div');
        this.element.classList.add('modal');
        this.element.innerHTML = html;
        document.querySelector('.work-area').append(this.element); 
    }

    _deleteThisModal () {
        this.initObj.clear(); // нужна проверка на существование метода, иначе нельзя передать, например, текст 
        this.element.remove();
        delete this.initObj;
    }

    create () {
        this._pasteModal();
    }

    open () {
        const elemForMovie = document.querySelector('.modal');
        elemForMovie.classList.add('active');
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                elemForMovie.classList.add('movie');
            });
        });
        //
        const body = document.querySelector('body');
        body.classList.contains('hidden')
            ? body.classList.remove('hidden')
            : body.classList.add('hidden');
    }

    close () {
        const elemForMovie = document.querySelector('.modal');
        function handlerCloseModal() {
            elemForMovie.classList.remove('active');
            //
            elemForMovie.removeEventListener('transitionend', handlerCloseModal)
        }
        elemForMovie.addEventListener('transitionend', handlerCloseModal)
        elemForMovie.classList.remove('movie');  
        //
        const body = document.querySelector('body');
        body.classList.contains('hidden')
            ? body.classList.remove('hidden')
            : body.classList.add('hidden');          
    }

    putListenerForClosing () {
        const handler = (event) => {
            if (
                // e.target == document.querySelector('.modal .modal__close-btn')
                event.target.dataset.object == 'close-btn'

            ) {
                this.close();

                document.querySelector('.modal').removeEventListener('click', handler);

                this._deleteThisModal();
            }
        }
        document.querySelector('.modal').addEventListener('click', handler);             
    }

    makeContent () {
        
        const {data, object} = this.content;
        
        const {
            url, 
            ...props
        } = data;

        this.initObj = new object({
            url,
            ...props
        });

        this.initObj.init();
    }

    async init () {
        if (
            document.querySelector('.modal')
        ) {
            await this.open();
            await this.putListenerForClosing();

        } else {
            await this.create();
            await this.open();
            await this.putListenerForClosing();
            await this.makeContent();
        }
    }
}

export { PopUp }