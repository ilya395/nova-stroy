import '../libs/inputmask';
const AJAX_REQUEST_SUBMIT_FORM = 'ajax_submit_form';

// для форма обратной связи
function imOkey(n) {
    if (n != '' && n != null && n != 'undefined') {
        var numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let str = n.split('');
        var countNumber = 0;
        for(var i = 0; i < str.length; i++) {
            if (str[i] == ' ') {
                continue;
            }
            for(var j = 0; j < numbersArray.length; j++) {
                if (str[i] == numbersArray[j]) {
                    // console.log(str[i], numbersArray[j]);
                    countNumber++;
                };
            };
        };
    
        var goodOrBadValue = false;
        var badNumbers = [
            "+7 (911) 111-11-11", 
            "+7 (922) 222-22-22", 
            "+7 (933) 333-33-33",
            "+7 (944) 444-44-44",
            "+7 (955) 555-55-55",
            "+7 (966) 666-66-66",
            "+7 (977) 777-77-77",
            "+7 (988) 888-88-88",
            "+7 (999) 999-99-99"
            ];
        for( var i = 0; i < badNumbers.length; i++) {
            if (n == badNumbers[i]) {
                goodOrBadValue = true;
            };
        }; 
        
        // console.log(n, typeof n, countNumber, goodOrBadValue);
        if (countNumber == 11 && goodOrBadValue == false) {
            return true;
        } else {
            return false;
        };
    }
};

// инпут для телефона
function makeMasks() {
    if(document.querySelectorAll(".phonemask").length > 0){
        // console.log(document.querySelectorAll(".phonemask").lenght);
        let inputMask = document.querySelectorAll(".phonemask");
        Inputmask.extendDefinitions({
          'f': {"validator": "[9\(\)\.\+/ ]"}
        });
        //
        let im = new Inputmask("+7(f99)999-99-99");
        // 
        for (let i of inputMask) {
            if (typeof i != 'undefined') {
                im.mask(i);
            }
        }
    } else {
        console.log('нету масок на инпутах');
    }    
}

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
                            <input type="tel" id="phone" name="phone" class="form-block__input phone phonemask focused" placeholder="Номер телефона">
                        </div>
                        <div class="main-form__agreement">
                            <input type="checkbox" name="agree" class="agreement__check-box" id="checkThis">
                            <label for="checkThis" class="agreement__check-box-text">
                                Соласен на обработку <a href="#" class="agreement__warn">персональных данных</a>
                            </label>
                        </div>
                        <button type="submit" class="waves-effect waves-light btn custom-buttom hovered">
                            Отправить
                        </button>
                        <div class="form-block__success">
                            <h3 class="text-white default bold">
                                Благодарим за заявку!
                            </h3>
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
        // const container = document.querySelector(this.urlContainer);
        // console.log(this._containerElement(), document.querySelector(this.urlContainer), container, this.urlContainer);
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
        console.log('yep, we go fetch!'); 
        M.toast({html: 'Go Request!'});

        const container = this._containerElement(); // document.querySelector(this.urlContainer);
        const collectionOfInputs = container.querySelectorAll('input');

        let validate = false;

        let formData = `action=${AJAX_REQUEST_SUBMIT_FORM}`;
        collectionOfInputs.forEach(item => {
            if (item.getAttribute('name') == 'name') {
                if (item.value != '' && item.value.length < 25) {
                    validate = true;
                } else {
                    validate = false;
                    M.toast({html: 'Введите корректное имя!'});
                }
            }
            if (item.getAttribute('name') == 'phone') {
                if (item.value != '' && imOkey( item.value ) == true) {
                    validate = true
                } else {
                    validate = false;
                    M.toast({html: 'Введите корректное номер!'});
                }
            }
            if (item.getAttribute('name') == 'agree') {
                if (item.checked == true) {
                    validate = true
                } else {
                    validate = false;
                    M.toast({html: 'Дайте свое согласие на обработку персональных данных!'});
                };
            }

            let str = `&${item.getAttribute('name')}=${item.getAttribute('value')}`;
            formData += str;
        });
        
        let sendAjax = function (formData) {
            // console.log(formData);
            fetch(
                window.wp.ajax_url, // '/wp-admin/admin-ajax.php', // точка входа
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные 
                    },
                    body: formData
                }
            )
            .then(
                response => {
                    // console.log('Сообщение отправлено методом fetch')
                    return response.json()
                }
            )
            .then(
                response => {
                    // console.log(response)
                    M.toast({html: 'Все отлично!'});
                    movieSuccessMessage();
                    const name = collectionOfInputs.find(item => {
                        return item.setAttribute('name') == 'name';
                    });
                    name.value = '';
                    const phone = collectionOfInputs.find(item => {
                        return item.setAttribute('phone') == 'phone';
                    });
                    phone.value = ''
                }
            )
            .catch(
                error => {
                    console.error(error);
                    M.toast({html: 'Упс! Что-то не получилось...'});
                }
            )
        }

        // let formData = `action=${AJAX_REQUEST_SUBMIT_FORM}&name=${name ? name.value : ''}&phone=${phone ? phone.value : ''}&title=${title ? title.value : ''}`;
        
        if (
            validate == true
        ) {
            sendAjax(formData);
        }
    }

    _formWorking (event) {
        event.preventDefault();
        this._fetchForm();
    }

    buidtMyForm () {
        this._buildForm();
    }

    submitForm () {
        this._fetchForm();
    }

    makeMasksInMyForm () {
        makeMasks();
    }

    async init () {
        // const container = document.querySelector(this.urlContainer);
        await this._buildForm ();
        await this._containerElement().querySelector('form').addEventListener('submit', this._formWorking.bind(this));
        await this.makeMasksInMyForm ();
    }

    clear () {
        this._containerElement().querySelector('form').removeEventListener('submit', this._formWorking)
    }

    async initWithoutBildForm () {
        await this._containerElement().querySelector('form').addEventListener('submit', this._formWorking.bind(this));
        await this.makeMasksInMyForm ();
    }
}

export { DefaultForm }