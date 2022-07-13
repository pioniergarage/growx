/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                growDark: {
                    ...require("daisyui/src/colors/themes")["[data-theme=night]"],
                    primary: "rgb(168 85 247)",
                    secondary: "rgb(211, 77, 188)"
                }
            }
        ]
    }
};
