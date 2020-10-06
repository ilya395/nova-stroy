import '../libs/inputmask';

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
                            <input type="checkbox" checked="checked" name="agree" class="agreement__check-box" id="checkThis">
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
        const container = document.querySelector(this.urlContainer);
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

    makeMasksInMyForm () {
        makeMasks();
    }

    async init () {
        // const container = document.querySelector(this.urlContainer);
        await this._buildForm ();
        await this._containerElement().querySelector('form').addEventListener('submit', this._formWorking);
        await this.makeMasksInMyForm ();
    }

    clear () {
        this._containerElement().querySelector('form').removeEventListener('submit', this._formWorking)
    }
}

export { DefaultForm }