((Utils) => {

    const App = {
        htmlElemets: {
            containerCards: document.querySelector('#containerCards'),
            form: document.querySelector('#form'),
            inputNum: document.querySelector('#inputNum'),
            divException: document.querySelector('#exception'),
        },
        init: () => {
            App.htmlElemets.form.addEventListener('submit', App.handlers.onFormSubmit);
            App.htmlElemets.containerCards.addEventListener('click', App.handlers.onChildClick);
        },
        utils: {
            ...Utils.methods,
        },
        handlers: {
            onChildClick: (e) => {

                const child = e.target

                if (child.parentNode.parentNode.className === 'card') App.htmlElemets.containerCards.removeChild(child.parentNode.parentNode);

            },
            onFormSubmit: (e) => {

                e.preventDefault();
                App.htmlElemets.divException.innerHTML = '';


                let num = App.htmlElemets.inputNum.value;

                if (num <= 1) {

                    App.htmlElemets.divException.innerHTML = `<small class = "err">El número debe ser mayor a uno</small>`;
                } else {

                    App.htmlElemets.divException.innerHTML = '';

                    let stack = [];

                    for (let i = 0; i < num; i++) {

                        stack.push(App.utils.fibonacci(i, stack))
                    }

                    App.htmlElemets.containerCards.innerHTML = App.utils.templateStr(stack);
                }
            }
        }
    };

    App.init();

})(document.Utils);