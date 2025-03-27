import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1E40AF', // Blue color for primary
                    dark: '#1E3A8A',
                },
                secondary: {
                    DEFAULT: '#6B7280', // Gray color for secondary
                    dark: '#4B5563',
                },
            },
        },
    },
    plugins: [],
};

export default config;
