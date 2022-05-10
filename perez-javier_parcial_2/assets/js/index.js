((utils) => {

    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector('#pokemon-finder-form'),
            pokemonFinderSearchType: document.querySelector('#select-finder-search-type'),
            pokemonFinderInput: document.querySelector('#input-finder-query'),
            pokemonFinderOutput: document.querySelector('#section-stats-response'),
            pokemonFinderButtonForm: document.querySelector('#buttons-form'),
            pokemonFinderCleanButton: document.querySelector('#clean-button'),
            pokemonExceptionInput: document.querySelector('#div-exception-input'),
            pokemonExceptionSearchType: document.querySelector('#div-exception-search-type'),
        },
        init: () => {
            App.htmlElements.pokemonFinderForm.addEventListener('submit', App.handlers.pokemonFinderFormOnSubmit);
            App.htmlElements.pokemonFinderCleanButton.addEventListener('click', App.handlers.pokemonFinderCleanButtonOnClick)
        },
        handlers: {
            pokemonFinderFormOnSubmit: async(e) => {
                e.preventDefault();
                App.htmlElements.pokemonExceptionInput.innerHTML = "";
                App.htmlElements.pokemonExceptionSearchType.innerHTML = "";
                let msgExceptionError = '<span class="err">Este campo es obligatorio*</span>';

                const query = App.htmlElements.pokemonFinderInput.value;
                const searchType = App.htmlElements.pokemonFinderSearchType.value;
                console.log(query);
                console.log(searchType);
                try {
                    if (!query) {
                        App.htmlElements.pokemonExceptionInput.innerHTML = msgExceptionError;
                    } else if (searchType === 'default') {
                        App.htmlElements.pokemonExceptionSearchType.innerHTML = msgExceptionError;
                    } else {
                        App.htmlElements.pokemonFinderButtonForm.className += " buttons-form-visible-buttons"
                        App.htmlElements.pokemonFinderCleanButton.className += " clean-button-visible"
                        const response = await utils.methods.getSearch({ query, searchType });
                        const { species } = response;
                        if (species) response['chain_evolves'] = await utils.methods.getEvolutionChain(species.url);
                        console.log(response);
                        const renderedTemplate = App.templates.render({ searchType, response });
                        App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;

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
            pokemonFinderCleanButtonOnClick: () => {
                App.htmlElements.pokemonFinderInput.value = '';
                App.htmlElements.pokemonFinderSearchType.value = 'default';
                App.htmlElements.pokemonFinderOutput.innerHTML = '';
                App.htmlElements.pokemonFinderButtonForm.classList.remove('buttons-form-visible-buttons');
                App.htmlElements.pokemonFinderCleanButton.classList.remove('clean-button-visible')
            },

        },
        templates: {
            render: ({ searchType, response }) => {
                const renderMap = {
                    ability: App.templates.abilityCard,
                    pokemon: App.templates.pokemonCard,
                };

                return renderMap[searchType] ? renderMap[searchType](response) : App.templates.errorCard();
            },
            errorCard: () => `<h1>There was an error</h1>`,
            pokemonCard: ({ id, name, weight, height, sprites, abilities, chain_evolves }) => {
                let { back_default, front_default } = sprites;

                let abilitiesList = abilities.map(({ ability, is_hidden }) => `<li>${ability.name} ${is_hidden?'<i class="fa-solid fa-eye-slash"></i>':""}</li>`)

                let evolvesList = chain_evolves.map(({ name, is_baby }) => `<li>${name} ${is_baby?'<img class="img-baby" src="./assets/img/bebe.png" alt="img_baby">':""}</li>`)

                console.log({ back_default, front_default });
                console.log({ abilitiesList });

                return ` <section class="container container-stats">
                <h3>${name} (${id})</h3>
                <section class="container-asides">
                    <section class="aside-A">
                        <h4>Sprites</h4>
                        <img class="sprites" src=${front_default} alt="Front_Image_Pokemon">
                        <img class="sprites" src=${back_default} alt="Back_Image_Pokemon">
    
                        <h4>Evolutions chain</h4>
                        <ul class="scroll-container scroll-evolutions">
                            ${evolvesList.join("")}
                        </ul>
                    </section>
    
                    <section class="aside-B">
                        <h4>Weight/Height</h4>
                        <p class="weight-height">${weight}/${height}</p>
    
                        <h4>Abilities</h4>
                        <ul>${abilitiesList.join("")}</ul>
                    </section>
                </section>
            </section>`;
            },

            abilityCard: ({ name, pokemon }) => {
                const nameArr = name.split("");
                nameArr.splice(0, 1, nameArr[0].toUpperCase());
                name = nameArr.join("");
                console.log(name);
                const pokemonList = pokemon.map(({ pokemon, is_hidden }) => `<li>${pokemon.name} ${is_hidden?'<i class="fa-solid fa-eye-slash"></i>':""}</li>`);
                return ` <section class="container container-stats">
                <h3>${name}</h3>
                <section class="container-asides">
                    <section class="aside-A">
                        <h4>Who can learn it?</h4>
                        <ul class="scroll-container">
                            ${pokemonList.join("")}
                        </ul>
                    </section>
                </section>
            </section>`;
            },
        },

    };

    App.init();

})(document.Utils);