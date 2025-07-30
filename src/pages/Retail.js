import '../assets/styles/retail.css';
import HeroSection from "../components/HeroSection";

export default function Retail() {
    return (
        <div className="promotions-container">
            <HeroSection
                title={
                    <span>
                        RETAIL
                    </span>
                }
                paragraphs={[
                    <>Our products can be found at the following retailers. If interested in samples of any of our products, please fill out the form below and our team will get back to you!</>
                ]}
                buttons={[
                    { text: "AMAZON", link: "https://a.co/d/3f9qvc3" },
                    { text: "WALMART", link: "https://www.walmart.com/ip/3583563687" },
                ]}
                backgroundType="image"
                backgroundSrc="/content-images/retail/retail-hero-background.jpg"
                backgroundAlt="Thorsmex Factory"
                overlay={true}
            />
        </div>
    );
}
