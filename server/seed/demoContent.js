import { Blog } from '../models/Blog.js';
import { Project } from '../models/Project.js';
import Job from '../models/Job.js';

const solarImage = '/images/content/solar-installation-demo.png';
const partnerImage = solarImage;
const secondaryImage = solarImage;

const blogTopics = [
  ['How Much Can a 3 kW Rooftop Solar System Save?', 'Solar Basics', 'Rooftop Solar'],
  ['Solar Panels for Apartments: A Practical Guide', 'Solar Basics', 'Residential Solar'],
  ['Understanding Net Metering in Madhya Pradesh', 'Policy', 'Net Metering'],
  ['Solar Battery Storage: Is It Right for Your Home?', 'Technology', 'Battery Storage'],
  ['Commercial Solar ROI: A Five-Year Planning Guide', 'Business', 'Commercial Solar'],
  ['How to Read Your Solar Inverter Dashboard', 'Solar Maintenance', 'System Monitoring'],
  ['Monsoon Solar Care: Five Checks for Better Generation', 'Solar Maintenance', 'Seasonal Maintenance'],
  ['PM Surya Ghar Documents Checklist for Homeowners', 'Policy', 'Solar Subsidy'],
  ['Choosing the Right Solar Installer for Your Property', 'Solar Basics', 'Installation Guide'],
  ['Why Solar Is a Smart Investment for Small Businesses', 'Business', 'Business Solar']
];

