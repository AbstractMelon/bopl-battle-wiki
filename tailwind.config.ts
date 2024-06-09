/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                main: ["Main", "Arial", "sans-serif"],
                secondary: ["Secondary", "Arial", "sans-serif"],
            },
            colors: {
                primary: "#2099EE",
                secondary: "#125988",
                accent: "#F89928",
            },
            backgroundImage: {
                "hero-pattern": "url('/background.png')",
            },
        },
    },
    plugins: [],
};
