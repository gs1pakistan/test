"use client";
import { useState } from "react";
import Link from "next/link";
import "./home.css";

interface Category {
  name: string;
  key: string;
  entranceFees: FeeRow[];
  annualFees: FeeRow[];
  verificationFees?: VerificationFeeSection[];
}

interface FeeRow {
  label: string;
  fee: number;
  pra: number;
  total: number;
}

interface VerificationFeeSection {
  title: string;
  fees: VerificationFeeRow[];
}

interface VerificationFeeRow {
  description: string;
  perUnit: number;
  pra: number;
  total: number;
}

export default function HomePage() {
  const [visibleCategory, setVisibleCategory] = useState<string | null>(null);

  // Separated paths object
  const categoryPaths = {
    general: "/general",
    healthcare: "/healthcare",
    udi: "/udi",
    textile: "/textile",
    update: "/update",
  };

  // Separated descriptions object
  const categoryDescriptions = {
    general:
      "The General category covers various products like packaged food, agricultural items, and industrial goods. Assigning GTINs ensures accurate identification and traceability.",
    healthcare:
      "The Healthcare category covers medical products and pharmaceuticals. GS1 standards ensure accurate identification, traceability, patient safety, and regulatory compliance.",
    udi: "The UDI category focuses on uniquely identifying medical devices. Assigning UDIs ensures better monitoring, traceability, recalls, and improved patient safety.",
    textile:
      "The Textile category covers fabrics, garments, home textiles, and ready-made garments. Assigning GTINs ensures accurate identification, efficient tracking, and better inventory management.",
    update:
      "Use the Update Form to modify product details, attributes, or other information. Keeping data updated ensures accuracy, consistency, and better supply chain management.",
  };

  const categories: Category[] = [
    {
      name: "General",
      key: "general",
      entranceFees: [
        { label: "For 1 GTIN-13s / GLN", fee: 20934, pra: 3349, total: 24284 },
        { label: "For 10 GTIN-13s", fee: 20934, pra: 3349, total: 24284 },
        {
          label: "Above 10 GTIN-13s (50% of Entrance Fee)",
          fee: 41870,
          pra: 6699,
          total: 48569,
        },
      ],
      annualFees: [
        { label: "1 GTIN-13 / GLN", fee: 8723, pra: 1396, total: 10119 },
        { label: "10 GTIN-13s", fee: 8723, pra: 1396, total: 10119 },
        { label: "100 GTIN-13s", fee: 13957, pra: 2233, total: 16190 },
        { label: "300 GTIN-13s", fee: 17446, pra: 2791, total: 20238 },
        { label: "500 GTIN-13s", fee: 26168, pra: 4187, total: 30355 },
        { label: "1,000 GTIN-13s", fee: 34891, pra: 5583, total: 40474 },
      ],
    },
    {
      name: "Healthcare",
      key: "healthcare",
      entranceFees: [
        {
          label: "Healthcare for GLN 13s",
          fee: 33601,
          pra: 5376,
          total: 38977,
        },
        {
          label: "Healthcare for GTINs 14s ",
          fee: 67201,
          pra: 10752,
          total: 77953,
        },
      ],
      annualFees: [
        { label: "1 GLN-13s", fee: 12037, pra: 1926, total: 13049 },
        { label: "100 GTIN-14s", fee: 19260, pra: 3082, total: 22341 },
        { label: "300 GTIN-14s", fee: 24075, pra: 3852, total: 27927 },
        { label: "500 GTIN-14s", fee: 36113, pra: 5778, total: 41891 },
        { label: "1,000 GTIN-14s", fee: 48151, pra: 7704, total: 55855 },
      ],
      verificationFees: [
        {
          title: "Barcode Verification Fees: (1D)",
          fees: [
            {
              description: "GTIN - 13\s (1-10 Per GTINs)",
              perUnit: 782,
              pra: 125,
              total: 907,
            },
            {
              description: "GTIN - 13\s (Above 10 Per GTINs)",
              perUnit: 652,
              pra: 104,
              total: 756,
            },
          ],
        },
        {
          title: "Barcode Verification Fees: (2D) Data Matrix",
          fees: [
            {
              description: "2D Data Matrix - 14\s (1-10 Per GTINs)",
              perUnit: 1435,
              pra: 230,
              total: 1665,
            },
            {
              description: "2D Data Matrix - 14\s (Above 10 Per GTINs)",
              perUnit: 1304,
              pra: 209,
              total: 1513,
            },
          ],
        },
      ],
    },
    {
      name: "UDI",
      key: "udi",
      entranceFees: [
        { label: "UDI for GLN ", fee: 33601, pra: 5376, total: 38977 },
        { label: "UDI for GTINs 14s ", fee: 67201, pra: 10752, total: 77953 },
      ],
      annualFees: [
        { label: "1 GLN-13s", fee: 36111, pra: 5778, total: 41889 },
        { label: "100 GTIN-14s", fee: 57778, pra: 9245, total: 67023 },
        { label: "300 GTIN-14s", fee: 72223, pra: 11556, total: 83779 },
        { label: "500 GTIN-14s", fee: 108339, pra: 17334, total: 125674 },
        { label: "1,000 GTIN-14s", fee: 144451, pra: 23112, total: 167563 },
      ],
      verificationFees: [
        {
          title: "Barcode Verification Fees: (1D)",
          fees: [
            {
              description: "GTIN - 13\s (1-10 Per GTINs)",
              perUnit: 750,
              pra: 120,
              total: 907,
            },
            {
              description: "GTIN - 13\s (Above 10 Per GTINs)",
              perUnit: 700,
              pra: 112,
              total: 812,
            },
          ],
        },
        {
          title: "Barcode Verification Fees: (2D) Data Matrix",
          fees: [
            {
              description: "2D Data Matrix - 14\s (1-10 Per GTINs)",
              perUnit: 1196,
              pra: 191,
              total: 1387,
            },
            {
              description: "2D Data Matrix - 14\s (Above 10 Per GTINs)",
              perUnit: 1087,
              pra: 174,
              total: 1261,
            },
          ],
        },
      ],
    },
    {
      name: "Textile",
      key: "textile",
      entranceFees: [
        { label: "Textile GTINs-13s", fee: 41870, pra: 6699, total: 48569 },
        { label: "Textile  GLNs -13s", fee: 32600, pra: 5216, total: 37816 },
      ],
      annualFees: [
        { label: "1 GLN-13s", fee: 8723, pra: 1396, total: 10119 },
        { label: "100 GTIN-13s", fee: 13957, pra: 2233, total: 16190 },
        { label: "1,000 GTIN-13s", fee: 34891, pra: 5583, total: 40474 },
        { label: "10,000 GTIN-13s", fee: 156311, pra: 25010, total: 181321 },
        { label: "100,000 GTIN-13s", fee: 358691, pra: 57391, total: 416082 },
      ],
      verificationFees: [
        {
          title: "Barcode Verification Fees: (1D)",
          fees: [
            {
              description: "GTIN - 13\s (1-10 Per GTINs)",
              perUnit: 750,
              pra: 120,
              total: 870,
            },
            {
              description: "GTIN - 13\s (Above 10 Per GTINs)",
              perUnit: 700,
              pra: 112,
              total: 812,
            },
          ],
        },
      ],
    },
    {
      name: "Update",
      key: "update",
      entranceFees: [
        { label: "update GTINs-13s", fee: 41870, pra: 6699, total: 48569 },
        { label: "update  GLNs -13s", fee: 32600, pra: 5216, total: 37816 },
      ],
      annualFees: [
        { label: "1 GLN-13s", fee: 8723, pra: 1396, total: 10119 },
        { label: "100 GTIN-13s", fee: 13957, pra: 2233, total: 16190 },
        { label: "1,000 GTIN-13s", fee: 34891, pra: 5583, total: 40474 },
        { label: "10,000 GTIN-13s", fee: 156311, pra: 25010, total: 181321 },
        { label: "100,000 GTIN-13s", fee: 358691, pra: 57391, total: 416082 },
      ],
      verificationFees: [
        {
          title: "Barcode Verification Fees: (1D)",
          fees: [
            {
              description: "GTIN - 13\s (1-10 Per GTINs)",
              perUnit: 750,
              pra: 120,
              total: 870,
            },
            {
              description: "GTIN - 13\s (Above 10 Per GTINs)",
              perUnit: 700,
              pra: 112,
              total: 812,
            },
          ],
        },
      ],
    },
  ];

  // Filter categories for pricing section - exclude 'update'
  const pricingCategories = categories.filter(
    (category) => category.key !== "update",
  );

  const toggleCategory = (key: string) => {
    setVisibleCategory((prev) => (prev === key ? null : key));
  };

  const formatCurrency = (amount: number) => `PKR ${amount.toLocaleString()}`;

  const renderFeeTable = (
    title: string,
    fees: FeeRow[],
    showNote: boolean = false,
  ) => (
    <div className="fee-section">
      <h3 className="fee-title">{title}</h3>
      <div className="fee-table">
        <div className="fee-row fee-header">
          <div>GTIN/ GLN</div>
          <div>Fee Amount</div>
          <div>PRA (16%)</div>
          <div>Total</div>
        </div>
        {fees.map((row, index) => (
          <div key={index} className="fee-row">
            <div>{row.label}</div>
            <div>{formatCurrency(row.fee)}</div>
            <div>{formatCurrency(row.pra)}</div>
            <div className="fee-total">{formatCurrency(row.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVerificationFeeTable = (
    verificationSection: VerificationFeeSection,
  ) => (
    <div className="fee-section" key={verificationSection.title}>
      <h3 className="fee-title">{verificationSection.title}</h3>
      <div className="fee-table">
        <div className="fee-row fee-header">
          <div>Description</div>
          <div>Per Unit</div>
          <div>PRA (16%)</div>
          <div>Total Fee</div>
        </div>
        {verificationSection.fees.map((row, index) => (
          <div key={index} className="fee-row">
            <div>{row.description}</div>
            <div>{formatCurrency(row.perUnit)}</div>
            <div>{formatCurrency(row.pra)}</div>
            <div className="fee-total">{formatCurrency(row.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">GS1 Pakistan Online Applications</h1>
          <p className="hero-subtitle">
            Choose your registration type to begin your GS1 journey
          </p>
        </div>
      </header>

      {/* Registration Cards */}
      <section className="registration-section">
        <div className="card-grid">
          {categories.map((category) => (
            <div key={category.key} className="registration-card">
              <div className="card-header">
                <h3>{category.name} Application</h3>
                <p>
                  {
                    categoryDescriptions[
                      category.key as keyof typeof categoryDescriptions
                    ]
                  }
                </p>
              </div>
              <Link
                href={categoryPaths[category.key as keyof typeof categoryPaths]}
                className="card-link"
              >
                <button className="primary-button">Apply Now</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Fee Structure - Using filtered categories */}
      <section className="fees-section">
        <h2 className="section-title">Detailed Pricing of all Categories</h2>
        <div className="fee-categories">
          {pricingCategories.map((category) => (
            <div key={category.key} className="fee-category-card">
              <div className="category-header">
                <div className="category-info">
                  <h3>{category.name} Category</h3>
                  <p className="category-desc">
                    {
                      categoryDescriptions[
                        category.key as keyof typeof categoryDescriptions
                      ]
                    }
                  </p>
                </div>
                <button
                  className="toggle-button"
                  onClick={() => toggleCategory(category.key)}
                  aria-expanded={visibleCategory === category.key}
                >
                  {visibleCategory === category.key
                    ? "Hide Details"
                    : "Show Details"}
                </button>
              </div>

              {visibleCategory === category.key && (
                <div className="fee-details">
                  {category.key === "general" &&
                    renderFeeTable(
                      "Entrance Fees",
                      category.entranceFees,
                      true /* showNote */,
                    )}

                  {category.key === "general" && (
                    <p className="fee-note">
                      * Members availing 50% rate for Entrance Fee will be
                      required to pay the balance amount of PKR 20,934 + 16% PRA
                      when applying for additional numbers.
                    </p>
                  )}

                  {category.key === "healthcare" &&
                    renderFeeTable(
                      "Entrance Fees",
                      category.entranceFees,
                      true,
                    )}
                  {category.key === "healthcare" && (
                    <p className="fee-note">
                      * Members availing 50% rate for Entrance Fee will be
                      required to pay the balance amount of PKR 33,601 + 16% PRA
                      when applying for additional numbers.
                    </p>
                  )}

                  {category.key === "udi" &&
                    renderFeeTable(
                      "Entrance Fees",
                      category.entranceFees,
                      true,
                    )}
                  {category.key === "udi" && (
                    <p className="fee-note">
                      * Members availing 50% rate for Entrance Fee will be
                      required to pay the balance amount of PKR 33,601 + 16% PRA
                      when applying for additional numbers.
                    </p>
                  )}

                  {category.key === "textile" &&
                    renderFeeTable(
                      "Entrance Fees",
                      category.entranceFees,
                      true,
                    )}
                  {category.key === "textile" && (
                    <p className="fee-note">
                      * Members availing 50% rate for Entrance Fee will be
                      required to pay the balance amount of PKR 20,934 + 16% PRA
                      when applying for additional numbers.
                    </p>
                  )}

                  {/* Annual Fees */}
                  {renderFeeTable(
                    category.key === "udi"
                      ? "Consolidated Fee Schedule for GTIN-14\\s renewable every three years (Inclusive of Govt. Taxes)"
                      : "Annual Fees",
                    category.annualFees,
                  )}

                  {/* Render Verification Fees if they exist */}
                  {category.verificationFees &&
                    category.verificationFees.map((verificationSection) =>
                      renderVerificationFeeTable(verificationSection),
                    )}

                  {category.key === "general" && (
                    <p className="fee-note">
                      * (Annual Fee Are Due from One Calendar Year of the
                      Allocation Date)
                    </p>
                  )}
                  {category.key === "udi" && (
                    <p className="fee-note">
                      * (Consolidated Fee Schedule for GTIN-14s renewable every
                      three years Inclusive of Govt. Taxes)
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <h4>GS1 Pakistan</h4>
            <p>Enabling a world where things work together.</p>
          </div>
          <div className="footer-contact">
            <p>
              Email: <a href="mailto:info@gs1pk.org">info@gs1pk.org</a>
            </p>
            <p>
              Phone: <a href="tel:+924211111475">021 32215844</a>
            </p>
            <p>
              Address: 2nd Floor, Azzainab Court, Campbell Street 74200 Karachi
              Pakistan
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
