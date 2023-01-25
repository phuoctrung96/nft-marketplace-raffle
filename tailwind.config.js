/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs': '576px',
      },
      colors:{
        "accent":"#009797",
        "black-400":"#202020",
        "border":"rgba(255,255,255,0.3)",
        "card":"#14161B",
        "text":"#fff",
        "card-icon":"#34384C",
        "bg":"#0F0F0F",
        "black":"#000",
        "text-color":"#9C9C9C",
        "old-silver": "#828282"
      },fontFamily:{
        "clashDisplay":[ 'Clash Display', "sans-serif"],
        "poppins":['Poppins', "sans-serif"]
      },
      spacing:{
        "120":"34rem",
        "29":"8rem"
      },
      tracking:{
        "more-wide":"0.01em"
      },
      borderRadius: {
        "card": "1.25rem",
        "sort": "4.25rem"
      },
      gridTemplateColumns: {
        "profile-section": "1fr 2fr",
        "userinfo": "80px 1fr"
      },
    },
  },
  plugins: [],
}