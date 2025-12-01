import { formatCountryCode } from '../../app/lib/country';

interface ProductDetailsProps {
    item: any;
}

const getLinkTypeLabel = (key: string) => {
    if (key.includes('recipeInfo')) return '🍳 Recipes';
    if (key.includes('hasRetailers')) return '🛒 Retailers';
    if (key.includes('pip')) return '📄 Product Information Page';
    if (key.includes('sustainabilityInfo')) return '🌱 Sustainability';
    const parts = key.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.replace(/([A-Z])/g, ' $1').trim();
};

export default function ProductDetails({ item }: ProductDetailsProps) {
    return (
        <div className="company-info-section">
            <div className="product-title-section">
                <h2 className="product-main-title">
                    {item.productDescription?.[0]?.value || 'Product Information'}
                </h2>
            </div>
            <div className="product-details-section">
                <div className="product-body">
                    {item.productImageUrl?.[0]?.value && (
                        <div className="product-image-section">
                            <img
                                src={item.productImageUrl[0].value}
                                alt={item.productDescription?.[0]?.value}
                                className="product-image"
                            />
                        </div>
                    )}
                </div>

                <div className="product-details-section">
                    <div className="detail-row">
                        <span className="detail-label">GTIN</span>
                        <span className="detail-value">{item.gtin}</span>
                    </div>

                    {item.brandName?.[0]?.value && (
                        <div className="detail-row">
                            <span className="detail-label">Brand name</span>
                            <span className="detail-value">{item.brandName[0].value}</span>
                        </div>
                    )}

                    {item.productDescription?.[0]?.value && (
                        <div className="detail-row">
                            <span className="detail-label">Product description</span>
                            <span className="detail-value">{item.productDescription[0].value}</span>
                        </div>
                    )}

                    {item.productImageUrl?.[0]?.value && (
                        <div className="detail-row">
                            <span className="detail-label">Product image URL</span>
                            <a
                                href={item.productImageUrl[0].value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="detail-value-link"
                            >
                                {item.productImageUrl[0].value}
                            </a>
                        </div>
                    )}

                    {item.gpcCategoryCode && (
                        <div className="detail-row">
                            <span className="detail-label">Global product category</span>
                            <span className="detail-value">{item.gpcCategoryCode}</span>
                        </div>
                    )}

                    {item.netContent && item.netContent.length > 0 && (
                        <div className="detail-row">
                            <span className="detail-label">Net content</span>
                            <span className="detail-value-bold">
                                {item.netContent[0].value} {item.netContent[0].unitCode}
                            </span>
                        </div>
                    )}

                    {item.countryOfSaleCode && item.countryOfSaleCode.length > 0 && (
                        <div className="detail-row">
                            <span className="detail-label">Country of sale</span>
                            <span className="detail-value">
                                {formatCountryCode(item.countryOfSaleCode[0])}
                            </span>
                        </div>
                    )}
                </div>

                {item.linkset && item.linkset.length > 0 && (
                    <div className="links-section">
                        <h3 className="links-title">Digital Links & Resources</h3>
                        {item.linkset.map((linkGroup: any, groupIndex: number) => (
                            <div key={groupIndex}>
                                {Object.keys(linkGroup).map((key) => {
                                    if (key === 'anchor' || key === 'description' || typeof linkGroup[key] !== 'object') {
                                        return null;
                                    }

                                    const links = linkGroup[key];
                                    if (!Array.isArray(links)) return null;

                                    return (
                                        <div key={key} className="link-group">
                                            <p className="link-group-title">{getLinkTypeLabel(key)}</p>
                                            {links.map((link: any, linkIdx: number) => (
                                                <a
                                                    key={linkIdx}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="link-item"
                                                >
                                                    {link.title || link.href}
                                                    {link.hreflang && ` (${link.hreflang.join(', ').toUpperCase()})`}
                                                </a>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}