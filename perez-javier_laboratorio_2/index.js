const miModulo = (() => {

    'use strict';

    let question = '¿Qué es Javascript y en qué se asemeja a Java?';

    let js_java = 'JavaScript es un lenguaje de programación o de secuencias de comandos que te permite implementar funciones complejas en páginas web, cada vez que una página web hace algo más que sentarse allí y mostrar información estática para que la veas, muestra oportunas actualizaciones de contenido, mapas interactivos, animación de Gráficos 2D/3D, desplazamiento de máquinas reproductoras de vídeo, etc., puedes apostar que probablemente JavaScript está involucrado. Java es un lenguaje de programación orientado a objetos puros (OOP), mientras que JavaScript está basado en prototipos y, puede emular la programación orientada a objetos. JavaScript es gestionado por ECMAScript, una organización sin ánimo de lucro. En Java, el control lo tiene Oracle, una empresa privada que lo gestiona en función de sus intereses.'

    var num1 = 45,
        num2 = 37;

    let str1 = 'Hola',
        str2 = 'Mundo';

    const str = 'Javier Pérez',
        bool = true;

    const obj = {
        int: 13,
        str: 'Iron Man',
        bool: false,
        obj2: {}
    };


    const body = document.querySelector('body');

    body.innerHTML = `
    
        <h1>1. ${question}</h1>
        <p>
            ${js_java};
        </p>

        <h1>2. Operaciones</h1>

        <h4>Suma</h4>
        <small>${num1 + num2}</small>

        <h4>Resta</h4>
        <small>${num1 - num2}</small>

        <h4>Multiplicación</h4>
        <small>${num1 * num2}</small>

        <h4>Divsión</h4>
        <small>${num1 / num2}</small>
        
        <h1>3. Concatenación</h1>

       ${str1} ${str2}

       <h1>4. Tipo de Dato</h1>

       ${typeof bool}
       <br>     
       ${typeof str} 

    `;


    console.log(obj);


})();