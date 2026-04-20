import { Eyebrow } from '@/components/shared/Eyebrow';
import { clientLogos } from '@/data/clients';

export const TrustBar = () => {
  const loop = [...clientLogos, ...clientLogos];

  return (
    <section
      role="region"
      aria-label="Client logos"
      className="w-full bg-bg-secondary"
      style={{
        borderTop: '1px solid hsl(var(--line-default))',
        borderBottom: '1px solid hsl(var(--line-default))',
        paddingTop: 36,
        paddingBottom: 36,
      }}
    >
      <h2 className="sr-only">Trusted by industry leaders worldwide</h2>

      <div className="page-container" style={{ marginBottom: 20 }}>
        <Eyebrow text="TRUSTED BY INDUSTRY LEADERS WORLDWIDE" variant="blue" />
      </div>

      <div className="marquee-mask w-full overflow-hidden">
        <div className="marquee-track flex w-fit items-center" style={{ gap: 80 }}>
          {loop.map((logo, idx) => (
            <div
              key={`${logo.id}-${idx}`}
              className="marquee-item shrink-0 text-text-primary"
              style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {logo.displayAs === 'text' ? (
                <span className={logo.textClass}>{logo.name}</span>
              ) : (
                <img
                  src={logo.imagePath}
                  alt={logo.name}
                  style={{ height: 40, width: 'auto' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
