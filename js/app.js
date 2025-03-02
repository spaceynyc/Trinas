// Main application JavaScript file for Trina's Food Truck

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    
    // Load menu items
    loadMenuItems();
    
    // Load special item
    loadSpecialItem();
    
    // Load schedule
    loadSchedule();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize mobile sticky footer
    initMobileStickyFooter();
});

// Navigation functionality
function initNavigation() {
    const burger = document.querySelector('.burger');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle navigation menu for mobile
    burger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        
        // Toggle active class for burger animation
        burger.classList.toggle('active');
        
        // Toggle mobile nav and body class
        mobileNav.classList.toggle('nav-active');
        document.body.classList.toggle('nav-open');
        
        // Ensure header maintains consistent height when nav is open
        document.querySelector('header').style.height = '73px';
        
        // Make sure the burger stays visible
        if (mobileNav.classList.contains('nav-active')) {
            burger.style.opacity = '1';
            burger.style.visibility = 'visible';
        }
    });
    
    // X button removed, no longer needed
    
    // Close menu when clicking inside the mobile nav on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('nav-active');
            burger.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Reset burger button styles when closing
            burger.style = "";
        });
    });
    
    // Close menu when clicking anywhere on the page (except the menu or burger)
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('nav-active') && 
            !mobileNav.contains(e.target) && 
            !burger.contains(e.target)) {
            
            mobileNav.classList.remove('nav-active');
            burger.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Reset burger button styles when closing
            burger.style = "";
        }
    });
    
    // Prevent clicks inside mobile nav from closing the menu
    mobileNav.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Adjust scroll position based on header height
            const headerHeight = document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // Resize handler to reset menu state on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('nav-active')) {
            mobileNav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.classList.remove('nav-open');
        }
    });
}

// Load menu items from database
function loadMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    
    // Clear container
    menuContainer.innerHTML = '';
    
    // Create category headers
    const categories = {
        signature: "Signature Sandwiches",
        sides: "Sides",
        drinks: "Beverages"
    };
    
    // Create containers for each category
    for (const [key, value] of Object.entries(categories)) {
        const categorySection = document.createElement('div');
        categorySection.className = 'menu-category';
        categorySection.setAttribute('data-category', key);
        
        // Set active class for the first category (signature sandwiches)
        if (key === 'signature') {
            categorySection.classList.add('active');
        }
        
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = value;
        
        const categoryItems = document.createElement('div');
        categoryItems.className = 'category-items';
        categoryItems.id = `category-${key}`;
        
        categorySection.appendChild(categoryHeader);
        categorySection.appendChild(categoryItems);
        menuContainer.appendChild(categorySection);
    }
    
    // Add menu items to their respective categories
    menuItems.forEach(item => {
        const itemElement = createMenuItemElement(item);
        const categoryContainer = document.getElementById(`category-${item.category}`);
        categoryContainer.appendChild(itemElement);
    });
    
    // Set up menu tab click handlers
    setupMenuTabs();
}

// Set up menu tab click handlers
function setupMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get category from data attribute
            const category = tab.getAttribute('data-category');
            
            // Hide all menu categories
            const menuCategories = document.querySelectorAll('.menu-category');
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Show the selected category
            const selectedCategory = document.querySelector(`.menu-category[data-category="${category}"]`);
            selectedCategory.classList.add('active');
            
            // Re-initialize stagger animations for the newly visible items
            const staggerItems = selectedCategory.querySelectorAll('.stagger-item');
            staggerItems.forEach(item => {
                item.classList.remove('visible');
                
                // Small delay before adding visible class again
                setTimeout(() => {
                    item.classList.add('visible');
                }, 50);
            });
        });
    });
}

// Create menu item element
function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item stagger-item'; // Add stagger-item class for animation
    menuItem.setAttribute('data-id', item.id);
    
    // Use fish-sandwich.jpg as the placeholder image for all menu items
    const imgSrc = item.image || 'img/fish-sandwich.jpg';
    
    menuItem.innerHTML = `
        <img src="${imgSrc}" alt="${item.name}">
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <div class="menu-item-price">$${item.price.toFixed(2)}</div>
            <p class="menu-item-description">${item.description}</p>
            <button class="order-button" data-id="${item.id}">Order Now</button>
        </div>
    `;
    
    // Popular badge feature removed as requested
    
    return menuItem;
}

// Load special item from database
function loadSpecialItem() {
    const specialItemContainer = document.getElementById('special-item');
    
    // Use fish-sandwich.jpg as the placeholder image
    const imgSrc = specialItem.image || 'img/fish-sandwich.jpg';
    
    specialItemContainer.innerHTML = `
        <img src="${imgSrc}" alt="${specialItem.name}">
        <h3>${specialItem.name}</h3>
        <div class="special-item-price">$${specialItem.price.toFixed(2)}</div>
        <p class="special-item-description">${specialItem.description}</p>
        <button class="order-button" data-id="${specialItem.id}">Order Now</button>
    `;
}

// Load schedule from database
function loadSchedule() {
    const scheduleContainer = document.getElementById('schedule');
    
    // Clear container
    scheduleContainer.innerHTML = '';
    
    // Create schedule items
    weeklySchedule.forEach(scheduleItem => {
        const scheduleElement = document.createElement('div');
        scheduleElement.className = 'schedule-item stagger-item'; // Add stagger-item class for animation
        
        scheduleElement.innerHTML = `
            <div class="day">${scheduleItem.day}</div>
            <div class="location">${scheduleItem.location}</div>
            <div class="hours">${scheduleItem.hours}</div>
            <div class="address">${scheduleItem.address}</div>
        `;
        
        scheduleContainer.appendChild(scheduleElement);
    });
}

