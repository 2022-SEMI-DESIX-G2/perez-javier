((utils) => {
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
                console.log(checkSprites);
                console.log(query);

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

                        const renderedTemplate = App.templates.render({ data });
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
                const div = document.querySelector(id);
                const listClass = div.classList;

                if (listClass.value.split(' ').includes(hidden)) {
                    div.classList.add(visible);
                    div.classList.remove(hidden);
                } else {
                    div.classList.add(hidden);
                    div.classList.remove(visible);
                }
            },
        },
        templates: {
            render: ({ searchType = 'pokemon', data }) => {
                const renderMap = {
                    pokemon: App.templates.pokemonCard,
                };

                return renderMap[searchType] ? renderMap[searchType](data) : App.templates.errorCard();
            },
            errorCard: () => `<h1>There was an error</h1>`,
            pokemonCard: ({ id, name, weight, height, frontDefaultSprite, sprites, locationAreas, abilities, evosChain, checkSprites, checkLocation, checkEvoChain }) => {
                //Set all Sprites
                // console.log(sprites);
                const spritesArr = [];
                sprites.forEach(sprite => spritesArr.push(`<img class="sprites" src='${sprite}'>`));
                return ` <section class="container">
                <div class="container-info-form">
                    <center>
                        <img class="pokemon" src="${frontDefaultSprite}">
                    </center>
                    <center>
                        <h2>${name}</h2>
                    </center>
                    <button id="button-general" class="button-response">Generales del Pokemon</button>
                    <div class="data-response click-button-hidden" id="general-response">
                        <h3>Habilidades:</h3>
                        <ul>
                            ${abilities}
                        </ul>
                        <h3>Peso:</h3>
                        <ul>
                            <li>${weight}</li>
                        </ul>
                        <h3>Altura:</h3>
                        <ul>
                            <li>${height}</li>
                        </ul>
                    </div>
                    ${checkSprites ? App.templates.spritesCard(spritesArr) : ''}
                    ${checkLocation ? App.templates.locationCard(locationAreas) : ''}
                    ${checkEvoChain ? App.templates.evoChainCard(evosChain) : ''}                  
                </div>
            </section>`;
            },
            spritesCard: (spritesArr) => `<button id="button-sprites" class="button-response">Sprites del Pokemon</button>
            <div class="data-response click-button-hidden" id="sprites-response">
                ${spritesArr.join('')}
            </div>`,
            locationCard: (locationAreas) => `<button id="button-location" class="button-response">Ubicación del Pokemon</button>
            <div class="data-response click-button-hidden" id="location-response">
                <center>
                    <table>
                        <tr>
                            <td>Lugar</td>
                            <td>Probabilidad</td>
                            <td>Nivel máximo</td>
                            <td>Metodo</td>
                        </tr>
                        ${locationAreas} 
                    </table>
                </center>
            </div>`,
            evoChainCard: (evosChain) => `<button id="button-evo-chain" class="last-button-response">Cadena de evolución del Pokemon</button>
            <div class="data-response click-button-hidden" id="evo-chain-response">
                <h3>Cadena:</h3>
                <ul>
                    ${evosChain}
                </ul>
            </div>`,
        },

    };
    App.init();
})(document.Utils);