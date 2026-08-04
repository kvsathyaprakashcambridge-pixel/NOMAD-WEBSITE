const fs = require('fs');
let content = fs.readFileSync('src/pages/Product.jsx', 'utf8');

const oldGalleryDataStart = content.indexOf('const SYSTEM_GALLERY = [');
const oldGalleryDataEnd = content.indexOf(']', oldGalleryDataStart) + 1;

const newGalleryData = `const SYSTEM_GALLERY = [
  {
    id: 'exterior',
    number: '01',
    shortTitle: 'EXTERIOR',
    title: 'EXTERIOR SILHOUETTE',
    description:
      'Structured everyday form with protected front access.',
    image: galleryExteriorImg,
    alt: 'NOMAD X1 exterior silhouette',
  },
  {
    id: 'interior',
    number: '02',
    shortTitle: 'INTERIOR',
    title: 'INTERIOR ORGANISATION',
    description:
      'Divided storage for technology, accessories and daily essentials.',
    image: galleryInteriorImg,
    alt: 'NOMAD X1 interior organisation',
  },
  {
    id: 'laptop',
    number: '03',
    shortTitle: 'LAPTOP',
    title: 'LAPTOP COMPARTMENT',
    description:
      'Protected storage designed around the dedicated laptop compartment.',
    image: galleryLaptopImg,
    alt: 'NOMAD X1 laptop compartment',
  },
  {
    id: 'rear',
    number: '04',
    shortTitle: 'REAR SUPPORT',
    title: 'REAR SUPPORT',
    description:
      'Padded body-side support with discreet storage for smaller valuables.',
    image: galleryRearImg,
    alt: 'NOMAD X1 padded rear support',
  },
  {
    id: 'expansion',
    number: '05',
    shortTitle: 'EXPANSION',
    title: 'EXPANSION AND SUPPORT',
    description:
      'Expandable capacity supported by a structured side profile.',
    image: galleryExpansionImg,
    alt: 'NOMAD X1 expanded side profile',
  },
]`;

content = content.substring(0, oldGalleryDataStart) + newGalleryData + content.substring(oldGalleryDataEnd);

const oldJsxStart = content.indexOf('{/* ─── X1 Interactive Gallery ─── */}');
const oldJsxEnd = content.indexOf('{/* ─── X1 Loadout Ledger ─── */}');

const newJsx = `{/* ─── X1 Interactive Gallery ─── */}
      <section className="section section-dark x1-system-gallery">
        <div className="x1-system-gallery__inner">

          <div className="x1-system-gallery__header">
            <div>
              <span className="eyebrow">
                PRODUCT GALLERY
              </span>

              <h2>
                Inside the system.
              </h2>
            </div>

            <p>
              Five focused views reveal how X1 handles access,
              organisation, protection and expansion.
            </p>
          </div>

          <div className="x1-system-viewer">

            <div className="x1-system-viewer__media">
              <AnimatePresence mode="wait" initial={false}>
                {(() => {
                  const activeSystemItem =
                    SYSTEM_GALLERY.find(
                      (item) => item.id === activeGalleryItem
                    ) ?? SYSTEM_GALLERY[0]
                  
                  return (
                    <motion.img
                      key={activeSystemItem.id}
                      src={activeSystemItem.image}
                      alt={activeSystemItem.alt}
                      className="x1-system-viewer__image"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                      transition={{ 
                        duration: shouldReduceMotion ? 0.15 : 0.24, 
                        ease: shouldReduceMotion ? 'linear' : [0.22, 1, 0.36, 1] 
                      }}
                      decoding="async"
                    />
                  )
                })()}
              </AnimatePresence>

              {(() => {
                const activeSystemItem =
                  SYSTEM_GALLERY.find(
                    (item) => item.id === activeGalleryItem
                  ) ?? SYSTEM_GALLERY[0]
                return (
                  <div className="x1-system-viewer__info">
                    <span>
                      {activeSystemItem.number} / 05
                    </span>

                    <h3>
                      {activeSystemItem.title}
                    </h3>

                    <p>
                      {activeSystemItem.description}
                    </p>
                  </div>
                )
              })()}
            </div>

            <div
              className="x1-system-viewer__selectors"
              aria-label="NOMAD X1 product views"
            >
              {SYSTEM_GALLERY.map((item) => {
                const isActive = activeGalleryItem === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={\`x1-system-viewer__selector \${
                      isActive ? 'is-active' : ''
                    }\`}
                    aria-pressed={isActive}
                    onClick={() => setActiveGalleryItem(item.id)}
                  >
                    <span className="x1-system-viewer__selector-number">
                      {item.number}
                    </span>

                    <span className="x1-system-viewer__selector-copy">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      `;

content = content.substring(0, oldJsxStart) + newJsx + content.substring(oldJsxEnd);

fs.writeFileSync('src/pages/Product.jsx', content);
console.log('Done');
