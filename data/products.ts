export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    gradient: string;
    frameCount: number;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string; detailImageUrl: string };
    freshnessSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
}

export const products: Product[] = [
    {
        id: "chocolate",
        name: "Dutch Chocolate",
        subName: "Velvety smooth.",
        price: "₹140",
        description: "Premium Cocoa - Almond Milk base - Plant Protein",
        folderPath: "/images/chocolate",
        themeColor: "#8D6E63",
        gradient: "linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)",
        frameCount: 160,
        features: ["Premium Cocoa", "Almond Milk", "Plant Protein"],
        stats: [{ label: "Dairy", val: "0%" }, { label: "Protein", val: "12g" }, { label: "Cocoa", val: "100%" }],
        section1: { title: "Dutch Chocolate.", subtitle: "Velvety smooth." },
        section2: { title: "Decadence redefined.", subtitle: "Rich, dark cocoa blended with creamy almond milk for a guilt-free treat." },
        section3: { title: "Plant-powered energy.", subtitle: "Loaded with natural plant protein to fuel your active lifestyle." },
        section4: { title: "Indulgence without compromise.", subtitle: "" },
        detailsSection: {
            title: "Ethically Sourced Cocoa",
            description: "We source our cocoa from sustainable farms in Ghana, ensuring fair wages and premium quality. Blended with our house-made almond milk, this drink offers a silky texture that rivals traditional dairy shakes, but with zero cholesterol and 100% plant-based goodness.",
            imageAlt: "Chocolate Details",
            detailImageUrl: "/images/chocolate/ezgif-frame-160.jpg"
        },
        freshnessSection: {
            title: "Cold-Crafted Perfection",
            description: "Heat destroys delicate cocoa flavonoids. That's why we mix our Dutch Chocolate cold. Our almond milk is pressed fresh daily, never stored. The result is a clean, robust chocolate flavor that feels heavy on the tongue but light on the stomach."
        },
        buyNowSection: {
            price: "₹140",
            unit: "per 300ml bottle",
            processingParams: ["Plant Based", "Cold Blended", "Dairy Free"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    },
    {
        id: "pomegranate",
        name: "Ruby Pomegranate",
        subName: "Antioxidant powerhouse.",
        price: "₹150",
        description: "Heart Healthy - Cold Pressed - Immunity Booster",
        folderPath: "/images/pomegranate",
        themeColor: "#E57373",
        gradient: "linear-gradient(135deg, #E57373 0%, #C62828 100%)",
        frameCount: 160,
        features: ["Heart Healthy", "Cold Pressed", "Immunity Booster"],
        stats: [{ label: "Additives", val: "0%" }, { label: "Vitamins", val: "A,C,K" }, { label: "Purity", val: "100%" }],
        section1: { title: "Ruby Pomegranate.", subtitle: "Nature's jewel." },
        section2: { title: "Explosion of flavor.", subtitle: "Freshly pressed pomegranate arils delivering a tart and sweet sensation." },
        section3: { title: "Heart healthy goodness.", subtitle: "Packed with powerful antioxidants to protect and rejuvenate." },
        section4: { title: "Pure juice, pure life.", subtitle: "" },
        detailsSection: {
            title: "The Ruby Elixir",
            description: "Each bottle contains the juice of over 1 kg of premium pomegranates. We use a gentle pressing method to extract the juice from the arils without crushing the bitter pith. This results in a sweet, complex flavor profile that is unmatched by commercial concentrates.",
            imageAlt: "Pomegranate Details",
            detailImageUrl: "/images/pomegranate/ezgif-frame-160.jpg"
        },
        freshnessSection: {
            title: "Potent Preservation",
            description: "Pomegranate juice is highly sensitive to light and air. Our bottling line is designed to shield the juice from oxidation at every step. We bottle immediately after pressing to lock in the vibrant color and the potent punicalagins—unique antioxidants found only in pomegranate."
        },
        buyNowSection: {
            price: "₹150",
            unit: "per 300ml bottle",
            processingParams: ["Cold Pressed", "Oxidation Shield", "No Additives"],
            deliveryPromise: "Direct from the pressery to your doorstep. Guaranteed fresh upon arrival.",
            returnPolicy: "Damaged in transit? Instant replacement available."
        }
    }
];
