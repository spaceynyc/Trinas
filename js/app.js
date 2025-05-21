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
    
    // Apply hero text animations
    initHeroTextAnimation();

    // Initialize Hero Parallax
    initHeroParallax();

    // Initialize Image Parallax for specific sections
    initImageParallax('.food-showcase-section', '.showcase-image img', 0.1); // Subtle effect
    initImageParallax('.about-section', '.about-image img', 0.1);      // Subtle effect
});

function initImageParallax(sectionSelector, imageSelector, intensity) {
    const section = document.querySelector(sectionSelector);
    const image = section ? section.querySelector(imageSelector) : null;

    if (!section || !image) {
        // console.warn(`Image parallax: Section or image not found for selectors: ${sectionSelector}, ${imageSelector}`);
        return;
    }

    let ticking = false;
    let sectionRect = section.getBoundingClientRect(); // Get initial dimensions

    const parallaxScrollHandler = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.pageYOffset;
                // Calculate how much of the section is visible or how far it has scrolled past a point
                // This needs to be relative to the viewport and the element's position
                const viewportHeight = window.innerHeight;
                
                // Update sectionRect if it might have changed (e.g. resize, though not handled here)
                sectionRect = section.getBoundingClientRect();

                // Calculate a value based on how much the section has entered or exited the viewport
                // A value from -1 (just below viewport) to 1 (just above viewport), 0 when centered.
                const scrollFactor = (sectionRect.top - viewportHeight / 2 + sectionRect.height / 2) / (viewportHeight / 2 + sectionRect.height / 2);
                
                // Apply transform. The range of scrollFactor is roughly -1 to 1.
                // We want a subtle movement, so multiply by a small pixel value.
                // The intensity parameter can further modulate this.
                // Positive value moves image down as section scrolls up, negative moves it up.
                const translateY = -scrollFactor * (50 * intensity); // e.g. max 5px movement if intensity is 0.1 and scrollFactor maxes at 1

                image.style.transform = `translateY(${translateY}px)`;
                ticking = false;
            });
            ticking = true;
        }
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', parallaxScrollHandler, { passive: true });
                // Initial call to set position
                parallaxScrollHandler();
            } else {
                window.removeEventListener('scroll', parallaxScrollHandler);
                // Optional: Reset image position when not in view
                // image.style.transform = 'translateY(0px)'; 
            }
        });
    }, { threshold: 0 }); // Trigger as soon as any part of the section is visible

    observer.observe(section);
}


function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.pageYOffset;
                // Apply parallax effect - adjust multiplier for desired intensity
                // A smaller multiplier means a more subtle effect (image moves slower)
                hero.style.backgroundPositionY = (scrollPosition * 0.4) + 'px';
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initHeroTextAnimation() {
    const heroH1 = document.querySelector('.hero h1');
    const heroH2 = document.querySelector('.hero h2');

    if (heroH1) {
        heroH1.classList.add('hero-h1-animate');
    }
    if (heroH2) {
        heroH2.classList.add('hero-h2-animate');
    }
}

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
    const menuCategories = document.querySelectorAll('.menu-category');
    const animationDuration = 300; // Corresponds to .is-exiting animation time

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const newCategoryName = tab.getAttribute('data-category');
            const currentActiveTab = document.querySelector('.menu-tab.active');
            const currentActiveCategoryName = currentActiveTab ? currentActiveTab.getAttribute('data-category') : null;

            if (newCategoryName === currentActiveCategoryName) {
                return; // Do nothing if the same tab is clicked
            }

            // Update tab active states
            if(currentActiveTab) currentActiveTab.classList.remove('active');
            tab.classList.add('active');

            const oldCategory = document.querySelector('.menu-category.active');
            const newCategory = document.querySelector(`.menu-category[data-category="${newCategoryName}"]`);

            if (oldCategory) {
                oldCategory.classList.add('is-exiting');
                
                // Clean up stagger items from old category to prevent re-animation issues
                const oldStaggerItems = oldCategory.querySelectorAll('.stagger-item.visible');
                oldStaggerItems.forEach(item => {
                    item.classList.remove('visible'); // Make them invisible
                     // Optionally, unobserve them if your observer setup doesn't handle this well
                    if (globalStaggerObserver) globalStaggerObserver.unobserve(item);
                });


                setTimeout(() => {
                    oldCategory.classList.remove('active');
                    oldCategory.classList.remove('is-exiting');
                    // Items inside oldCategory are now display:none due to .active removal

                    if (newCategory) {
                        newCategory.classList.add('active');
                        // Prepare new items for animation (they are now display:block)
                        const newMenuItems = newCategory.querySelectorAll('.menu-item');
                        newMenuItems.forEach(item => {
                            // Ensure they are observed for scroll animations if not already visible
                            if (!item.classList.contains('stagger-item')) {
                                item.classList.add('stagger-item');
                            }
                            item.classList.remove('visible'); // Ensure they are ready to be animated by observer
                            if (globalStaggerObserver) globalStaggerObserver.observe(item);
                        });
                    }
                }, animationDuration);
            } else if (newCategory) { // No old category, just activate the new one
                newCategory.classList.add('active');
                const newMenuItems = newCategory.querySelectorAll('.menu-item');
                newMenuItems.forEach(item => {
                     if (!item.classList.contains('stagger-item')) {
                        item.classList.add('stagger-item');
                    }
                    if (globalStaggerObserver) globalStaggerObserver.observe(item);
                });
            }
        });
    });

    // Initial setup for the default active category's items to be observed
    const initialActiveCategory = document.querySelector('.menu-category.active');
    if (initialActiveCategory) {
        const initialMenuItems = initialActiveCategory.querySelectorAll('.menu-item');
        initialMenuItems.forEach(item => {
            if (!item.classList.contains('stagger-item')) {
                item.classList.add('stagger-item');
            }
            if (globalStaggerObserver) globalStaggerObserver.observe(item);
        });
    }
}


