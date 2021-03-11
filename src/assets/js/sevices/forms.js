import '../libs/inputmask';
const AJAX_REQUEST_SUBMIT_FORM = 'ajax_submit_form';
const AJAX_REQUEST_SUBMIT_FILTER = 'ajax_submit_filter';

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
                            <input type="checkbox" name="agree" class="agreement__check-box" id="checkThis" checked="checked">
                            <label for="checkThis" class="agreement__check-box-text">
                                Соласен на обработку <a href="http://novastroyrt.ru/soglasie-na-obrabotku-personalnyh-dannyh/" class="agreement__warn">персональных данных</a>
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
        this.ajaxToken = object.ajaxToken || AJAX_REQUEST_SUBMIT_FORM;
        this.hardMode = object.hardMode || false;
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
        console.log('_moveSuccessMessage start!')
        // const container = document.querySelector(this.urlContainer);
        const successBlock = this._containerElement().querySelector('form .form-block__success');

        if ( successBlock ) {
            function handle() {
                setTimeout(function(){
                    function handle() {
                        successBlock.classList.remove('active');
                        //
                        successBlock.removeEventListener('transitionend', handle);                    
                    }
                    successBlock.addEventListener('transitionend', handle);
                    successBlock.classList.remove('move');
                }, 3000);
                //
                successBlock.removeEventListener('transitionend', handle);
            }
    
            successBlock.addEventListener('transitionend', handle);
            
            successBlock.classList.add('active');
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    successBlock.classList.add('move'); 
                });
            });
        }
    }

    _fetchForm (callback) {
        console.log('yep, we go fetch!'); 
        // M.toast({html: 'Go Request!'});

        // console.log(this);
        const container = this._containerElement() || document.querySelector(this.urlContainer);

        const collectionOfInputs = container.querySelectorAll('input');

        const btn = container.querySelector('button[type="submit"]');

        let validate = true;

        let formData = `action=${this.ajaxToken}`;

        let roomsCount = '';

        const makeStrBigger = (name, value) => {
            let str = `&${name}=${value}`;
            formData += str;
            // validate = true;
        }

        collectionOfInputs.forEach(item => {

            if (item.getAttribute('name') == 'name') {
                if (item.value != '' && item.value.length < 25) {
                    // validate = true;
                    // val = item.value;
                    makeStrBigger(item.getAttribute('name'), item.value);
                } else {
                    validate = false;
                    M.toast({html: 'Введите корректное имя!'});
                }
                return;
            }
            if (item.getAttribute('name') == 'phone') {
                if (item.value != '' && imOkey( item.value ) == true) {
                    // validate = true;
                    // val = item.value;
                    makeStrBigger(item.getAttribute('name'), item.value);
                } else {
                    validate = false;
                    M.toast({html: 'Введите корректное номер!'});
                }
                return;
            }
            if (item.getAttribute('name') == 'agree') {
                if (item.checked == true) {
                    // validate = true;
                    // val = item.checked;
                    makeStrBigger(item.getAttribute('name'), item.checked);
                } else {
                    validate = false;
                    M.toast({html: 'Дайте свое согласие на обработку персональных данных!'});
                };
                return;
            }

            if (item.getAttribute('name') == 'title') {
                // console.log(item.getAttribute('name'), item.value, item.value.indexOf(' ', 0), item.value.length)
                if (item.value.indexOf(' ', 0) != -1 && item.value.indexOf(' ', 0) != 0 && item.value.length < 100 ) {
                    // validate = true;
                    // val = item.checked;
                    makeStrBigger(item.getAttribute('name'), item.value);
                } else {
                    validate = false;
                };
                return;
            }

            if ( item.dataset.object == 'filter-field' ) {
                // console.log(item.getAttribute('type'), item.checked, item.value);
                if ( item.getAttribute('type') == 'checkbox' && item.checked == true ) {
                    // val = item.checked == true ? item.value : false;
                    roomsCount == '' ? roomsCount += item.value : roomsCount += `,${item.value}`;
                } else if ( item.getAttribute('type') == 'checkbox' && item.checked == false )  {
                    // roomsCount == '' ? roomsCount += false : roomsCount += `,${false}`;
                    roomsCount += '';
                }
                if (item.getAttribute('type') == 'number') {
                    makeStrBigger(item.getAttribute('name'), item.value);
                }
                return;
            }

            makeStrBigger(item.getAttribute('name'), item.value);
        });

        if (container.querySelector('form').dataset.object == 'filter-form') {
            const testArray = roomsCount.split(',');
            let test = testArray.reduce((testing, item) => {
                return item == 'false' ? testing += 1 : testing;
            }, 0);
            if (test == 4 || roomsCount == '') {
                const emptyInputs = container.querySelectorAll('[data-object="filter-field"][name="room-check"]');
                let val = '';
                emptyInputs.forEach((item, index) => {
                    index == 0 ? val += `${item.value}` : val += `,${item.value}`;
                });
                roomsCount = val; // 'studio,1,2,3';
            }
    
            makeStrBigger('rooms_count', roomsCount);

            if ( window.wp && window.wp.project_slug ) {
                makeStrBigger('project-slug', window.wp.project_slug);
            }
        }

        const moveSuccessMessage = () => { // на случай потери контекста в sendAjax, обределенной через function, блэт
            return this._moveSuccessMessage();
        }
        
        let sendAjax = (formData, callback) => {

            btn.classList.add('disable');

            fetch(
                // 'http://jsonplaceholder.typicode.com/users', 
                window.wp.ajax_url, // '/wp-admin/admin-ajax.php', // точка входа
                {
                    // method: 'GET',
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

                    return response.json();
                }
            )
            .then(
                response => {
                    // console.log(response)
                    if ( this.hardMode == false ) {
                        M.toast({html: 'Все отлично!'});
                        this._moveSuccessMessage();

                        const dataForMango = {};
    
                        collectionOfInputs.forEach(item => {
                            if ( item.getAttribute('name') == 'name' || item.getAttribute('name') == 'phone' ) {
                                item.value = '';
                            }
                            dataForMango[`${ item.getAttribute('name') == 'phone' ? 'number' : item.getAttribute('name') }`] = item.value;
                        });

                        if ( mgo ) {
                            mgo.postForm(dataForMango);
                        }

                        /////////////// свое событие успешной отправки ///////////////
                        const customSuccessSubmit = new CustomEvent('custom-success-submit', { "bubbles": true }); // Event
                        container.dispatchEvent(customSuccessSubmit);
    
                        return response;
                    } else {
                        if (callback) {
                            console.log('#### hardMode ON!!!111');
   
                            callback(response);
                        }
                    }

                    btn.classList.remove('disable');
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
            // console.log(formData);
            sendAjax(formData, callback);
        } else {
            console.log('no validate', validate);
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

class FilterForm extends DefaultForm {
    constructor (object) {
        super(object);

        // this.urlContainer = object.urlContainer;
        this.ajaxToken = object.ajaxToken || AJAX_REQUEST_SUBMIT_FILTER;

        this.urlReWriteContainer = object.urlReWriteContainer;

        this.invateHtml = (param) => {
            let mod = '';
            if (param == 'big') {
                mod = ' plans-block__sign-up_big';
            }
            return `
                <div class="col s12 m6 plans-block__item">
                    <div class="plans-block__wrap plans-block__sign-up${mod}">
                        <a 
                            href="#" 
                            class="plans-block__link hovered"
                            data-object="excursion"
                            data-title="Запись на экскурсию на странице проекта ..."
                            id="link"
                        >
                            <div class="plans-block__text">
                            <h4 class="text-black uppercase default">
                                    Записаться
                            </h4> 
                            </div>
                            <div class="plans-block__arrow">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                    <path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z">
                                    </path>
                                </svg>                                        
                            </div>
                        </a>
                        <h3 class="text-dark bold default">
                            Приглашаем на экскурсию<br>
                            Такси за наш счет!
                        </h3>
                        <div class="sign-up__image">
                            <img src="/wp-content/themes/nova/assets/images/excurs.png" alt="" class="sign-up__img">
                        </div>
                    </div> 
                </div>           
            `;
        }
        this.planHtml = (obj) => {
            return `
                <div class="col s12 m6 plans-block__item" data-item="${obj.id || ''}">
                    <div class="plans-block__wrap">
                        <a href="${obj.link || '#'}" class="plans-block__link hovered">
                            <div class="plans-block__text">
                            <h4 class="text-black uppercase default">
                                подробнее
                            </h4> 
                            </div>
                            <div class="plans-block__arrow">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                    <path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z">
                                    </path>
                                </svg>                                        
                            </div>
                        </a>
                        <div class="plans-block__preview">
                            <div 
                                class="plans-block__image"
                                style="background-image: url('${obj.planUrl || ''}');"
                            >
                            </div>
                        </div>
                        <div class="plans-block__information row">
                            <div class="col s6">
                                <div class="plans-block__name typography-little-text text-light">
                                    Планировка
                                </div>
                                <div class="plans-block__value">
                                    ${obj.planName || ''}
                                </div>
                            </div>
                            <div class="col s6">
                                <div class="plans-block__name typography-little-text text-light">
                                    Общая площадь, м<sup>2</sup>
                                </div>
                                <div class="plans-block__value">
                                    ${obj.planSquare || ''}
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>           
            `;
        }
        this.bigPlanHtml = (obj) => {
            return `
                <div class="col s12 m6 plans-block__item" data-item="${obj.id || ''}">
                    <div class="plans-block__wrap">
                        <a href="${obj.link || '#'}" class="plans-block__link hovered">
                            <div class="plans-block__text">
                            <h4 class="text-black uppercase default">
                                подробнее
                            </h4> 
                            </div>
                            <div class="plans-block__arrow">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                    <path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z">
                                    </path>
                                </svg>                                        
                            </div>
                        </a>
                        <div class="plans-block__preview">
                            <div 
                                class="plans-block__image"
                                style="background-image: url('${obj.planUrl || ''}');"
                                data-object="flat-plan"
                                data-index="${obj.id || ''}"
                            >
                            </div>
                        </div>

                        <div class="plans-block__fucking-floor">
                            <div class="fucking-floor__title">
                                Этаж
                            </div>
                            <div class="fucking-floor__item">
                                <div 
                                    class="fucking-floor__wrap active"
                                    data-object="choose-floor"
                                    data-floor="1"
                                    data-url="${obj.planUrl || ''}"
                                    data-index="${obj.id || ''}"
                                >
                                    <div class="fucking-floor__number">
                                        1
                                    </div>
                                </div>
                            </div>
                            <div class="fucking-floor__item">
                                <div 
                                    class="fucking-floor__wrap"
                                    data-object="choose-floor"
                                    data-floor="2"
                                    data-url="${obj.upPlanUrl || ''}"
                                    data-index="${obj.id || ''}"
                                >
                                    <div class="fucking-floor__number">
                                        2
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="plans-block__information">
                            <div class="row">
                                <div class="col s6">
                                    <div class="plans-block__name typography-little-text text-light">
                                        Планировка
                                    </div>
                                    <div class="plans-block__value">
                                        ${obj.planName || ''}
                                    </div>
                                </div>
                                <div class="col s6">
                                    <div class="plans-block__name typography-little-text text-light">
                                        Общая площадь, м<sup>2</sup>
                                    </div>
                                    <div class="plans-block__value">
                                        ${obj.planSquare || ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>           
            `;            
        }
        this.localData = null;
        this.count = object.count || 6;
        this.btnForAdd = object.btnForAdd || '[data-object="add-plans"]';
    }

    _link () {
        const target = document.getElementById('link');
        if (window.wp && window.wp.project_slug) {
            target.setAttribute('id', `Запись на экскурсию на странице проекта ${window.wp.project_slug}`);
        }
    }

    _addPlansHandler () {
        console.log(this);
        this._addPlans();
    }

    _removeClickedToAddPlans () {
        const addBtn = document.querySelector(this.btnForAdd);
        addBtn.removeEventListener('click', this._addPlansHandler.bind(this));
        addBtn.classList.add('none');        
    }

    _clickToAddPlans () {
        const addBtn = document.querySelector(this.btnForAdd);
        console.log(addBtn);
        addBtn.classList.remove('none');
        addBtn.addEventListener('click', this._addPlansHandler.bind(this));
    }

    _addPlans () {
        if ( this.localData != null ) {
            const container = document.querySelector(this.urlReWriteContainer);

            const allChildren = container.children;
            let arrayOfChildrenId = [];
            for ( let i = 0; i < allChildren.length; i++ ) {
                arrayOfChildrenId.push( +allChildren[i].dataset.item );
            }

            let count = 0;
            let arrayOfNewObjects = [];
            for (let j of this.localData) {
                if ( !arrayOfChildrenId.includes(j.id) && count <= this.count ) {
                    arrayOfNewObjects.push(j);
                    count += 1;
                }
            }

            let allHtml = '';
            for (let i = 0; i < arrayOfNewObjects.length; i++) {
                const htmlInv = arrayOfNewObjects[i].type == 'big' ? this.bigPlanHtml(arrayOfNewObjects[i]) : this.planHtml(arrayOfNewObjects[i]);
                allHtml += htmlInv;
            }
            container.insertAdjacentHTML('beforeend', allHtml);

            if (allChildren.length - 1 + arrayOfNewObjects.length == this.localData.length) {
                console.log(`текущие: ${allChildren.length} + новые: ${arrayOfNewObjects.length} = все: ${this.localData.length}`);
                this._removeClickedToAddPlans();
            } else {
                console.log(`текущие: ${allChildren.length} + новые: ${arrayOfNewObjects.length} = все: ${this.localData.length}`);
            }
            
        } else {
            console.log('локально данных нет или не сохранены');
        }
    }

    _render (data) {
        
        // console.log(this);
        // console.log(this.urlReWriteContainer)
        const container = document.querySelector(this.urlReWriteContainer);
        console.log(data, container)
        container.innerHTML = '';

        this.localData = null;

        this.localData = data;

        let allHtml = '';

        if ( data.length > 0 && data.length <= this.count ) {
            for (let i = 0; i < data.length; i++) {
                if (i == 1 && i + 1 == data.length || i == 0 && i + 1 == data.length || i == 2) {
                    const htmlInv = data[i].type == 'big' ? this.invateHtml('big') : this.invateHtml();
                    allHtml += htmlInv;
                    const htmlPl = data[i].type == 'big' ? this.bigPlanHtml(data[i]) : this.planHtml(data[i]);
                    allHtml += htmlPl;
                } else {
                    const htmlInv = data[i].type == 'big' ? this.bigPlanHtml(data[i]) : this.planHtml(data[i]);
                    allHtml += htmlInv;
                }
            }
            container.insertAdjacentHTML('beforeend', allHtml);
            this._link();
            this._removeClickedToAddPlans();
        } if ( data.length > 0 && data.length > this.count ) {
            for (let i = 0; i < this.count; i++) {
                if (i == 1 && i + 1 == data.length || i == 0 && i + 1 == data.length || i == 2) {
                    const htmlInv = data[i].type == 'big' ? this.invateHtml('big') : this.invateHtml();
                    allHtml += htmlInv;
                    const htmlPl = data[i].type == 'big' ? this.bigPlanHtml(data[i]) : this.planHtml(data[i]);
                    allHtml += htmlPl;
                } else {
                    const htmlInv = data[i].type == 'big' ? this.bigPlanHtml(data[i]) : this.planHtml(data[i]);
                    allHtml += htmlInv;
                }
                // console.log(i, data[i], allHtml)
            }
            // console.log('#### allHtml: ',allHtml);
            container.insertAdjacentHTML('beforeend', allHtml);
            this._link();   
            this._clickToAddPlans();        
        } else {
            allHtml = `
                <div class="col s12 m6 plans-block__item">
                    <div class="plans-block__wrap">
                        <div class="plans-block__inner-wrap">
                            <h5 class="text-dark default">Нет планировок</h5>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', allHtml);
        }
    }

    _updateData (event) {
        event.preventDefault();
        console.log(this);

        super._fetchForm(this._render.bind(this));
    }

    _clearFilter () {
        const form = document.querySelector(this.urlContainer);
        const collectionOfInputs = form.querySelectorAll('input');
        collectionOfInputs.forEach(item => {
            if ( item.dataset.object == 'filter-field' ) {
                if ( item.getAttribute('type') == 'checkbox' ) {
                    item.checked = false;
                }
                if ( item.getAttribute('type') == 'number' ) {
                    item.value = item.getAttribute('placeholder');
                }
            }            
        });
        this._fetchForm(this._render);    
        
        //
        const addBtn = document.querySelector(this.btnForAdd);
        addBtn.removeEventListener('click', this._addPlansHandler.bind(this));
    }

    initFilter () {
        const container = document.querySelector(this.urlContainer);
        const form = container.querySelector('form[data-object="filter-form"]');
        form.addEventListener('submit', this._updateData.bind(this));

        // const updateDataBtn = container.querySelector('button[data-object="update-data"]');
        // updateDataBtn.addEventListener('click', this._updateData);
        // console.log(updateDataBtn);

        const clearDataBtn = document.querySelector(this.urlContainer).querySelector('button[data-object="clear-filter"]');
        clearDataBtn.addEventListener('click', this._clearFilter.bind(this));

        this._fetchForm(this._render.bind(this));
    }
}

export { DefaultForm, FilterForm, AJAX_REQUEST_SUBMIT_FILTER }