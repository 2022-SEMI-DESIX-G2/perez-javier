(() => {

    'use strict';

    //Global Vars

    // Divs or Elements HTML
    const containerCards = document.querySelector('#containerCards'),
        form = document.querySelector('#form'),
        inputNum = document.querySelector('#inputNum'),
        divException = document.querySelector('#exception'),
        sectionForm = document.querySelector('#sectionForm')

    //Functions

    //----------------functions problem #1
    // recursive method 
    const fibonacci = n => n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)


    const templateStr = (st = []) => {

        let template = '';

        for (const i of st) {
            template += `<div id="divCard" class="card"><h3>Fibonacci</h3><div class="container"><h4><b>${i}</b></h4></div></div>`
        }

        return template;

    }

    const formSubmitHandler = (e) => {

        e.preventDefault();
        divException.innerHTML = ''


        let num = inputNum.value;

        if (num <= 1) {

            divException.innerHTML = `<small class = "err";">El número debe ser mayor a uno</small>`
        } else {

            divException.innerHTML = ''

            let stack = [];

            for (let i = 0; i < num; i++) {

                stack.push(fibonacci(i))
            }

            containerCards.innerHTML = templateStr(stack);
        }



    }



    //----------------functions problem #2
    const childClickHandler = (e) => {

        const child = e.target
        let res = confirm('¿Está seguro de que desea eliminarlo?')

        if (res) {
            containerCards.removeChild(child.parentNode)
        }

    }



    //Events

    //---------------events problem #1 
    form.addEventListener('submit', formSubmitHandler)


    //---------------events problem #2
    containerCards.addEventListener('click', childClickHandler)


})();