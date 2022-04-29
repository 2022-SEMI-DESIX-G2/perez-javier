(() => {

    const Utils = {
        methods: {
            fibonacci: (n, st) => n < 2 ? n : (st[st.length - 1]) + (st[st.length - 2]),

            templateStr: (st) => {

                let template = '';

                for (const i of st) {
                    template += `<div class="card"><a><i class="fa-solid fa-trash"></i></a><div class="container"><h4><b>${i}</b></h4></div></div>`;
                }

                return template;

            },
        },
    }
    document.Utils = Utils;
})();