// Create menu item element
function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    // .stagger-item will be added dynamically by setupMenuTabs/loadMenuItems if needed
    menuItem.className = 'menu-item'; 
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

// Global variable for the stagger observer
let globalStaggerObserver;

// Initialize scroll animations using Intersection Observer
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const sectionDividers = document.querySelectorAll('.section-divider');

    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.classList.add('fade-in');
        }
    });
    sectionDividers.forEach(divider => divider.classList.add('fade-in'));

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
    
    const staggerElementsMap = new Map();
    globalStaggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target;
            if (entry.isIntersecting) {
                const parentContainer = target.closest('section, .menu-category') || target.parentElement;
                let counter = staggerElementsMap.get(parentContainer) || 0;
                
                // Apply the 'visible' class with a delay.
                // The CSS animation for .menu-category.active .menu-item is separate from this .stagger-item.visible logic.
                // The .stagger-item.visible is for generic scroll-triggered staggering.
                // Menu tab switching has its own explicit animation via menuCategoryItemsIn.
                // We need to ensure they don't conflict or that one is prioritized.
                // For menu items specifically, their entrance is handled by .menu-category.active .menu-item animation.
                // So, for .menu-item, .visible class from observer might not be needed if tab switching handles it.
                // However, if a long menu category scrolls, items further down would need this.
                
                // If the target is a menu-item AND its parent .menu-category is already active (meaning it's a tab switch, not scroll)
                // Menu items in an active category are animated by tab switching CSS primarily.
                // Add .visible for consistency for other effects (e.g. image reveal) but without scroll-stagger delay.
                if (target.classList.contains('menu-item') && target.closest('.menu-category.active')) {
                    target.classList.add('visible');
                } else {
                    // Apply scroll-based stagger for other items, or menu items in a long, scrolling category.
                    setTimeout(() => {
                        target.classList.add('visible');
                    }, counter * 100); // 100ms stagger delay
                }
                staggerElementsMap.set(parentContainer, counter + 1);
            } else {
                target.classList.remove('visible');
                const parentContainer = target.closest('section, .menu-category') || target.parentElement;
                staggerElementsMap.set(parentContainer, 0); // Reset counter for this parent
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Initial observation for non-menu .stagger-item elements (e.g., schedule items)
    // Menu items are handled by setupMenuTabs after they are loaded/filtered
    document.querySelectorAll('.stagger-item:not(.menu-item)').forEach(element => {
       if (globalStaggerObserver) globalStaggerObserver.observe(element);
    });
    // Menu items are observed via loadMenuItems and setupMenuTabs

    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            fadeObserver.observe(element);
        });
    }, 200);
}