// Initialize event listeners
function initEventListeners() {
    // Menu item order buttons
    document.querySelectorAll('.order-button, .showcase-button').forEach(button => {
        button.addEventListener('click', handleOrderClick);
    });
    
    // CTA button scroll to menu
    document.querySelector('.cta-button').addEventListener('click', () => {
        const menuSection = document.getElementById('menu');
        window.scrollTo({
            top: menuSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Handle order button click
function handleOrderClick(e) {
    // Check if this is the showcase button or has a parent that is
    if (e.target.classList.contains('showcase-button') || 
        (e.target.parentElement && e.target.parentElement.classList.contains('showcase-button'))) {
        // Use the first menu item as default for showcase ordering
        orderedItem = menuItems[0];
        alert(`You've added ${orderedItem.name} to your order! This would connect to an ordering system in a real implementation.`);
        console.log(`Showcase item ordered: ${orderedItem.name}, ID: ${orderedItem.id}, Price: $${orderedItem.price.toFixed(2)}`);
        return;
    }
    
    const itemId = e.target.getAttribute('data-id');
    
    // Find the item in our database
    let orderedItem;
    
    if (itemId == specialItem.id) {
        orderedItem = specialItem;
    } else {
        orderedItem = menuItems.find(item => item.id == itemId);
    }
    
    if (!orderedItem) return;
    
    // Display a confirmation message
    alert(`You've added ${orderedItem.name} to your order! This would connect to an ordering system in a real implementation.`);
    
    // This would connect to an actual ordering system in a real implementation
    console.log(`Item ordered: ${orderedItem.name}, ID: ${orderedItem.id}, Price: $${orderedItem.price}`);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    
    // This would connect to a backend system in a real implementation
    console.log('Contact form submitted:', formProps);
    
    // Display success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    e.target.reset();
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    
    // This would connect to a backend system in a real implementation
    console.log('Newsletter subscription:', formProps);
    
    // Display success message
    alert('Thanks for subscribing to our newsletter!');
    
    // Reset form
    e.target.reset();
}

// Mobile Sticky Footer initialization
function initMobileStickyFooter() {
    // Only show sticky footer on mobile devices
    const stickyFooter = document.querySelector('.mobile-sticky-footer');
    
    // Check if mobile view based on screen width
    if (window.innerWidth <= 768) {
        stickyFooter.style.display = 'block';
    }
    
    // Update on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            stickyFooter.style.display = 'block';
        } else {
            stickyFooter.style.display = 'none';
        }
    });
    
    // Add click animations to mobile sticky buttons
    const stickyButtons = document.querySelectorAll('.mobile-sticky-button');
    stickyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add animation class
            this.classList.add('button-clicked');
            
            // Prevent immediate scroll to let animation play
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            
            // Smooth scroll after small delay for animation
            setTimeout(() => {
                // Adjust scroll position based on header height
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Remove animation class
                this.classList.remove('button-clicked');
            }, 300);
        });
    });
}

// Initialize scroll animations using Intersection Observer
function initScrollAnimations() {
    // Get all sections to apply the fade-in effect
    const sections = document.querySelectorAll('section');
    const sectionDividers = document.querySelectorAll('.section-divider');
    
    // Add fade-in class to all sections
    sections.forEach(section => {
        if (!section.classList.contains('hero')) { // Skip hero section as it's already visible
            section.classList.add('fade-in');
        }
    });
    
    // Add fade-in class to section dividers
    sectionDividers.forEach(divider => {
        divider.classList.add('fade-in');
    });
    
    // Apply stagger effect to menu items (they will be added after menu loading)
    const applyStaggerToMenuItems = () => {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            if (!item.classList.contains('stagger-item')) {
                item.classList.add('stagger-item');
            }
        });
        
        const scheduleItems = document.querySelectorAll('.schedule-item');
        scheduleItems.forEach(item => {
            if (!item.classList.contains('stagger-item')) {
                item.classList.add('stagger-item');
            }
        });
    };
    
    // Add stagger classes after a short delay to ensure the items have been loaded
    setTimeout(applyStaggerToMenuItems, 100);
    
    // Create intersection observer for fade-in elements
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add visible class when element enters the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when element leaves the viewport
                // This enables the animation to run again when scrolling back up
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    // Observe all fade-in elements
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            fadeObserver.observe(element);
        });
    }, 200);
    
    // Create intersection observer for staggered elements with a counter for child elements
    const staggerElements = new Map(); // Map to store staggered parent elements and their children count
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;
            
            if (entry.isIntersecting) {
                // Calculate the parent container (section or container div)
                const parentContainer = target.closest('section') || target.parentElement;
                
                // Get or initialize the counter for this parent
                let counter = staggerElements.get(parentContainer) || 0;
                
                // Add a slight delay based on the counter for a staggered effect
                setTimeout(() => {
                    target.classList.add('visible');
                }, counter * 100);
                
                // Increment counter for the next element in this parent
                staggerElements.set(parentContainer, counter + 1);
            } else {
                // Remove visible class when element leaves the viewport
                target.classList.remove('visible');
                
                // Reset counter for this parent when elements are no longer visible
                const parentContainer = target.closest('section') || target.parentElement;
                staggerElements.set(parentContainer, 0);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // Observe all staggered elements
    setTimeout(() => {
        document.querySelectorAll('.stagger-item').forEach(element => {
            staggerObserver.observe(element);
        });
    }, 300);
}