export async function seedDemoContent() {
  const existingBlogIds = new Set((await Blog.find({ customId: /^demo-b/ }, { customId: 1 }).lean()).map((item) => item.customId));
  const existingProjectIds = new Set((await Project.find({ customId: /^demo-p/ }, { customId: 1 }).lean()).map((item) => item.customId));
  const existingJobs = await Job.find({ role: /^Demo:/ }, { role: 1 }).lean();
  const existingJobRoles = new Set(existingJobs.map((item) => item.role));

  const blogs = blogTopics
    .map(([title, parentCat, childCat], index) => ({
      customId: `demo-b${index + 1}`,
      slug: `demo-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
      title,
      cat: childCat,
      parentCat,
      childCat,
      featured: index < 3,
      excerpt: `A practical Avani Green Solar guide covering ${childCat.toLowerCase()} for property owners in Madhya Pradesh.`,
      content: `<h2>${title}</h2><p>Solar decisions become easier when technical information is explained in a practical way. This guide helps homeowners and businesses plan confidently with clear steps, realistic expectations, and professional support.</p><h3>Key points to remember</h3><ul><li>Review your monthly electricity usage before choosing system capacity.</li><li>Confirm roof strength, shade conditions, and available installation area.</li><li>Use a qualified installer for approvals, commissioning, and after-sales support.</li></ul><div class="editor-callout editor-note"><strong>Note:</strong> A site assessment gives the most accurate savings estimate for your property.</div><p><img src="${index % 2 === 0 ? solarImage : partnerImage}" alt="Solar energy planning" class="editor-inline-image editor-image-center" style="width:60%;height:auto" /></p><div class="editor-callout editor-reminder"><strong>Reminder:</strong> Keep your latest electricity bill and property documents ready before requesting a quote.</div><p>With the right design and regular monitoring, a well-installed solar system can deliver dependable clean energy for decades.</p>`,
      image: index % 2 === 0 ? solarImage : secondaryImage,
      date: new Date(`2026-${String(8 - Math.floor(index / 3)).padStart(2, '0')}-${String(5 + index).padStart(2, '0')}`),
      editorialNote: 'Demo article created for layout review.',
      reminder: 'Review this demo article before publishing final production content.'
    }))
    .filter((item) => !existingBlogIds.has(item.customId));

  const projectProfiles = [
    ['Bhopal Family Rooftop', 'Residential', 'On-grid', 4.5, 'Bhopal, MP'],
    ['Indore Retail Centre', 'Commercial', 'On-grid', 35, 'Indore, MP'],
    ['Sehore Farm Residence', 'Residential', 'Hybrid', 8, 'Sehore, MP'],
    ['Dewas Engineering Unit', 'Industrial', 'On-grid', 180, 'Dewas, MP'],
    ['Ujjain School Campus', 'Commercial', 'On-grid', 50, 'Ujjain, MP'],
    ['Sagar Cold Storage', 'Industrial', 'Hybrid', 250, 'Sagar, MP'],
    ['Vidisha Community Clinic', 'Commercial', 'On-grid', 22, 'Vidisha, MP'],
    ['Raisen Dairy Farm', 'Industrial', 'Off-grid', 30, 'Raisen, MP'],
    ['Hoshangabad Villa Solar', 'Residential', 'On-grid', 6, 'Narmadapuram, MP'],
    ['Pithampur Warehouse Array', 'Industrial', 'On-grid', 320, 'Pithampur, MP']
  ];
  const projects = projectProfiles
    .map(([name, type, solarType, capacity, location], index) => ({
      customId: `demo-p${index + 1}`,
      name: `Demo: ${name}`,
      type,
      solarType,
      capacity,
      location,
      year: 2026,
      featured: index < 4,
      image: index % 2 === 0 ? solarImage : partnerImage,
      desc: `<h3>Installation overview</h3><p>A professionally designed ${capacity} kW ${solarType.toLowerCase()} solar system for this ${type.toLowerCase()} property in ${location}.</p><ul><li>Load profile and roof area assessed before design.</li><li>High-quality components selected for dependable generation.</li><li>Monitoring and handover guidance included for the property owner.</li></ul><div class="editor-callout editor-note"><strong>Note:</strong> Final system output varies with roof orientation, shade, and seasonal sunlight.</div><div class="editor-callout editor-reminder"><strong>Reminder:</strong> Schedule annual electrical inspection and keep monitoring alerts enabled.</div>`,
      editorialNote: 'Demo project created for design and layout review.',
      reminder: 'Replace with verified project specifications before public launch.'
    }))
    .filter((item) => !existingProjectIds.has(item.customId));

  const jobTitles = [
    'Solar Design Engineer',
    'Site Survey Engineer',
    'Project Coordinator',
    'Solar Sales Consultant',
    'Electrical Installation Supervisor',
    'Performance Monitoring Analyst',
    'Business Development Executive',
    'Customer Support Specialist',
    'Content and Community Executive',
    'Procurement and Vendor Manager'
  ];
  const jobs = jobTitles
    .map((title, index) => ({
      role: `Demo: ${title}`,
      location: index % 3 === 0 ? 'Bhopal, MP' : index % 3 === 1 ? 'Indore, MP' : 'Hybrid / Madhya Pradesh',
      salary: index < 3 ? '₹4–7 LPA' : '₹3–6 LPA',
      image: index % 2 === 0 ? solarImage : secondaryImage,
      responsibilities: `<h3>What you will do</h3><ul><li>Coordinate high-quality solar projects from enquiry to successful handover.</li><li>Work with customers, engineers, vendors, and internal teams.</li><li>Maintain accurate documentation and communicate progress clearly.</li></ul><div class="editor-callout editor-note"><strong>Note:</strong> This demo role is intended to preview the careers page layout.</div>`,
      requirements: `<h3>What we are looking for</h3><ul><li>Strong communication and organized working style.</li><li>Interest in renewable energy and practical problem solving.</li><li>Ability to work responsibly with customers and field teams.</li></ul><div class="editor-callout editor-reminder"><strong>Reminder:</strong> Confirm location and compensation details before publishing this role.</div>`,
      editorialNote: 'Demo job created for design and layout review.',
      reminder: 'Replace demo requirements with the approved hiring brief.'
    }))
    .filter((item) => !existingJobRoles.has(item.role));

  if (blogs.length) await Blog.insertMany(blogs);
  if (projects.length) await Project.insertMany(projects);
  if (jobs.length) await Job.insertMany(jobs);

  console.log(`[Seed] Demo content added: ${blogs.length} blogs, ${projects.length} projects, ${jobs.length} jobs.`);
}
