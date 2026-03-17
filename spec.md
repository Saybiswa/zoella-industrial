# Zoella Industrial

## Current State
Fully built industrial website with 12 placeholder products across 8 categories using placehold.co image URLs. Product names are generic.

## Requested Changes (Diff)

### Add
- New product categories: Electricals, Safety Items, Soldering Station
- New products: Propeller Fan, Soldering Station (Weller), Cotton Hand Gloves, RFT-V3 Power Relay, IFM Pressure Sensor

### Modify
- Replace all placeholder image URLs with real uploaded product images from IndiaMART screenshots
- Update product names and descriptions to match real Zoella Marketing & Infra Solution product catalog
- Update categories list to match actual catalog: Electric Fans, Cassette Air Conditioner, Propeller Fans, Fan Coil Unit, Ultrasonic Cleaner, Vacuum Cleaner, Metal Valves, Electricals, Safety Items
- Map uploaded images to correct product categories:
  - /assets/uploads/image-5-6.png -> Electric Fans & Metal Valves products
  - /assets/uploads/image-4-5.png -> Cassette AC & Propeller Fan products
  - /assets/uploads/image-2-3.png -> Hi-Wall Fan Coil Unit & Ultrasonic Cleaner products
  - /assets/uploads/image-3-4.png -> Electricals & New Items
  - /assets/uploads/image-1.png -> Wet Dry Vacuum Cleaner & Soldering Station
  - /assets/uploads/image-1-2.png -> Safety Items & Pressure Sensors

### Remove
- All placehold.co placeholder image URLs
- Generic product names that don't match Zoella's actual catalog

## Implementation Plan
1. Update PRODUCTS array with real product names, descriptions matching IndiaMART catalog
2. Update CATEGORIES array to match actual product lines
3. Map uploaded screenshot images to relevant product cards
4. Keep all animations, filtering, lightbox, FAQ, contact form intact
