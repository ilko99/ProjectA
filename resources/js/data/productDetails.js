import { products } from './products';

export const productSlug = product => product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const featured = {
    'monitor-0': {
        title: 'Arzopa Z3FC 16.1″ 2.5K 180Hz Portable Gaming Monitor FreeSync',
        highlights: [
            ['Unrivaled Gaming Speed', 'A 180Hz refresh rate for smooth, responsive gaming and everyday work.'],
            ['Elite 2.5K Visuals', '2560 × 1440 resolution and 400 nits brightness bring finer detail into view.'],
            ['Console Companion', 'Connect your laptop or console through USB-C or mini HDMI.'],
            ['Game Anywhere', 'A lightweight 780g design with an integrated adjustable stand.'],
            ['Travel-Ready Design', 'A metal body and matte finish for a portable setup.'],
        ],
        specs: {
            'Screen size': '16.1″', 'Panel type': 'IPS', 'Aspect ratio': '16:9',
            'Resolution': '2560 × 1440', 'Display color': '8-bit', 'Refresh rate': '180Hz',
            'HDR': 'Yes', 'FreeSync': 'Yes', 'Net weight': '780g',
            'Interface': '2 × USB-C (USB 3.1), 1 × mini HDMI (2.0)',
            'Contrast ratio': '1000:1', 'Brightness': '400 nits', 'Color gamut': '107% sRGB',
            'Dimensions': '366 × 228 × 9.3mm', 'Built-in speakers': '2 × 1W',
            'Material': 'Aluminum alloy', 'Stand': 'Built-in stand', 'Rated power': '12.9W',
            'Touchscreen': 'No', 'Warranty': '2-year standard warranty',
        },
        bestFor: 'Gaming / Productivity',
    },
    'monitor-3': {
        title: 'Arzopa Z1FC 16.1″ 144Hz Portable Gaming Monitor',
        specs: { 'Screen size': '16.1″', 'Panel type': 'IPS', 'Resolution': '1920 × 1080', 'Aspect ratio': '16:9', 'Refresh rate': '144Hz', 'Color gamut': '106% sRGB', 'FreeSync': 'No', 'Stand': 'Built-in stand', 'Built-in speakers': 'Yes', 'Low blue light': 'Yes', 'Material': 'Aluminum alloy' },
        bestFor: 'Gaming / Entertainment',
    },
    'monitor-1': {
        title: 'Arzopa Z1RC 16″ 2.5K Portable Monitor',
        specs: { 'Screen size': '16″', 'Panel type': 'IPS', 'Resolution': '2560 × 1600', 'Aspect ratio': '16:10', 'Refresh rate': '60Hz', 'Color gamut': '123% sRGB', 'FreeSync': 'No', 'Stand': 'Built-in stand', 'Built-in speakers': 'Yes', 'Low blue light': 'Yes', 'Material': 'Aluminum alloy' },
        bestFor: 'Productivity / Creative',
    },
};

export function getProductDetails(product) {
    const details = featured[product.id] || {};
    return {
        title: details.title || product.name,
        highlights: details.highlights || [['Designed for your everyday', product.description], ['Display highlights', product.specs.join(' · ')]],
        specs: details.specs || Object.fromEntries(product.specs.map((spec, index) => [['Screen size', 'Display', 'Feature'][index], spec])),
        bestFor: details.bestFor || (product.category === 'frames' ? 'Home & Family' : 'Everyday work & play'),
    };
}

export const comparisonProducts = ['monitor-0', 'monitor-3', 'monitor-1'].map(id => products.find(product => product.id === id));
export const featureImage = (source, crop, size) => ({ source: '/images/product/' + source + '.png', crop, size });
export const z3Gallery = [
    { label: 'Front and protective cover', ...featureImage('gallery', [248, 78, 880, 780], [2048, 1004]) },
    { label: '2.5K display detail', source: '/images/home/arzopa-z3fc-gray.webp' },
    { label: '180Hz performance', ...featureImage('features', [218, 113, 643, 326], [2048, 914]) },
    { label: 'Color and contrast', ...featureImage('color', [460, 140, 1120, 770], [2048, 936]) },
    { label: 'Adjustable stand', ...featureImage('features', [1194, 112, 315, 633], [2048, 914]) },
    { label: 'Flexible viewing modes', ...featureImage('modes', [215, 63, 565, 786], [2048, 877]) },
];
