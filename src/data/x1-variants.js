import obsidianImg from '../assets/nomad-x1-obsidian-uploaded.webp'
import armorImg from '../assets/x1-armor.webp'
import facetImg from '../assets/x1-facet.webp'
import layerImg from '../assets/x1-layer.webp'
import moduleImg from '../assets/x1-module.webp'
import rollImg from '../assets/x1-roll.webp'

import galleryExterior1200 from '../assets/nomad-x1-gallery-01-exterior-1200.webp'
import galleryInterior1200 from '../assets/nomad-x1-gallery-02-interior-1200.webp'
import galleryLaptop1200 from '../assets/nomad-x1-gallery-03-laptop-1200.webp'
import galleryRear1200 from '../assets/nomad-x1-gallery-04-rear-support-1200.webp'
import galleryExpansion1200 from '../assets/nomad-x1-gallery-05-expansion-1200.webp'

import x1Front from '../assets/nomad-x1 front first.png'
import x1Back from '../assets/nomad-x1 back second.png'
import x1Model from '../assets/nomad-x1 model third.png'
import x1Interior from '../assets/nomad-x1 interor fourth.png'

import armorFront from '../assets/x1-armor front first.png'
import armorBack from '../assets/x1-armor back second.png'
import armorModel from '../assets/x1-armor model third.png'
import armorInterior from '../assets/x1-armor interor fourth.png'

