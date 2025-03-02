// Database for Trina's Food Truck

const menuItems = [
    {
        id: 1,
        name: "Classic Fish Sandwich",
        price: 9.99,
        description: "Our signature sandwich with crispy fried fish, tartar sauce, lettuce, and tomato on a toasted brioche bun.",
        image: "img/fish-sandwich.jpg",
        category: "signature"
    },
    {
        id: 2,
        name: "Spicy Cajun Fish Sandwich",
        price: 10.99,
        description: "Cajun-seasoned fish fillet with spicy remoulade, pickles, and slaw on a toasted brioche bun.",
        image: "img/fish-sandwich.jpg",
        category: "signature"
    },
    {
        id: 3,
        name: "Blackened Fish Sandwich",
        price: 10.99,
        description: "Blackened fish fillet with avocado, arugula, and lemon aioli on a multigrain bun.",
        image: "img/fish-sandwich.jpg",
        category: "signature"
    },
    {
        id: 4,
        name: "Southern Fried Fish Sandwich",
        price: 11.99,
        description: "Extra crispy southern-style fried fish with jalapeño tartar sauce, lettuce, and tomato on a brioche bun.",
        image: "img/fish-sandwich.jpg",
        category: "signature"
    },
    {
        id: 5,
        name: "Fish & Chips Basket",
        price: 12.99,
        description: "Two pieces of our famous fried fish with a side of crispy fries and house-made tartar sauce.",
        image: "img/fish-sandwich.jpg",
        category: "sides"
    },
    {
        id: 6,
        name: "Fish Tacos",
        price: 10.99,
        description: "Two soft corn tortillas filled with fried fish, cabbage slaw, pico de gallo, and chipotle crema.",
        image: "img/fish-sandwich.jpg",
        category: "sides"
    },
    {
        id: 7,
        name: "Coleslaw",
        price: 3.99,
        description: "Creamy, crunchy coleslaw made fresh daily.",
        image: "img/fish-sandwich.jpg",
        category: "sides"
    },
    {
        id: 8,
        name: "Hush Puppies",
        price: 4.99,
        description: "Golden fried cornmeal fritters with a touch of sweetness.",
        image: "img/fish-sandwich.jpg",
        category: "sides"
    },
    {
        id: 9,
        name: "Seasoned Fries",
        price: 3.99,
        description: "Crispy fries tossed in our secret seasoning blend.",
        image: "img/fish-sandwich.jpg",
        category: "sides"
    },
    {
        id: 10,
        name: "Sweet Tea",
        price: 2.99,
        description: "Southern-style sweet tea, brewed fresh daily.",
        image: "img/fish-sandwich.jpg",
        category: "drinks"
    },
    {
        id: 11,
        name: "Lemonade",
        price: 2.99,
        description: "Freshly squeezed lemonade.",
        image: "img/fish-sandwich.jpg",
        category: "drinks"
    },
    {
        id: 12,
        name: "Bottled Water",
        price: 1.99,
        description: "16oz bottled water.",
        image: "img/fish-sandwich.jpg",
        category: "drinks"
    }
];

const specialItem = {
    id: 101,
    name: "Lobster Roll Fish Sandwich",
    price: 14.99,
    description: "Limited time offering! Crispy fried fish topped with lobster salad, lettuce, and our special sauce on a toasted roll.",
    image: "img/fish-sandwich.jpg"
};

const weeklySchedule = [
    {
        day: "Monday",
        location: "Downtown Food Park",
        hours: "11:00 AM - 3:00 PM",
        address: "123 Main Street"
    },
    {
        day: "Tuesday",
        location: "Tech District",
        hours: "11:00 AM - 3:00 PM",
        address: "456 Innovation Ave"
    },
    {
        day: "Wednesday",
        location: "Waterfront Park",
        hours: "11:00 AM - 3:00 PM",
        address: "789 Harbor Blvd"
    },
    {
        day: "Thursday",
        location: "University Campus",
        hours: "11:00 AM - 7:00 PM",
        address: "101 College Drive"
    },
    {
        day: "Friday",
        location: "Food Truck Friday Event",
        hours: "11:00 AM - 8:00 PM",
        address: "202 Festival Square"
    },
    {
        day: "Saturday",
        location: "Farmers Market",
        hours: "9:00 AM - 2:00 PM",
        address: "303 Market Street"
    },
    {
        day: "Sunday",
        location: "Beach Boardwalk",
        hours: "12:00 PM - 6:00 PM",
        address: "404 Shoreline Drive"
    }
];