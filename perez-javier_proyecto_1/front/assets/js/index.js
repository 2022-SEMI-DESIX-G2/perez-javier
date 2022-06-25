((utils, templates) => {
    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector('#pokemon-finder-form'),
            pokemonFinderInput: document.querySelector('#input-finder-query'),
            pokemonFinderOutput: document.querySelector('#section-stats-response'),
            pokemonExceptionInput: document.querySelector('#div-exception-input'),
            pokemonCheckSprites: document.querySelector('#checkbox-sprites'),
            pokemonCheckLocation: document.querySelector('#checkbox-location'),
            pokemonCheckEvoChain: document.querySelector('#checkbox-evo-chain'),
        },
        init: () => {
            App.htmlElements.pokemonFinderForm.addEventListener('submit', App.handlers.pokemonFinderFormOnSubmit);
        },
        handlers: {
            pokemonFinderFormOnSubmit: async(e) => {
                e.preventDefault();
                App.htmlElements.pokemonExceptionInput.innerHTML = "";
                let msgExceptionError = '<span class="err">Este campo es obligatorio*</span>';
                const query = App.htmlElements.pokemonFinderInput.value.toLowerCase();
                const checkSprites = App.htmlElements.pokemonCheckSprites.checked;
                const checkLocation = App.htmlElements.pokemonCheckLocation.checked;
                const checkEvoChain = App.htmlElements.pokemonCheckEvoChain.checked;
                // console.log(checkSprites);
                // console.log(query);
                try {
                    if (!query) {
                        App.htmlElements.pokemonExceptionInput.innerHTML = msgExceptionError;
                    } else {
                        let { data } = await utils.methods.getSearch({ query });;
                        // console.log(data);
                        data.checkSprites = checkSprites;
                        data.checkLocation = checkLocation;
                        data.checkEvoChain = checkEvoChain;
                        // console.log(data);
                        const renderedTemplate = await templates.render({ data });
                        App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;

                        const pokemonButtonGeneral = document.querySelector('#button-general')
                        pokemonButtonGeneral.addEventListener('click', (e) => App.handlers.showPokemonCard(e, '#general-response'))

                        if (checkSprites) {
                            const pokemonButtonSprites = document.querySelector('#button-sprites');
                            pokemonButtonSprites.addEventListener('click', (e) => App.handlers.showPokemonCard(e, '#sprites-response'));
                        }
                        if (checkLocation) {
                            const pokemonButtonLocation = document.querySelector('#button-location');
                            pokemonButtonLocation.addEventListener('click', (e) => App.handlers.showPokemonCard(e, '#location-response'));

                        }
                        if (checkEvoChain) {
                            const pokemonButtonEvoChain = document.querySelector('#button-evo-chain');
                            pokemonButtonEvoChain.addEventListener('click', (e) => App.handlers.showPokemonCard(e, '#evo-chain-response'));
                        }
                    }
                } catch (error) {
                    console.log(error);
                    App.htmlElements.pokemonFinderOutput.innerHTML = ` <section class="container container-stats">
                    <center>
                        <h3>${error}</h3>
                        <img class="img-not-found" src="./assets/img/avatar.png" alt="img_not_found">
                    </center>
                </section>`;
                }
            },
            showPokemonCard: (e, id) => {
                const hidden = 'click-button-hidden';
                const visible = 'click-button-visible';
                const divContent = document.querySelector(id);
                const listClass = divContent.classList;

                if (listClass.value.split(' ').includes(hidden)) {
                    divContent.classList.add(visible);
                    divContent.classList.remove(hidden);
                } else {
                    divContent.classList.add(hidden);
                    divContent.classList.remove(visible);
                }
            },
        },
    };
    App.init();
})(document.Utils, document.Templates);