import tailwindcss from '@tailwindcss/postcss';

export default {
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
            ],
        },
    },
};