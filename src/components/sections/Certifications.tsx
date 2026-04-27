import { Eyebrow } from '@/components/shared/Eyebrow';
import { certifications } from '@/data/certifications';

const Certifications = () => {
  return (
    <section
      role="region"
      aria-labelledby="certifications-heading"
      className="cert-strip-section"
    >
      <div className="page-container cert-strip-header">
        <Eyebrow text="Certifications" variant="blue" />
        <h2 id="certifications-heading" className="cert-strip-heading">
          Verified,{' '}
          <span className="cert-strip-heading-italic">not self-declared.</span>
        </h2>
      </div>

      <div className="page-container">
        <div className="cert-row">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="cert-strip-item"
              data-accent={cert.accent}
            >
              <div className="cert-strip-mark">
                {cert.logoPath ? (
                  <img src={cert.logoPath} alt={`${cert.title} mark`} />
                ) : (
                  <span aria-hidden="true">{cert.markInitials}</span>
                )}
              </div>
              <div className="cert-strip-text">
                <div className="cert-strip-tag">{cert.categoryTag}</div>
                <div className="cert-strip-title">{cert.title}</div>
                <div className="cert-strip-meta">{cert.details[0].value}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
