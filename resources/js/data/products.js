const hoverImages = [
    "/images/home/arzopa-z3fc-gray.webp",
    "/images/home/arzopa-z1rc.webp",
    "/images/home/arzopa-a3c-pro-grey.webp",
    "/images/home/arzopa-z1fc-gray.webp"
];
const randomHoverImage = () => hoverImages[Math.floor(Math.random() * hoverImages.length)];

const monitorImages = [
    { source: '/images/home/products.png', size: [2048, 1028], crop: [225, 224, 380, 350] },
    { source: '/images/home/products.png', size: [2048, 1028], crop: [635, 224, 380, 350] },
    { source: '/images/home/products.png', size: [2048, 1028], crop: [1043, 224, 380, 350] },
    { source: '/images/home/products.png', size: [2048, 1028], crop: [1451, 224, 380, 350] },
];
const frameImage = { source: '/images/home/categories.png', size: [2048, 1029], crop: [1060, 340, 770, 430] };
const monitors = [
    ['ARZOPA Z3FC GRAY', 'Elevate work & play with 2.5K clarity and ultra-smooth 180Hz.', ['16.1″', '2.5K', '180Hz'], 149.99, 359.99, 'Best Seller'],
    ['ARZOPA Z1RC', 'Maximize your workflow with 2.5K clarity and more vertical screen space.', ['16″', '2.5K', '123% sRGB'], 129.99, 249.99, 'Productivity'],
    ['ARZOPA A3C PRO GREY', 'Experience richer blacks, vivid color and OLED clarity in an ultra-slim display.', ['13.3″', 'OLED', '100% DCI-P3'], 159.99, 399.99, 'OLED'],
    ['ARZOPA Z1FC GRAY', 'Enjoy smoother gaming on a spacious 16.1″ 144Hz display.', ['16.1″', '144Hz', '106% sRGB'], 129.99, 249.99, 'Gaming'],
    ['ARZOPA A1 GAMUT', 'A lightweight second screen for wherever your day takes you.', ['15.6″', 'Full HD', 'IPS'], 89.99, 169.99, 'Everyday'],
    ['ARZOPA S1 TABLE', 'More space for your ideas. One cable for a simpler setup.', ['15.6″', 'USB-C', 'IPS'], 99.99, 199.99, 'Work Anywhere'],
    ['ARZOPA Z1C', 'A clear, colorful view for work, entertainment and everything in between.', ['16.1″', 'Full HD', 'USB-C'], 109.99, 219.99, 'Popular'],
    ['ARZOPA Z3 GAMING', 'Keep up with the action with a smooth, responsive portable screen.', ['16.1″', '2.5K', '180Hz'], 169.99, 329.99, 'Gaming'],
];
export const products = [
    ...monitors.map((p, index) => ({ id: 'monitor-' + index, category: 'monitors', name: p[0], description: p[1], specs: p[2], price: p[3], originalPrice: p[4], badge: p[5], image: monitorImages[index % 4], hoverImage: hoverImages[index] ?? randomHoverImage() })),
    ...['D10 WOOD', 'D10 BLACK', 'D15 FAMILY', 'D10 WHITE', 'D13 GALLERY', 'D15 HOME'].map((name, index) => ({
        id: 'frame-' + index, category: 'frames', name: 'ARZOPA ' + name,
        description: 'Bring your favorite memories to life. Share photos with the people you love.',
        specs: [index % 2 ? '15.6″' : '10.1″', 'Wi-Fi', 'Touchscreen'],
        price: 69.99 + index * 10, originalPrice: 139.99 + index * 10,
        badge: index === 0 ? 'Best Seller' : 'For Home & Family', image: frameImage, hoverImage: randomHoverImage(),
    })),
];
export const formatPrice = value => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);

