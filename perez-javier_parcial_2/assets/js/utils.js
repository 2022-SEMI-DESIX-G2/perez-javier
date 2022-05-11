(() => {
    const Utils = {
        settings: {
            backendBaseUrl: 'https://pokeapi.co/api/v2/'
        },
        methods: {
            getFormattedBackendUrl: ({ query, searchType }) => `${Utils.settings.backendBaseUrl}${searchType}/${query}`,

            getSearch: ({ query, searchType = 'pokemon' }) => Utils.methods.fetch({ url: Utils.methods.getFormattedBackendUrl({ query, searchType }), searchType }),

            fetch: async({ url, searchType }) => {
                console.log(url);
                try {
                    const rawResponse = await fetch(url);
                    if (rawResponse.status !== 200) throw new Error(`${searchType} not found`);
                    return rawResponse.json();
                } catch (error) {
                    throw error;
                }
            },

            getEvolutionChain: async url => {
                let arrSearch = Utils.methods.getArrSearch(url)

                let { evolution_chain } = await Utils.methods.getSearch({ query: arrSearch[0], searchType: arrSearch[1] })
                arrSearch = Utils.methods.getArrSearch(evolution_chain.url)

                let { chain } = await Utils.methods.getSearch({ query: arrSearch[0], searchType: arrSearch[1] })

                return Utils.methods.getArrEvolutionChain(chain);
            },

            getArrSearch: url => url.split("/").slice(5, 7).reverse(),

            getArrEvolutionChain: ({ species, is_baby, evolves_to }) => {
                let stack = [];
                stack.push({ name: species.name, is_baby: is_baby });

                while (evolves_to.length > 0) {
                    if (evolves_to.length > 1) {
                        evolves_to.forEach(({ species, is_baby }) => {
                            stack.push({ name: species.name, is_baby: is_baby });
                        });
                    } else {
                        stack.push({ name: evolves_to[0].species.name, is_baby: evolves_to[0].is_baby });
                    }
                    evolves_to = evolves_to[0].evolves_to
                }
                return stack;
            }

        },
    }
    document.Utils = Utils;
})();