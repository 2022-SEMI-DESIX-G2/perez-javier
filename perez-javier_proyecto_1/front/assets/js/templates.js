(() => {
    const Templates = {
        render: ({ searchType = 'pokemon', data }) => {
            const renderMap = {
                pokemon: Templates.pokemonCard,
            };

            return renderMap[searchType] ? renderMap[searchType](data) : Templates.errorCard();
        },
        errorCard: () => `<h1>There was an error</h1>`,
        pokemonCard: ({ id, name, weight, height, frontDefaultSprite, sprites, locationAreas, abilities, evosChain, checkSprites, checkLocation, checkEvoChain }) => {
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
                ${checkSprites ? Templates.spritesCard(sprites) : ''}
                ${checkLocation ? Templates.locationCard(locationAreas) : ''}
                ${checkEvoChain ? Templates.evoChainCard(evosChain) : ''}                  
            </div>
        </section>`;
        },
        spritesCard: (sprites) => `<button id="button-sprites" class="button-response">Sprites del Pokemon</button>
        <div class="data-response click-button-hidden" id="sprites-response">
            ${sprites}
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
    };
    document.Templates = Templates;
})();