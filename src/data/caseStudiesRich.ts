import type { RichCaseStudy } from '@/types/content';

// Source: client-supplied "case studis detail.docx" dropped into
// /public/Case Studies/ on 2026-05-15. Architecture diagrams in the source
// are embedded as EMF and cannot be browser-rendered — they're left as TODO
// image exports below. SCADA screenshots and photos extracted as PNG / JPEG
// and placed in /public/images/case-studies/.
//
// Every entry is draft: true pending founder review of customer attribution,
// year claims, and outcome phrasing.

const IMG_BASE = '/images/case-studies';

export const richCaseStudies: RichCaseStudy[] = [
  // ─── Petrochemicals & Gas · IOCL Mathura ──────────────────────────────────
  {
    slug: 'iocl-mathura',
    pillarId: 'process',
    solutionItemId: 'petrochem',
    client: 'IOCL · Mathura Refinery',
    sectorEyebrow: 'Petrochemicals & Gas · Mathura, UP',
    title: 'Legacy S-5 Hot-Standby upgrade to S7-400H · WinCC V7',
    valueHeadline:
      'An aging refinery feed-filter system was running on parts no one could supply any more. We swapped the entire automation stack — without halting production.',
    year: '2010',
    application: 'Feed Filter Backwashing system',
    intro:
      'Upgradation of a legacy Siemens S-5 Hot-Standby system (155H) running the feed filter backwashing application at Indian Oil Corporation Ltd., Mathura Refinery.',
    metrics: [
      { value: 'S5 → S7', label: 'Hot-Standby Migration' },
      { value: 'WinCC V4 → V7', label: 'SCADA Modernisation' },
      { value: 'Zero', label: 'Production Loss During Cutover' },
    ],
    challenge: {
      intro:
        'By 2010, the feed filter backwashing system at IOCL Mathura had outlived its support window. The Simatic S5-155H Hot-Standby controller and WinCC V4 SCADA were a full generation behind current Siemens infrastructure. Replacement components had become hard to source. Vendor support know-how had thinned. The operating team was navigating a refinery on a SCADA that could no longer show them what newer systems took for granted.',
      painPoints: [
        'Hardware obsolescence — replacement spares for the S5-155H stack scarce and expensive',
        'SCADA visibility limits — WinCC V4 missing features the operations team had grown to need',
        'Support gap — fewer engineers in the market with deep knowledge of the legacy stack',
        'Refinery operations cannot tolerate prolonged downtime; any migration had to be surgical',
      ],
    },
    workIntro:
      'Like-for-like in function, a generation forward in supportability. The Hot-Standby controller migrated to S7-400H; the SCADA migrated to WinCC V7. The application logic stayed intact. The refinery stayed running.',
    beforeAfter: {
      beforeLabel: 'Legacy Stack',
      before: [
        { label: 'Hot-Standby PLC', value: 'Simatic S5-155H with redundant I/Os' },
        { label: 'SCADA', value: 'WinCC V4' },
        { label: 'Spare parts pipeline', value: 'Obsolete · sporadic supply' },
        { label: 'Vendor support', value: 'Thinning' },
      ],
      afterLabel: 'Now Running',
      after: [
        { label: 'Hot-Standby PLC', value: 'Siemens S7-400H' },
        { label: 'SCADA', value: 'WinCC V7' },
        { label: 'Spare parts pipeline', value: 'Current-generation, active supply' },
        { label: 'Vendor support', value: 'Full current-generation support' },
      ],
    },
    outcome: {
      intro:
        'Plant downtime caused by automation failures has dropped. The refinery now runs on a supportable stack the engineering team can extend instead of patch.',
      benefits: [
        'Unplanned downtime tied to automation failures reduced',
        'Spares pipeline restored to current-generation availability',
        'SCADA features now accessible to operators that weren’t in WinCC V4',
        'Engineering team can modify the application without legacy-system constraints',
      ],
    },
    heroImage: {
      src: `${IMG_BASE}/iocl-mathura-scada.png`,
      alt: 'IOCL Mathura Refinery — WinCC V7 SCADA screen for the feed filter backwashing system',
      caption: 'WinCC V7 · Feed filter backwashing supervisory screen',
    },
    galleryImages: [
      {
        src: `${IMG_BASE}/iocl-mathura-scada-2.png`,
        alt: 'IOCL Mathura — secondary SCADA screen',
        caption: 'Operator station overview',
      },
    ],
    projectFacts: [
      { label: 'Year Commissioned', value: '2010' },
      { label: 'Application', value: 'Feed Filter Backwashing' },
      { label: 'Site', value: 'IOCL Mathura Refinery, UP' },
    ],
    draft: true,
  },

  // ─── BOPP / BOPET · Uflex Industry ─────────────────────────────────────────
  {
    slug: 'uflex-bopp',
    pillarId: 'process',
    solutionItemId: 'bopp',
    client: 'Uflex Industry',
    sectorEyebrow: 'BOPP / BOPET Film Plants · Line-1 Upgradation',
    title: 'Barmag + Dornier line · S5 to S7 · drives + SCADA + panels',
    valueHeadline:
      'A BOPP line built around Siemens S5 was failing more often than it ran. The entire electronics stack was replaced — concept to commissioning, one accountable team.',
    application: 'BOPP Film · Line-1 Upgradation',
    intro:
      'End-to-end electronics upgrade of a Barmag extrusion and Dornier BOPP film line.',
    metrics: [
      { value: 'S5 → S7-400', label: 'PLC Migration' },
      { value: '6RA-24 → AC/DC', label: 'Drive Replacement' },
      { value: 'Concept → Comm.', label: 'Single-Source Scope' },
    ],
    challenge: {
      intro:
        'The Line-1 BOPP plant ran on Siemens S5 CPU-948 with 6RA-24 DC drives and a DOS-era third-party SCADA — a black box no one in operations could see inside. Unplanned shutdowns had become a daily issue. The team couldn’t make even small modifications. Spares were expensive and slow to source. The line was working hard to stay running.',
      painPoints: [
        'Frequent unplanned shutdowns, unknown restarts, and intermittent hardware failures',
        'Zero scalability — no small modification or feature add possible on the legacy stack',
        'Slow communication networks and data updates',
        'SCADA visualisation limited to surface-level info — no reporting depth',
        'Spares scarce and expensive to procure',
      ],
    },
    workIntro:
      'End-to-end. New S7-400 PLCs and I/Os, new AC and DC drives, new switchgear, new SCADA, new drive software, revised drawings, on-site installation and wiring. One team accountable for the whole stack.',
    beforeAfter: {
      beforeLabel: 'Legacy Line-1 Stack',
      before: [
        { label: 'Extrusion System', value: 'Barmag — retained' },
        { label: 'Line System', value: 'Dornier — retained' },
        { label: 'PLC', value: 'Siemens S5 CPU-948 + legacy I/Os' },
        { label: 'Drives', value: '6RA-24 DC drives' },
        { label: 'SCADA', value: 'DOS-based third-party (black box)' },
      ],
      afterLabel: 'Upgraded Line-1 Stack',
      after: [
        { label: 'Extrusion System', value: 'Barmag — retained, new wiring' },
        { label: 'Line System', value: 'Dornier — retained, new wiring' },
        { label: 'PLC', value: 'Siemens S7-400 + new I/Os' },
        { label: 'Drives', value: 'New AC + DC drives + switchgear' },
        { label: 'SCADA', value: 'Modern PLC-integrated SCADA' },
      ],
    },
    outcome: {
      intro:
        'The line is stable. The team can modify it. Operators can see what’s happening on it.',
      benefits: [
        'Daily unplanned shutdowns no longer the operating norm',
        'Engineering team can add features and modifications without rewriting the stack',
        'Faster communication surfaces line state in real time',
        'SCADA shows the detail the operations team needs for shift-level decisions',
        'Spares supply returned to current-generation availability',
      ],
    },
    heroImage: {
      src: `${IMG_BASE}/uflex-bopp-scada.png`,
      alt: 'Uflex BOPP Line-1 — upgraded SCADA screen',
      caption: 'Post-upgrade SCADA · BOPP line supervisory view',
    },
    galleryImages: [
      { src: `${IMG_BASE}/uflex-bopp-scada-2.png`, alt: 'Uflex BOPP — additional SCADA screen' },
      { src: `${IMG_BASE}/uflex-bopp-scada-3.png`, alt: 'Uflex BOPP — additional SCADA screen' },
      { src: `${IMG_BASE}/uflex-bopp-scada-4.png`, alt: 'Uflex BOPP — additional SCADA screen' },
      { src: `${IMG_BASE}/uflex-bopp-scada-5.png`, alt: 'Uflex BOPP — additional SCADA screen' },
      { src: `${IMG_BASE}/uflex-bopp-scada-6.png`, alt: 'Uflex BOPP — additional SCADA screen' },
    ],
    projectFacts: [
      { label: 'Application', value: 'BOPP Line-1 Upgradation' },
      { label: 'Scope', value: 'PLC + Drives + SCADA + Panels + Site' },
    ],
    // TODO: export Existing Architecture (image16.emf) + Upgraded System Architecture
    // (image17.emf, image24.emf) from Word as PNG. Place at
    // /public/images/case-studies/uflex-bopp-architecture-{existing,upgraded}.png
    draft: true,
  },

  // ─── BOPP / BOPET · Vacmet Industry ────────────────────────────────────────
  {
    slug: 'vacmet-bopp',
    pillarId: 'process',
    solutionItemId: 'bopp',
    client: 'Vacmet Industry',
    sectorEyebrow: 'BOPP / BOPET Film Plants · Drive Modernisation',
    title: 'Sinamics S120 retrofit across 12 line sections · Profinet',
    valueHeadline:
      'A running BOPP line needed modern drives without rebuilding the panels. Sinamics S120 retrofitted into the existing infrastructure, section by section.',
    application: 'BOPP Drive Modernisation',
    intro:
      'A running BOPP film line at Vacmet Industry retrofitted with Sinamics S120 drive systems on Profinet. Existing panels retained; AC drives and switchgear replaced section by section.',
    metrics: [
      { value: 'Sinamics S120', label: 'Drive Family' },
      { value: 'Profinet', label: 'Drive Network' },
      { value: '12 Sections', label: 'Retrofitted in Place' },
    ],
    challenge: {
      intro:
        'Vacmet’s BOPP line was operational but ageing on the drive side. The existing panels were sound. The AC drives were not. The plant needed a drive upgrade that respected the existing panel infrastructure — and didn’t require a full mechanical rebuild.',
      painPoints: [
        'Ageing legacy AC drives — reliability and scalability becoming a risk',
        'A full panel rebuild was not on the table — capex and production continuity ruled it out',
        '12 distinct line sections, each with different drive requirements, needed to be coordinated',
      ],
    },
    workIntro:
      'Sinamics S120 drive systems on Profinet across 12 sections — installed inside the existing panel infrastructure. PLC and drive software modified to integrate the new drive network. No panel rebuild required.',
    beforeAfter: {
      beforeLabel: 'Before',
      before: [
        { label: 'Drive Family', value: 'Mixed legacy AC drives' },
        { label: 'Drive Network', value: 'Vendor-specific · not unified' },
        { label: 'Panel Infrastructure', value: 'Existing — sound, retained' },
      ],
      afterLabel: 'After',
      after: [
        { label: 'Drive Family', value: 'Sinamics S120 — Siemens standard' },
        { label: 'Drive Network', value: 'Profinet — unified across all 12 sections' },
        { label: 'Panel Infrastructure', value: 'Existing panels retained; hardware re-mounted' },
      ],
    },
    outcome: {
      intro:
        'Line modernised on the drive side. Existing panel infrastructure preserved. Production continuity maintained throughout the upgrade.',
      benefits: [
        '12 sections now on Sinamics S120 + Profinet — Siemens-standard, current-generation',
        'No panel rebuild required — existing capex preserved',
        'Drive software and PLC integration handled in-line with the upgrade',
        'Production continuity maintained section by section',
      ],
    },
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
    projectFacts: [
      { label: 'Application', value: 'BOPP Drive Modernisation' },
      { label: 'Scope', value: 'Drives + Software + Site Wiring' },
    ],
    // TODO: export Upgraded System Architecture (image25.emf, image26.emf,
    // image27.emf) from Word as PNG. Place at
    // /public/images/case-studies/vacmet-bopp-architecture.png
    draft: true,
  },

  // ─── Lift & Escalator Monitoring · Bangalore + Hyderabad Airports ─────────
  {
    slug: 'airport-cms',
    pillarId: 'process',
    solutionItemId: 'lift',
    client: 'Bangalore Int. Airport · Hyderabad Int. Airport',
    sectorEyebrow: 'Lift & Escalator Monitoring · Airports',
    title: 'Condition Monitoring System · Lifts, Escalators, Travelators',
    valueHeadline:
      'Lifts and escalators at two of India’s busiest airports — monitored continuously, with faults caught before passengers feel them.',
    application: 'Lift / Escalator / Travelator CMS',
    intro:
      'A Condition Monitoring System (CMS) deployed across the lift, escalator, and travelator infrastructure at Bangalore International Airport and Hyderabad International Airport.',
    metrics: [
      { value: '2', label: 'Airports Live' },
      { value: 'Modbus TCP/IP', label: 'BMS Integration' },
      { value: 'SMS', label: 'Direct Maintenance Alerts' },
    ],
    challenge: {
      intro:
        'Lifts, escalators, and travelators at both airports were maintained reactively. Faults surfaced once they were already affecting passenger flow. Manual inspection cycles were the only way to catch wear early — expensive in labour and in the access windows they required at a 24×7 airport.',
      painPoints: [
        'Reactive maintenance model — faults visible only after they affected service',
        'High manual inspection load on operations teams',
        'Limited visibility into operating conditions trending toward failure',
        'Airport BMS had no live signal from vertical-transport assets',
      ],
    },
    workIntro:
      'A Condition Monitoring System covering every lift, escalator, and travelator across the two terminals. Continuous monitoring of operating conditions. Event-based SMS to the maintenance team on faults and alarms. Live status pushed to the third-party BMS over Modbus TCP/IP.',
    beforeAfter: {
      beforeLabel: 'Before CMS',
      before: [
        { label: 'Fault Discovery', value: 'Reactive · only after service was affected' },
        { label: 'Inspection Model', value: 'Manual rounds during access windows' },
        { label: 'BMS Visibility', value: 'No live signal from vertical transport' },
      ],
      afterLabel: 'With CMS',
      after: [
        { label: 'Fault Discovery', value: 'Continuous monitoring · early-warning alerts' },
        { label: 'Inspection Model', value: 'Event-driven · manual rounds reduced' },
        { label: 'BMS Visibility', value: 'Live status over Modbus TCP/IP' },
      ],
    },
    outcome: {
      intro:
        'Maintenance teams now respond to early signals instead of breakdowns. Inspection workload has dropped. The BMS sees the fleet.',
      benefits: [
        'Early-fault detection — issues surface before they cascade into service-affecting breakdowns',
        'Manual inspection rounds reduced',
        'SMS alerts route faults directly to the maintenance team',
        'Live operational status streamed to the airport BMS',
      ],
    },
    heroImage: {
      src: `${IMG_BASE}/airport-cms-screen.png`,
      alt: 'Airport CMS — supervisory dashboard',
      caption: 'CMS supervisory dashboard',
    },
    galleryImages: [
      { src: `${IMG_BASE}/airport-cms-screen-2.png`, alt: 'Airport CMS — escalator status screen' },
      { src: `${IMG_BASE}/airport-cms-screen-3.png`, alt: 'Airport CMS — lift status screen' },
      { src: `${IMG_BASE}/airport-cms-screen-4.png`, alt: 'Airport CMS — alarm log screen' },
      { src: `${IMG_BASE}/airport-cms-screen-5.png`, alt: 'Airport CMS — trend / history screen' },
    ],
    projectFacts: [
      { label: 'Sites', value: 'Bangalore + Hyderabad Airports' },
      { label: 'Equipment', value: 'Lifts · Escalators · Travelators' },
      { label: 'Alerting', value: 'SMS · BMS over Modbus TCP/IP' },
    ],
    draft: true,
  },

  // ─── Metro & Tunnel Automation · DMRC Line 3 ──────────────────────────────
  {
    slug: 'dmrc-metro-line-3',
    pillarId: 'process',
    solutionItemId: 'tunnel',
    client: 'Delhi Metro Rail Corporation · Line 3',
    sectorEyebrow: 'Metro & Tunnel Automation · NP SCADA',
    title: '22 stations · 31.5 km · NP SCADA subsystem',
    valueHeadline:
      '22 stations across 31.5 kilometres. One supervisory system. 13,389 live tags and alarms. Delivered in partnership with Siemens.',
    application: 'NP SCADA · 22 stations · 31.5 km',
    partnerLine: 'In partnership with Siemens',
    intro:
      'A Non-Power / Telecom SCADA subsystem for the DMRC Line 3 extension — providing monitoring, alarm annunciation, control, and reporting to support operations and maintenance, with on-line and historical data analysis.',
    metrics: [
      { value: '22', label: 'Mainline Stations' },
      { value: '31.5 km', label: 'Line Length · 3 km Underground' },
      { value: '13,389', label: 'Tags + Alarms Handled' },
    ],
    challenge: {
      intro:
        'The Line 3 extension brought a dozen subsystems under one operational umbrella — telecom transmission (SDH), public address, passenger information displays, CCTV, TETRA radio, automatic fare collection, tunnel ventilation, environment control, power supply, building services, lifts, and escalators. Each subsystem speaks its own protocol. The Operations Control Centre needed one supervisory system that could see them all, alarm on any of them, and historically analyse all of them — at transit-grade reliability.',
      painPoints: [
        '10+ heterogeneous subsystems with different protocols and vendors',
        'Operational Control Centre needed unified alarm and event management',
        'On-line and historical analysis required across the full data set',
        'Transit-grade reliability — system cannot fail at the OCC or in-station',
      ],
    },
    workIntro:
      'A client–server NP SCADA architecture covering the full Line 3 extension. Redundant servers at the OCC running Siemens software. SIMATIC S7-300 RTUs with redundant CPUs at every station as local data concentrators. Web-based I/O units for power and auxiliary inputs.',
    outcome: {
      intro:
        'One supervisory system handles 13,389 tags and alarms across 22 stations. Operators have on-line views and historical analysis on every subsystem. Delivered in partnership with Siemens.',
      benefits: [
        '6,814 external tags from TVS and ECS surfaced into a single supervisory view',
        '500 internal telecom data tags integrated alongside',
        '6,575 alarm and event types managed centrally',
        'Redundant OCC infrastructure — 2 dual-redundant servers, 6 operator workstations',
        'Field-side resilience — redundant CPU SIMATIC S7-300 RTUs at every station',
      ],
    },
    dataHandled: [
      { label: 'External Tags · TVS & ECS', value: '6,814' },
      { label: 'Internal Tags · Telecom Data', value: '500' },
      { label: 'Alarms & Events', value: '6,575' },
    ],
    heroImage: {
      src: `${IMG_BASE}/dmrc-line-3-station.jpeg`,
      alt: 'DMRC Line 3 — station-level supervisory view',
      caption: 'Station-level supervisory view',
    },
    projectFacts: [
      { label: 'Coverage', value: '22 mainline + 9 extension stations' },
      { label: 'Tunnel Length', value: '31.5 km · 3 km underground' },
      { label: 'Partner', value: 'Siemens' },
      { label: 'Depot', value: '1' },
    ],
    // TODO: export the two system architecture diagrams (image35.emf, image37.emf)
    // from Word as PNG. Place at /public/images/case-studies/dmrc-architecture-{occ,station}.png
    draft: true,
  },

  // ─── Metro & Tunnel Automation · Kumarhati Solan ──────────────────────────
  {
    slug: 'kumarhati-solan-tunnel',
    pillarId: 'process',
    solutionItemId: 'tunnel',
    client: 'Road Tunnel Authority · Kumarhati, Solan',
    sectorEyebrow: 'Metro & Tunnel Automation · Road Tunnel',
    title: 'PLC, VFD & SCADA delivery for a Himachal road tunnel',
    valueHeadline:
      'A Himachal road tunnel needed PLC, drives, and SCADA delivered as one job. Five PLCs, three VFDs, one supervisory station — supplied, programmed, and integrated on site.',
    application: 'Road Tunnel Automation',
    intro:
      'A turnkey road-tunnel automation delivery at Kumarhati, Solan (Himachal Pradesh) — covering supply of PLC and VFD panels and the SCADA system, plus on-site installation, software development, and field-device integration.',
    metrics: [
      { value: '5', label: 'PLCs Installed' },
      { value: '3', label: 'VFD Panels' },
      { value: '1', label: 'SCADA Station' },
    ],
    challenge: {
      intro:
        'The tunnel project needed a complete turnkey delivery from a single integrator — supply of PLC and VFD panels, supply of the SCADA system, plus on-site engineering and field-device integration in remote Himachal terrain. Splitting it across multiple vendors wasn’t viable.',
      painPoints: [
        'Remote site — coordination across multiple suppliers would have been operationally fragile',
        'Project needed material supply + engineering + on-site integration under one accountability',
        'Field instrumentation needed to integrate into tunnel control logic with fault-log reporting',
      ],
    },
    workIntro:
      'Single-source delivery. Five PLC panels and three VFD panels supplied, installed, and configured on site. One SCADA PC delivered. PLC and SCADA software developed. VFD configuration completed on site. Field devices integrated into the tunnel control logic.',
    outcome: {
      intro:
        'The tunnel runs on a single integrated control system, delivered, programmed, and commissioned by one team.',
      benefits: [
        'Single-accountability delivery — material + engineering + site, one vendor',
        '5 PLCs and 3 VFD panels operating in concert across the tunnel',
        'SCADA with fault-log reporting commissioned and live',
        'Field instrumentation integrated with tunnel control logic',
      ],
    },
    heroImage: {
      src: `${IMG_BASE}/kumarhati-tunnel.png`,
      alt: 'Kumarhati Solan road tunnel — SCADA screen',
      caption: 'SCADA supervisory screen',
    },
    projectFacts: [
      { label: 'Site', value: 'Kumarhati, Solan · Himachal Pradesh' },
      { label: 'Scope', value: 'Material + Engineering + Site' },
      { label: 'Hardware', value: '5× PLC · 3× VFD · 1× SCADA' },
    ],
    // TODO: export system architecture (image38.emf, image39.emf) from Word
    // as PNG. Place at /public/images/case-studies/kumarhati-architecture.png
    draft: true,
  },
];

export const richCaseStudiesBySlug = (): Map<string, RichCaseStudy> => {
  const m = new Map<string, RichCaseStudy>();
  for (const cs of richCaseStudies) m.set(cs.slug, cs);
  return m;
};
