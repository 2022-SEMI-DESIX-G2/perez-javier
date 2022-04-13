const miModulo = (() => {
    //arreglar pull request
    'use strict'

    //Global Vars

    // Divs or Elements HTML
    const divPalindromo = document.querySelector('#palindromo'),
        divTotalChars = document.querySelector('#totalChars'),
        divBisiesto = document.querySelector('#bisiesto'),
        divPrimNum = document.querySelector('#primNum'),
        inputNum = document.querySelector('#inputNum'),
        inputStr = document.querySelector('#inputStr'),
        inputNumPrim = document.querySelector('#inputNumPrim');

    //Buttons
    const btnValidatePal = document.querySelector('#btnValidatePal'),
        btnValidateStr = document.querySelector('#btnValidateStr'),
        btnValidateYear = document.querySelector('#btnValidateYear'),
        btnValidatePrimNum = document.querySelector('#btnValidatePrimNum')


    //Functions

    //----------------functions problem #1
    const reverseNum = (n = '') => n.split('').reverse().join('');

    const numBase2 = (n = 0) => (n).toString(2);


    //----------------functions problem #2
    const countChar = (s = '') => {
        let sArr;
        const sObj = {};
        sArr = s.split("");

        for (let i in sArr) {
            //Add and count char in object 
            let key = sArr[i].toString().toUpperCase();
            sObj[key] = (sObj[key] || 0) + 1;
        }

        return sObj;
    }

    const templateStr = (obj = {}) => {
        let template = '';

        for (const val in obj) {
            template += `<small style="color: blue;">${obj[val]} ${val}</small><br> `;
        }

        return template;
    }


    //----------------functions problem #3
    const isBisiesto = (y = 0) => {
        return (y % 400 === 0) ? true :
            (y % 100 === 0) ? false :
            y % 4 === 0;
    };

    const templateStrBis = bool => bool ? `<small style="color: green;">Es un año Bisiesto</small>` : `<small style="color: red;">No es un año Bisiesto</small>`

    //----------------functions problem #4
    const sumPrimNum = (n = 0) => {

        let con = 1;
        if (n === 0 || n < 0) {
            return `<small style="color: red;">El número debe ser mayor a cero (0)</small>`
        }

        for (let i = 2; i <= n; i++) {

            if (isPrime(i)) {
                con += i;
                console.log({ i, con, }, i % 1);
            }

        }

        return `<small style="color: darkblue;">La sumatoria de números primos hasta ${n} es: ${con}</small>`;
    }

    const isPrime = (num = 0) => {
        for (let i = 2; i < num; i++) {

            if (num % i === 0) return false;

        }

        return true
    }




    //Events

    //---------------events problem #1 
    btnValidatePal.addEventListener('click', () => {

        let num = inputNum.value;

        const invested = reverseNum(num);

        const bin = numBase2(Number(num));
        console.log({ bin });

        const investedBin = reverseNum(bin);


        (invested === num && bin === investedBin) ? divPalindromo.innerHTML = `<small style="color: green;">Es palindromo de Doble base</small>`: divPalindromo.innerHTML = `<small style="color: red;">No es palindromo de Doble base</small>`;



    })

    //---------------events problem #2
    btnValidateStr.addEventListener('click', () => {

        let str = inputStr.value;

        const countObj = countChar(str);

        // const literalStr = templateStr(countObj);

        divTotalChars.innerHTML = templateStr(countObj);



    })

    //---------------events problem #3 
    btnValidateYear.addEventListener('click', () => {

        let year = inputNumYear.value;

        const isBis = isBisiesto(Number(year));
        console.log(isBis);

        //const literalStrBis = templateStrBis(isBis);

        divBisiesto.innerHTML = templateStrBis(isBis);

    });

    //---------------events problem #4 

    btnValidatePrimNum.addEventListener('click', () => {

        let primNum = inputNumPrim.value;

        divPrimNum.innerHTML = sumPrimNum(Number(primNum));

    });

})();