export default function ProductOverview() {
    return (
        <section className="product-overview">
            <h2>PRODUCTS</h2>
            <div className="product-icons">
                <div className="product-card">
                    <img src="/content-images/icons/electrical.png" alt="Electrical" />
                    <p>ELECTRICAL</p>
                </div>
                <div className="product-card">
                    <img src="/content-images/icons/hardware.png" alt="Hardware" />
                    <p>HARDWARE</p>
                </div>
                <div className="product-card">
                    <img src="/content-images/icons/telecom.png" alt="Telecom" />
                    <p>TELECOM</p>
                </div>
                <div className="product-card">
                    <img src="/content-images/icons/volume_discounts.png" alt="Volume Discounts" />
                    <p>VOLUME DISCOUNTS</p>
                </div>
                <div className="product-card">
                    <img src="/content-images/icons/retail_online_stores.png" alt="Retail & Online" />
                    <p>RETAIL & ONLINE STORES</p>
                </div>
            </div>
        </section>
    );
}