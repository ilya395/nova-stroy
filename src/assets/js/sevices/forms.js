class DefaultForm {
    constructor (object) {
        this.urlContainer = object.urlContainer;
        this.title = object.title;
        this.subTitle = object.subTitle;
        this.hiddenTitle = object.hiddenTitle;
        this.html = (obj) => {
            return `
                <div class="form-block">
                    <h3 class="form-block__title text-dark default bold">
                        ${ obj.title }
                    </h3>
                    <p class="form-block__sub-title typography-simple-text text-dark">
                        ${ obj.subTitle }
                    </p>
                    <form class="form-block__content">
                        <input type="hidden" name="title">
                        <div class="form-block__field">
                            <label for="name" class="form-block__label">
                                Ваше имя
                            </label>
                            <input type="text" id="name" name="name" class="form-block__input name">
                        </div>
                        <div class="form-block__field">
                            <label for="phone" class="form-block__label">
                                Ваш телефон
                            </label>
                            <input type="tel" id="phone" name="phone" class="form-block__input phone phonemask">
                        </div>
                        <a href="#" class="modal-content__warning">
                            Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь c политикой конфиденциальности
                        </a>
                        <button class="form-block__button simple-button simple-button_for-form">
                            Отправить
                        </button>
                        <div class="form-block__messages">
                            <div class="form-block__success">
                                <span>
                                    Благодарим за заявку!
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            `;
        }
    }

    _containerElement () {
        return document.querySelector(this.urlContainer);
    }

    _buildForm () {
        const container = document.querySelector(this.urlContainer);
        console.log(this._containerElement(), document.querySelector(this.urlContainer), container, this.urlContainer);
        this._containerElement().innerHTML = '';
        const html = this.html({
            title: this.title,
            subTitle: this.subTitle
        });
        this._containerElement().innerHTML = html;
        this._containerElement().querySelector('form input[name="title"]').value = this.hiddenTitle;
    }

    _moveSuccessMessage () {
        // const container = document.querySelector(this.urlContainer);
        const successBlock = this._containerElement().querySelector('form .form-block__success');
        
        function handle() {
            setTimeout(function(){
                function handle() {
                    successBlock.classList.remove('active');
                    //
                    successBlock.removeEventListener('transitionend', handle);                    
                }
                successBlock.addEventListener('transitionend', handle);
                successBlock.classList.remove('movie');
            }, 3000);
            //
            successBlock.removeEventListener('transitionend', handle);
        }

        successBlock.addEventListener('transitionend', handle);
        
        successBlock.classList.add('active');
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                successBlock.classList.add('movie'); 
            });
        });
    }

    _fetchForm () {
        console.log('yep, we go fetch!')
    }

    _formWorking (event) {
        event.preventDefault();
        _fetchForm ();
    }

    buidtMyForm () {
        _buildForm();
    }

    submitForm () {
        _fetchForm ();
    }

    async init () {
        // const container = document.querySelector(this.urlContainer);
        await this._buildForm ();
        await this._containerElement().querySelector('form').addEventListener('submit', this._formWorking)
    }

    clear () {
        this._containerElement().querySelector('form').removeEventListener('submit', this._formWorking)
    }
}

export { DefaultForm }