/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js","./modules/products.js", "./modules/news.js", "./pages/shopSingle.html", "./scripts/shopSingle.js", "./pages/shop.html", "./scripts/shop.js", "./pages/aboutUs.html", "./scripts/aboutUs.js", "./pages/services.html", "./scripts/services.js", "./pages/qualityStandard.html", "./scripts/qualityStandard.js", "./pages/portfolioStandard.html", "./scripts/portfolioStandard.js", "./pages/team.html", "./scripts/team.js", "./pages/blog.html", "./scripts/blog.js", "./pages/contactUs.html", "./scripts/contactUs.js", "./pages/vitaminD.html", "./scripts/vitaminD.js", "./pages/cart.html", "./scripts/cart.js", "./pages/identification.html", "./scripts/identification.js"],
  theme: {
    extend: {},
    colors: {
      'deepGreen': '#274C5B',
      'white': '#fff',
      'deepGreen2': '#336B5B',
      'lightGreen': '#7EB693',
      'shadeGreen': '#EFF6F1',
      'red': '#ff0000',
      'errorRed': '#ef4444',
      'pink': '#dc3545',
      'blue': '#2563eb',
    },
  },
  plugins: [],
}

