export const INITIAL_SETTINGS = {
  company: 'Avani Green Solar',
  phone: '+91 88271 86367',
  whatsapp: '918827186367',
  email: 'support@avanigreensolar.com',
  address: 'Basoda Naka, Near by Nehar, Bosoda road, Sironj, 464228',
  hours: 'Mon–Sat, 9:30 AM – 6:30 PM',
  defaultState: 'Madhya Pradesh',
  tariffPerUnit: 7.5,
  unitsPerKwPerMonth: 120,
  costPerKw: 55000
};

export const SUBSIDY_RULES = [
  { id: 'r1', scheme: 'PM Surya Ghar (Muft Bijli Yojana)', state: 'All India', customerType: 'Residential', min: 0, max: 2, type: 'flat_per_kw', value: 30000, cap: 30000 },
  { id: 'r2', scheme: 'PM Surya Ghar (Muft Bijli Yojana)', state: 'All India', customerType: 'Residential', min: 2, max: 3, value: 18000, type: 'flat_per_kw_additional', cap: 78000 },
  { id: 'r3', scheme: 'PM Surya Ghar (Muft Bijli Yojana)', state: 'All India', customerType: 'Residential', min: 3, max: 10, value: 0, type: 'capped', cap: 78000 },
  { id: 'r4', scheme: 'State/Commercial Incentive (placeholder — configure)', state: 'Madhya Pradesh', customerType: 'Commercial', min: 0, max: 500, value: 0, type: 'none_configured', cap: 0 }
];

export const INITIAL_PROJECTS = [
  {
    id: 'p1',
    name: 'Rooftop Residential Installation',
    type: 'Residential',
    solarType: 'On-grid',
    capacity: 5,
    location: 'Bhopal, MP',
    year: 2025,
    desc: 'Custom engineered 5 kW on-grid solar system installed for an independent villa in Bhopal. Designed with high-efficiency tier-1 bifacial monocrystalline panels and net-metering integration to slash summer grid bills.',
    featured: true
  },
  {
    id: 'p2',
    name: 'Commercial Rooftop Array',
    type: 'Commercial',
    solarType: 'On-grid',
    capacity: 60,
    location: 'Indore, MP',
    year: 2025,
    desc: '60 kW solar rooftop array commissioned on a commercial office building in Indore. Drastically reduces daytime tariff costs with smart cloud monitoring and zero-export protection.',
    featured: true
  },
  {
    id: 'p3',
    name: 'Industrial Ground-Mount System',
    type: 'Industrial',
    solarType: 'Hybrid',
    capacity: 400,
    location: 'Dewas, MP',
    year: 2024,
    desc: '400 kW hybrid solar installation at an industrial processing facility in Dewas, providing reliable captive power and lowering peak maximum demand charges.',
    featured: false
  },
  {
    id: 'p4',
    name: 'Off-Grid Farmhouse System',
    type: 'Residential',
    solarType: 'Off-grid',
    capacity: 3,
    location: 'Sehore, MP',
    year: 2024,
    desc: 'Reliable 3 kW off-grid solar setup with high-capacity lithium iron phosphate (LiFePO4) storage batteries, ensuring 24/7 uninterrupted power for an off-grid agricultural estate.',
    featured: false
  },
  {
    id: 'p5',
    name: 'Warehouse Solar Retrofit',
    type: 'Commercial',
    solarType: 'Hybrid',
    capacity: 120,
    location: 'Ujjain, MP',
    year: 2025,
    desc: '120 kW solar system installed on logistics shed roofing, equipped with hybrid inverters to keep cold-storage units functioning during grid power fluctuations.',
    featured: false
  },
  {
    id: 'p6',
    name: 'Factory Shed Installation',
    type: 'Industrial',
    solarType: 'On-grid',
    capacity: 750,
    location: 'Pithampur, MP',
    year: 2024,
    desc: '750 kW large-scale solar array for a heavy manufacturing plant in Pithampur Industrial Area, saving millions in annual electricity costs.',
    featured: false
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rv1',
    name: 'Rajesh Sharma',
    location: 'Bhopal, MP',
    rating: 5,
    text: 'Avani Green Solar completed our 5 kW home rooftop solar setup within just 10 days. Net metering was handled seamlessly and our monthly electricity bills dropped from ₹5,200 to under ₹400!',
    status: 'APPROVED',
    capacity: '5 kW'
  },
  {
    id: 'rv2',
    name: 'Anand Patel',
    location: 'Indore, MP',
    rating: 5,
    text: 'Outstanding professional engineering and support. They installed a 60 kW commercial rooftop unit for our commercial premises. Highly recommend their technical team.',
    status: 'APPROVED',
    capacity: '60 kW'
  },
  {
    id: 'rv3',
    name: 'Vikram Chouhan',
    location: 'Dewas, MP',
    rating: 5,
    text: 'Great experience working with Avani Green Solar on our industrial facility setup. Solid build quality, genuine tier-1 components, and transparent communication throughout.',
    status: 'APPROVED',
    capacity: '400 kW'
  }
];

