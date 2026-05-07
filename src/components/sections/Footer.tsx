import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { footerColumns } from '@/data/footerLinks';
import { fadeUp, useEntrance } from '@/lib/motion';

const isInternal = (href: string) => href.startsWith('/');

const Footer = () => {
  const entrance = useEntrance();

  return (
    <footer className="footer-section surface-inverted" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <motion.div
        {...entrance}
        variants={fadeUp}
        className="page-container footer-inner"
      >
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              to="/"
              aria-label="Dreamz Automation home"
              className="footer-logo-link"
            >
              <img
                src="/logos/Company/Icon.png"
                alt=""
                aria-hidden="true"
                className="footer-logo-icon"
              />
              <img
                src="/logos/Company/Logo.png"
                alt="Dreamz Automation Systems Pvt. Ltd."
                className="footer-logo-image"
              />
            </Link>
            <address className="footer-address">
              Ajanta Compound, 3/19, Industrial Area Site II,
              <br />
              Loni Road, Ghaziabad – 201007,
              <br />
              UP, India
            </address>
            <div className="footer-badge">
              <span className="footer-badge-dot" aria-hidden="true" />
              Siemens Authorized System House
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav
              key={col.title}
              className="footer-column"
              aria-label={col.title}
            >
              <div className="footer-column-title">{col.title}</div>
              <ul className="footer-link-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {isInternal(link.href) && !link.href.includes('#') ? (
                      <Link className="footer-link" to={link.href}>
                        {link.label}
                      </Link>
                    ) : (
                      <a className="footer-link" href={link.href}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Dreamz Automation Systems Pvt. Ltd.
          </div>
          <div className="footer-legal-links">
            <a className="footer-link" href="#">
              Privacy Policy
            </a>
            <span aria-hidden="true" className="footer-legal-sep">
              ·
            </span>
            <a className="footer-link" href="#">
              Terms
            </a>
            <span aria-hidden="true" className="footer-legal-sep">
              ·
            </span>
            <a className="footer-link" href="#">
              Sitemap
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
