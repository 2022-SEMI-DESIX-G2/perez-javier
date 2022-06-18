(() => {
    const Utils = {
        settings: {
            backendBaseUrl: 'http://localhost:3000/api/v1/pokemon'
        },
        methods: {
            getFormattedBackendUrl: ({ query }) => `${Utils.settings.backendBaseUrl}/${query}`,

            getSearch: ({ query, searchType = 'pokemon' }) => Utils.methods.fetch({ url: Utils.methods.getFormattedBackendUrl({ query, searchType }), searchType }),

            fetch: async({ url, searchType }) => {
                console.log(url);
                try {
                    const { data } = await axios.post(url);
                    console.log(data);
                    return data;
                } catch (error) {
                    throw error;
                }
            },

        },
    }
    document.Utils = Utils;
})();