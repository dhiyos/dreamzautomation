import type { RichCaseStudy } from '@/types/content';

// Source: client-supplied "case studis detail.docx" dropped into
// /public/Case Studies/ on 2026-05-15. Architecture diagrams in the source are
// embedded as EMF and cannot be browser-rendered — they're left as TODO image
// exports below. SCADA screenshots and photos extracted as PNG / JPEG and
// placed in /public/images/case-studies/.

const IMG_BASE = '/images/case-studies';

export const richCaseStudies: RichCaseStudy[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'iocl-mathura',
    client: 'IOCL · Mathura Refinery',
    sectorEyebrow: 'Petrochemicals & Refining',
    title: 'Legacy S-5 Hot-Standby upgrade to S7-400H · WinCC V7',
    subtitle:
      'Feed Filter Backwashing system migrated from Simatic S5-155H with WinCC V4 to S7-400H with WinCC V7 — without halting refinery production.',
    year: '2010',
    application: 'Feed Filter Backwashing system',
    intro:
      'Upgradation of a legacy Siemens S-5 Hot-Standby System (155H) running the feed filter backwashing application at Indian Oil Corporation Ltd., Mathura Refinery. Existing controllers and SCADA had reached the end of supportable life; replacement parts were scarce and the operating team was losing visibility through an aging WinCC V4 stack.',
    metrics: [
      { value: 'S5 → S7', label: 'Hot-Standby Migration' },
      { value: 'WinCC V4 → V7', label: 'SCADA Modernisation' },
      { value: '2010', label: 'Year Commissioned' },
    ],
    spec: [
      {
        label: 'Existing PLC',
        value: 'Simatic S5-155H with redundant I/Os · Legacy WinCC V4 SCADA',
      },
      {
        label: 'Upgraded with',
        value: 'Siemens S7-400H with WinCC V7',
      },
      {
        label: 'Application',
        value: 'Feed Filter Backwashing system',
      },
    ],
    sections: [
      {
        label: 'Benefits of Upgradation',
        items: [
          'Reduced plant downtime caused by automation failures and limited support know-how on the existing system.',
          'Enhanced overall system availability — replacing obsolete components that had become impossible to source as spares.',
          'Improved access to system features that were never available in the V4 stack.',
        ],
      },
    ],
    heroImage: {
      src: `${IMG_BASE}/iocl-mathura-scada.png`,
      alt: 'IOCL Mathura Refinery — WinCC V7 SCADA screen for the feed filter backwashing system',
      caption: 'WinCC V7 SCADA · Feed filter backwashing supervisory screen',
    },
    galleryImages: [
      {
        src: `${IMG_BASE}/iocl-mathura-scada-2.png`,
        alt: 'IOCL Mathura — secondary SCADA screen',
        caption: 'Operator station overview',
      },
    ],
    draft: true,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'uflex-bopp',
    client: 'Uflex Industry',
    sectorEyebrow: 'Film Industry · BOPP Line Upgradation',
    title: 'Line-1 upgrade · Barmag extrusion + Dornier line · S5 to S7',
    subtitle:
      'End-to-end electronics upgrade of a legacy Barmag extrusion and Dornier BOPP film line — S5 CPU-948 and 6RA-24 DC drives replaced; new PLC, SCADA, and drive software developed for the complete line.',
    intro:
      'A Barmag-extruder and Dornier-line BOPP installation running on Siemens S5 CPU-948 with 6RA-24 DC drives and a DOS-era black-box SCADA. Frequent unplanned shutdowns, unknown restarts, and an inability to source spares had made the line a daily operational risk. Dreamz scope covered hardware, software, drawings, and commissioning — concept to handover.',
    metrics: [
      { value: 'S5 → S7-400', label: 'PLC Migration' },
      { value: '6RA-24 → AC/DC', label: 'Drive Replacement' },
      { value: 'Concept → Comm.', label: 'Full Scope Delivery' },
    ],
    spec: [
      { label: 'Extrusion System', value: 'Barmag' },
      { label: 'Line System', value: 'Dornier' },
      {
        label: 'Existing PLC',
        value: 'Old Siemens S5 CPU-948 PLC with associated I/Os',
      },
      { label: 'Existing Drives', value: 'Old 6RA-24 DC drives' },
      { label: 'Existing SCADA', value: 'DOS-based third-party SCADA (black box)' },
    ],
    sections: [
      {
        label: 'Scope of Upgradation',
        items: [
          'Supply of new S7-400 PLCs and I/Os for the existing Barmag and Dornier line.',
          'Supply of new AC / DC drives and the associated switchgear.',
          'Development of new PLC, SCADA, and drive software for the complete line.',
          'Revision of engineering drawings to reflect the new hardware.',
          'Installation and wiring of new hardware and panels.',
          'Updating wiring drawings post-installation.',
        ],
      },
      {
        label: 'Need for Upgradation',
        items: [
          'Frequent unplanned shutdowns, unknown restarts, and hardware failures.',
          'No scalability — even small modifications were blocked by the legacy stack.',
          'Slow communication networks and data updates.',
          'Limited display / visualisation; legacy system could not surface detailed information or reports.',
          'Spares had become scarce and expensive to procure.',
        ],
      },
    ],
    heroImage: {
      src: `${IMG_BASE}/uflex-bopp-scada.png`,
      alt: 'Uflex BOPP Line-1 — upgraded SCADA screen',
      caption: 'Post-upgrade SCADA · BOPP line supervisory view',
    },
    galleryImages: [
      {
        src: `${IMG_BASE}/uflex-bopp-scada-2.png`,
        alt: 'Uflex BOPP — additional SCADA screen',
      },
      {
        src: `${IMG_BASE}/uflex-bopp-scada-3.png`,
        alt: 'Uflex BOPP — additional SCADA screen',
      },
      {
        src: `${IMG_BASE}/uflex-bopp-scada-4.png`,
        alt: 'Uflex BOPP — additional SCADA screen',
      },
      {
        src: `${IMG_BASE}/uflex-bopp-scada-5.png`,
        alt: 'Uflex BOPP — additional SCADA screen',
      },
      {
        src: `${IMG_BASE}/uflex-bopp-scada-6.png`,
        alt: 'Uflex BOPP — additional SCADA screen',
      },
    ],
    // TODO: export Existing Architecture (image16.emf) + Upgraded System Architecture
    // (image17.emf, image24.emf) from Word as PNG and drop into
    // /public/images/case-studies/ as uflex-bopp-architecture-{existing,upgraded}.png
    draft: true,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'vacmet-bopp',
    client: 'Vacmet Industry',
    sectorEyebrow: 'Film Industry · BOPP Line Upgradation',
    title: 'BOPP drives upgrade to Sinamics S120 on Profinet',
    subtitle:
      'Section-by-section AC VFD replacement on a running BOPP line — software modified, drives swapped into existing panels, line returned to service.',
    intro:
      'A running BOPP film line at Vacmet Industry retrofitted with Sinamics S120 drive systems on Profinet. Existing panels retained; AC drives and switchgear replaced section by section, with PLC and drive software modified to integrate the new drive network. Commissioned and handed over without rebuilding the panel infrastructure.',
    metrics: [
      { value: 'Sinamics S120', label: 'Drive Family' },
      { value: 'Profinet', label: 'Drive Network' },
      { value: '12', label: 'Sections Upgraded' },
    ],
    sections: [
      {
        label: 'Scope of Upgradation',
        items: [
          'Supply of new AC drives and required switchgear.',
          'Software modification of PLC and drive software for the complete line.',
          'Revision of mounting as per the new hardware.',
          'Installation and wiring of new hardware into the existing panels.',
          'Commissioning and handover.',
        ],
      },
    ],
    equipment: {
      title: 'Sections Upgraded to Sinamics S120 (Profinet)',
      rows: [
        { section: 'SAT Extruder', quantity: '2' },
        { section: 'Melt Pump', quantity: '1' },
        { section: 'SAT Melt Pump', quantity: '2' },
        { section: 'Chill Roll', quantity: '1' },
        { section: 'Chill Roll Nip', quantity: '1' },
        { section: 'Aux Winder & Chill Roll', quantity: '1' },
        { section: 'MDO Threading Chain', quantity: '1' },
        { section: 'Coater Corona Roll', quantity: '1' },
        { section: 'Coater Doctor Roll', quantity: '1' },
        { section: 'MDO-1', quantity: '17' },
        { section: 'Rotary Valve', quantity: '3' },
        { section: 'Screw Feeding', quantity: '1' },
      ],
    },
    // TODO: export Upgraded System Architecture (image25.emf, image26.emf,
    // image27.emf) from Word as PNG and drop into /public/images/case-studies/
    // as vacmet-bopp-architecture.png
    draft: true,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'airport-cms',
    client: 'Bangalore International Airport · Hyderabad International Airport',
    sectorEyebrow: 'Building Management · Airports',
    title: 'Condition Monitoring System for lifts, escalators & travelators',
    subtitle:
      'Continuous condition monitoring across Bangalore and Hyderabad airports — early fault detection, SMS alerts, and live status into the building management system over Modbus TCP/IP.',
    intro:
      'A Condition Monitoring System (CMS) deployed across lift, escalator, and travelator infrastructure at Bangalore International Airport and Hyderabad International Airport. Continuous monitoring of operating conditions surfaces early signs of wear and failure long before breakdown, reducing manual inspection load and unplanned downtime in two of India’s busiest passenger terminals.',
    metrics: [
      { value: '2', label: 'Airports' },
      { value: 'Modbus TCP/IP', label: 'BMS Integration' },
      { value: 'SMS', label: 'Event Alerts' },
    ],
    sections: [
      {
        label: 'Equipment under monitoring',
        items: ['Lifts', 'Escalators', 'Travelators'],
      },
      {
        label: 'Key Project Features',
        items: [
          'Continuously monitor operating conditions across the installed fleet.',
          'Detect early signs of faults or wear before they cascade into breakdowns.',
          'Predict failures before breakdown occurs — minimising service impact on passenger flow.',
          'Reduce the manual inspection load and overall downtime.',
          'Event-based SMS generation for faults and alarms.',
          'Status forwarded to the third-party BMS over Modbus TCP/IP.',
        ],
      },
    ],
    heroImage: {
      src: `${IMG_BASE}/airport-cms-screen.png`,
      alt: 'Airport CMS — supervisory dashboard',
      caption: 'CMS supervisory dashboard',
    },
    galleryImages: [
      {
        src: `${IMG_BASE}/airport-cms-screen-2.png`,
        alt: 'Airport CMS — escalator status screen',
      },
      {
        src: `${IMG_BASE}/airport-cms-screen-3.png`,
        alt: 'Airport CMS — lift status screen',
      },
      {
        src: `${IMG_BASE}/airport-cms-screen-4.png`,
        alt: 'Airport CMS — alarm log screen',
      },
      {
        src: `${IMG_BASE}/airport-cms-screen-5.png`,
        alt: 'Airport CMS — trend / history screen',
      },
    ],
    draft: true,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'dmrc-metro-line-3',
    client: 'Delhi Metro Rail Corporation · Line 3',
    sectorEyebrow: 'Transportation · Metro Tunnels',
    title: 'NP SCADA subsystem · 22 stations · 31.5 km',
    subtitle:
      'A Non-Power / Telecom SCADA subsystem delivered for the DMRC Line 3 extension — 22 mainline stations across 31.5 kilometres, with interfaces to TVS, ECS, PS & BS, lifts, and escalators.',
    partnerLine: 'In partnership with Siemens',
    intro:
      'A Non-Power / Telecom SCADA subsystem for the DMRC Line 3 extension — providing monitoring, alarm annunciation, control, and reporting to support operational and maintenance activities, with provisions for generating reports and analysing on-line and historical data. Subsystems covered include Fibre Optics Transmission (SDH) and Data, Telephone and Direct Line Telephone, Public Address, Passenger Information Displays, TETRA Radio, CCTV, UPS, Clocks, and 48V DC Supply. Additional interfaces extend to Automatic Fare Collection (AFC), the Tunnel Ventilation System (TVS), the Environment Control System (ECS), Power Supply and Building Systems (PS & BS), and lifts and escalators at underground stations.',
    metrics: [
      { value: '22', label: 'Mainline Stations' },
      { value: '31.5 km', label: 'Line Length · 3 km Underground' },
      { value: '13,389', label: 'Tags + Alarms Handled' },
    ],
    sections: [
      {
        label: 'Line 3 — Scope',
        items: [
          'Line length: 31.5 km (3 km underground).',
          'Stations: Mainline 22 (2 underground) · Extensions 6 + 3 (1 underground).',
          'Depot: 1.',
        ],
      },
      {
        label: 'Highlights',
        items: [
          'A client–server architecture providing monitoring, alarm annunciation, control, and reporting — with on-line and historical data analysis built in.',
          'At OCC: 2× dual-redundant servers running Siemens software interfaced to telecom NMS and to signalling (via SIMATIC S7-300 RTUs with redundant CPUs), 1× database server, and 6× client workstations for operators.',
          'At Stations: SIMATIC S7-300 RTUs with redundant CPUs (3 operational sets) interfacing to TVS, ECS, PS, BS, lifts, and escalators; web-based I/O units interfacing to Power Supply and auxiliary inputs from telecom equipment.',
        ],
      },
    ],
    dataHandled: [
      { label: 'External Tags · TVS & ECS', value: '6,814' },
      { label: 'Internal Tags · Telecom Data', value: '500' },
      { label: 'Alarms & Events', value: '6,575' },
    ],
    heroImage: {
      src: `${IMG_BASE}/dmrc-line-3-station.jpeg`,
      alt: 'DMRC Line 3 — station-level CMS view',
      caption: 'Station-level supervisory view',
    },
    // TODO: export the two system architecture diagrams (image35.emf, image37.emf)
    // from Word as PNG and place them at
    // /public/images/case-studies/dmrc-architecture-{occ,station}.png
    draft: true,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'kumarhati-solan-tunnel',
    client: 'Road Tunnel Authority · Kumarhati, Solan',
    sectorEyebrow: 'Transportation · Road Tunnel Automation',
    title: 'PLC, VFD & SCADA delivery for a Himachal road tunnel',
    subtitle:
      'Full supply and engineering scope for a road tunnel automation project at Kumarhati, Solan — PLC panels, VFD panels, SCADA system, and on-site integration of all field devices.',
    intro:
      'A road tunnel automation project at Kumarhati, Solan (Himachal Pradesh) — covering supply of PLC and VFD panels and the SCADA system, plus on-site installation, software development, and field-device integration. Five PLCs, three VFD panels, and a single SCADA station, integrated with the in-tunnel field instrumentation and equipped with fault-log reporting.',
    metrics: [
      { value: '5', label: 'PLCs Installed' },
      { value: '3', label: 'VFD Panels' },
      { value: '1', label: 'SCADA Station' },
    ],
    sections: [
      {
        label: 'Scope of Supply — Material',
        items: [
          'Supply of PLC panels.',
          'Supply of VFD panels.',
          'Supply of the SCADA system.',
        ],
      },
      {
        label: 'Engineering Scope',
        items: [
          'PLC software development.',
          'SCADA screen development.',
          'VFD configuration and programming.',
        ],
      },
      {
        label: 'Site Scope',
        items: [
          'Installation of PLCs — 5 nos.',
          'Installation of VFD panels — 3 nos.',
          'SCADA PC — 1 no.',
          'VFD configuration and programming on site.',
          'Integration of field devices for tunnel functionality.',
          'Fault-log reporting.',
        ],
      },
    ],
    heroImage: {
      src: `${IMG_BASE}/kumarhati-tunnel.png`,
      alt: 'Kumarhati Solan road tunnel — SCADA screen',
      caption: 'SCADA supervisory screen',
    },
    // TODO: export system architecture (image38.emf, image39.emf) from Word as PNG
    // and place at /public/images/case-studies/kumarhati-architecture.png
    draft: true,
  },
];

export const richCaseStudiesBySlug = (): Map<string, RichCaseStudy> => {
  const m = new Map<string, RichCaseStudy>();
  for (const cs of richCaseStudies) m.set(cs.slug, cs);
  return m;
};