export const INITIAL_BLOG = [
  {
    id: 'b1',
    slug: 'what-is-on-grid-off-grid-hybrid',
    title: 'On-grid vs Off-grid vs Hybrid Solar: Which One Do You Need?',
    cat: 'Solar Basics',
    excerpt: 'A plain-language walkthrough of the three main solar system types and how to tell which fits your property.',
    date: '2026-07-02',
    content: 'Choosing the right solar system depends on your location, power grid reliability, and budget. On-grid systems connect directly to the utility grid and are usually the most economical option where electricity supply is stable, relying on net metering. Off-grid systems are equipped with dedicated battery banks for complete energy independence. Hybrid systems bring together the advantages of both: grid connectivity with battery backup during unexpected power outages.'
  },
  {
    id: 'b2',
    slug: 'pm-surya-ghar-explained',
    title: 'PM Surya Ghar Yojana: Eligibility and Application Process Explained',
    cat: 'PM Surya Ghar',
    excerpt: 'What the scheme covers, who can apply, and the steps involved — in plain terms.',
    date: '2026-06-18',
    content: 'Under PM Surya Ghar: Muft Bijli Yojana, residential households can access substantial central financial assistance (CFA) to install rooftop solar panels. Residential systems up to 2 kW qualify for up to ₹30,000 subsidy per kW, and an additional ₹18,000 for the 3rd kW, capping at ₹78,000. Registration is carried out online through the national portal, followed by DISCOM technical feasibility approval and installation by authorized vendors.'
  },
  {
    id: 'b3',
    slug: 'solar-maintenance-checklist',
    title: 'A Simple Solar Maintenance Checklist for Homeowners',
    cat: 'Solar Maintenance',
    excerpt: 'What actually needs regular attention after installation, and what does not.',
    date: '2026-05-30',
    content: 'Solar panels have no moving parts and require minimal upkeep. Periodic cleaning with plain water every 2 to 3 weeks to remove accumulated dust, checking for tree branch shading, and monitoring your inverter error codes or mobile telemetry app is usually all that is needed to ensure peak generation for 25+ years.'
  }
];

export const INITIAL_LEADS = [
  {
    id: 'LD-DEMO01',
    name: 'Suresh Verma',
    phone: '9876543210',
    email: 'suresh@example.com',
    customerType: 'Residential',
    source: 'Solar Calculator',
    status: 'NEW',
    created: new Date().toISOString(),
    assigned: 'Unassigned',
    capacity: '5',
    notes: []
  },
  {
    id: 'LD-DEMO02',
    name: 'Pooja Tiwari',
    phone: '9823456781',
    email: 'pooja@example.com',
    customerType: 'Commercial',
    source: 'Talk to Solar Expert',
    status: 'CONTACTED',
    created: new Date(Date.now() - 86400000).toISOString(),
    assigned: 'Consultant 1',
    capacity: '25',
    notes: []
  }
];
