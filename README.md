# Trina's Food Truck Website

A responsive website for "Trina's" food truck, specializing in fried fish sandwiches.

## Overview

This is a single-page website showcasing Trina's food truck menu, locations, and contact information. The site is built with:

- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript
- In-memory JavaScript object database

## Features

- Responsive design that works on mobile, tablet, and desktop
- Interactive menu with item details and ordering functionality
- Weekly schedule display with locations
- Special item highlight section
- About section with the food truck's story
- Contact form
- Newsletter signup
- Mobile-friendly navigation

## Project Structure

```
trinas-food-truck/
├── css/
│   └── styles.css         # Main stylesheet
├── img/                   # Image directory (add your images here)
│   └── placeholder.txt    # Information about placeholder images
├── js/
│   ├── app.js             # Main application logic
│   └── database.js        # In-memory database for menu items and schedule
├── index.html             # Main HTML file
└── README.md              # This documentation file
```

## Setup and Usage

1. Clone this repository or download the files
2. Add actual images to the `img/` directory
3. Open `index.html` in your web browser to view the site

No build process or server is required as this is a static website.

## Customization

### Menu Items

Edit the `menuItems` array in `js/database.js` to update the menu items, prices, and descriptions.

### Special Item

Modify the `specialItem` object in `js/database.js` to change the featured special.

### Schedule

Update the `weeklySchedule` array in `js/database.js` to reflect the actual food truck schedule.

### Images

Replace the placeholder references with actual image files in the `img/` directory.

## Future Enhancements

- Backend integration for the contact and newsletter forms
- Online ordering system
- Customer reviews section
- Gallery of food truck images
- Social media integration

## License

This project is free to use for personal or commercial purposes.