export const X1_VARIANTS = [
  { 
    id: 'x1',
    index: '01 / ORIGINAL', 
    series: 'Original modular carry',       
    name: 'NOMAD X1',   
    colour: 'Obsidian Black', 
    price: 8999,  
    img: obsidianImg, 
    alt: 'NOMAD X1 Original backpack in Obsidian Black',        
    cls: 'best-seller-card-arc',
    description: 'The original NOMAD X1 adapts from daily carry to short-journey mode, with protected technology storage and modular organisation throughout.',
    specs: [
      { label: 'Capacity', value: '24-32 L' },
      { label: 'Laptop', value: 'Up to 16"' },
      { label: 'Material', value: 'Weatherproof Canvas' },
      { label: 'Hardware', value: 'Magnetic clasps' }
    ],
    whoItsFor: 'Perfect for the everyday commuter who needs a reliable, adaptable bag that effortlessly transitions from the office to the gym.',
    gallery: [
      { src: x1Front, alt: 'NOMAD X1 Front View' },
      { src: x1Back, alt: 'NOMAD X1 Back View' },
      { src: x1Model, alt: 'NOMAD X1 Model View' },
      { src: x1Interior, alt: 'NOMAD X1 Interior View' }
    ]
  },
  { 
    id: 'armor',
    index: '02 / ARMOR',    
    series: 'Impact-shield carry',          
    name: 'X1 ARMOR',   
    colour: 'Obsidian Black', 
    price: 11499, 
    img: armorImg,    
    alt: 'NOMAD X1 Armor hard-shell backpack in Obsidian Black', 
    cls: 'best-seller-card-arc',
    description: 'X1 ARMOR provides ultimate protection for your gear with its impact-shield hard shell exterior, while maintaining the adaptability of the X1 system.',
    specs: [
      { label: 'Capacity', value: '22-28 L' },
      { label: 'Laptop', value: 'Up to 16"' },
      { label: 'Material', value: 'Polycarbonate Shell' },
      { label: 'Protection', value: 'Impact Resistant' }
    ],
    whoItsFor: 'Ideal for photographers, tech enthusiasts, and travelers who need maximum protection for delicate, high-value equipment.',
    gallery: [
      { src: armorFront, alt: 'NOMAD X1 Armor Front View' },
      { src: armorBack, alt: 'NOMAD X1 Armor Back View' },
      { src: armorModel, alt: 'NOMAD X1 Armor Model View' },
      { src: armorInterior, alt: 'NOMAD X1 Armor Interior View' }
    ]
  },
  { 
    id: 'facet',
    index: '03 / FACET',    
    series: 'Sculpted tech shell',          
    name: 'X1 FACET',   
    colour: 'Obsidian Black', 
    price: 10299, 
    img: facetImg,    
    alt: 'NOMAD X1 Facet sculpted tech backpack in Obsidian Black', 
    cls: 'best-seller-card-arc',
    description: 'X1 FACET combines a sculpted architectural aesthetic with intelligent tech organisation, built for the modern urban environment.',
    specs: [
      { label: 'Capacity', value: '20-25 L' },
      { label: 'Laptop', value: 'Up to 16"' },
      { label: 'Design', value: 'Geometric Shell' },
      { label: 'Access', value: 'Quick-draw tech pocket' }
    ],
    whoItsFor: 'Designed for the style-conscious professional navigating the city with essential technology and minimal bulk.',
    gallery: [
      { src: facetImg, alt: 'NOMAD X1 Facet' }
    ]
  },
  { 
    id: 'layer',
    index: '04 / LAYER',    
    series: 'Multi-compartment carry',      
    name: 'X1 LAYER',   
    colour: 'Obsidian Black', 
    price: 9499,  
    img: layerImg,    
    alt: 'NOMAD X1 Layer multi-compartment backpack in Obsidian Black', 
    cls: 'best-seller-card-arc',
    description: 'X1 LAYER focuses on extreme organisation. With distinct multi-compartment separation, every item has a specific, easily accessible place.',
    specs: [
      { label: 'Capacity', value: '26 L' },
      { label: 'Laptop', value: 'Up to 16"' },
      { label: 'Organisation', value: '4 Main Layers' },
      { label: 'Pockets', value: '14 Individual zones' }
    ],
    whoItsFor: 'Built for the highly organized individual who carries a wide variety of distinct tools, chargers, and accessories daily.',
    gallery: [
      { src: layerImg, alt: 'NOMAD X1 Layer' }
    ]
  },
  { 
    id: 'module',
    index: '05 / MODULE',   
    series: 'Expandable utility system',    
    name: 'X1 MODULE',  
    colour: 'Obsidian Black', 
    price: 12999, 
    img: moduleImg,   
    alt: 'NOMAD X1 Module utility backpack in Obsidian Black',   
    cls: 'best-seller-card-arc',
    description: 'X1 MODULE is our most versatile utility system. Attach and detach external elements as your carry requirements change throughout the day.',
    specs: [
      { label: 'Capacity', value: '28-40 L Expandable' },
      { label: 'Laptop', value: 'Up to 17"' },
      { label: 'System', value: 'Modular external loops' },
      { label: 'Durability', value: 'Heavy-duty webbing' }
    ],
    whoItsFor: 'Perfect for unpredictable routines, heavy packers, and field workers who need a bag that scales up or down instantly.',
    gallery: [
      { src: moduleImg, alt: 'NOMAD X1 Module' }
    ]
  },
  { 
    id: 'roll',
    index: '06 / ROLL',     
    series: 'Flexible roll-top carry',      
    name: 'X1 ROLL',    
    colour: 'Obsidian Black', 
    price: 9999,  
    img: rollImg,     
    alt: 'NOMAD X1 Roll flexible roll-top backpack in Obsidian Black', 
    cls: 'best-seller-card-arc',
    description: 'X1 ROLL offers a flexible, variable-capacity roll-top closure, providing weather resistance and massive top-loading space when required.',
    specs: [
      { label: 'Capacity', value: '22-34 L Variable' },
      { label: 'Laptop', value: 'Up to 16"' },
      { label: 'Closure', value: 'Magnetic roll-top' },
      { label: 'Weather', value: 'High water resistance' }
    ],
    whoItsFor: 'Ideal for cyclists, commuters, and travelers who encounter varying weather and frequently changing capacity needs.',
    gallery: [
      { src: rollImg, alt: 'NOMAD X1 Roll' }
    ]
  }
];
