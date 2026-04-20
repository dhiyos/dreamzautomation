const NAV_ITEMS = [
  "Solutions",
  "Industries",
  "Products",
  "Case Studies",
  "Insights",
  "About",
];

const Nav = () => {
  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md shadow-none"
      style={{
        backgroundColor: "hsl(var(--bg-primary) / 0.92)",
        borderBottom: "1px solid hsl(var(--line-default))",
      }}
    >
      <nav
        aria-label="Primary"
        className="page-container flex items-center justify-between"
        style={{ paddingTop: 18, paddingBottom: 18 }}
      >
        {/* Logo group */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <span
            className="flex items-center justify-center bg-accent-blue text-text-primary"
            style={{ width: 28, height: 28, fontWeight: 800, fontSize: 16, lineHeight: 1 }}
            aria-hidden="true"
          >
            A
          </span>
          <span
            className="text-text-primary uppercase"
            style={{ fontWeight: 700, fontSize: 14, letterSpacing: "0.02em" }}
          >
            DREAMZ AUTOMATION
          </span>
        </a>

        {/* Center nav */}
        <ul className="hidden md:flex items-center" style={{ gap: 32 }}>
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-text-muted hover:text-text-primary transition-colors duration-150"
                style={{ fontWeight: 500, fontSize: 13 }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#"
          className="bg-accent-blue hover:bg-accent-blue-hover text-text-primary uppercase transition-colors duration-150 shrink-0 inline-block"
          style={{
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.02em",
            padding: "10px 20px",
          }}
        >
          Request an Assessment
        </a>
      </nav>
    </header>
  );
};

export default Nav;
