import { Admin } from '../models/Admin.js';
import { Project } from '../models/Project.js';
import { Blog } from '../models/Blog.js';
import { Review } from '../models/Review.js';
import { Lead } from '../models/Lead.js';
import { SiteVisit } from '../models/SiteVisit.js';
import { DealerApp, ContractorApp } from '../models/Partner.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { Settings } from '../models/Settings.js';

export async function seedInitialData() {
  try {
    // 1. Ensure Default Admin exists
    const adminUsername = 'Avani122';
    const existingAdmin = await Admin.findOne({ username: adminUsername });
    if (!existingAdmin) {
      console.log('[Seed] Creating default Admin user: Avani122...');
      const admin = new Admin({
        username: adminUsername,
        password: 'Avani@2025',
        name: 'Avani Green Solar Admin',
        role: 'superadmin'
      });
      await admin.save();
      console.log('[Seed] Admin user Avani122 created successfully in MongoDB.');
    }

    // 2. Ensure Settings exist
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      console.log('[Seed] Seeding default system settings...');
      await Settings.create({
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
      });
    }

    // 3. Ensure Projects exist
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('[Seed] Seeding initial solar projects into MongoDB...');
      const initialProjects = [
        {
          customId: 'p1',
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
          customId: 'p2',
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
          customId: 'p3',
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
          customId: 'p4',
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
          customId: 'p5',
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
          customId: 'p6',
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
      await Project.insertMany(initialProjects);
      console.log('[Seed] Initial projects seeded.');
    }

    // 4. Ensure Blog posts exist
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      console.log('[Seed] Seeding initial blog articles into MongoDB...');
      const initialBlogs = [
        {
          customId: 'b1',
          slug: 'what-is-on-grid-off-grid-hybrid',
          title: 'On-grid vs Off-grid vs Hybrid Solar: Which One Do You Need?',
          cat: 'Solar Basics',
          excerpt: 'A plain-language walkthrough of the three main solar system types and how to tell which fits your property.',
          date: new Date('2026-07-02'),
          content: 'Choosing the right solar system depends on your location, power grid reliability, and budget. On-grid systems connect directly to the utility grid and are usually the most economical option where electricity supply is stable, relying on net metering. Off-grid systems are equipped with dedicated battery banks for complete energy independence. Hybrid systems bring together the advantages of both: grid connectivity with battery backup during unexpected power outages.'
        },
        {
          customId: 'b2',
          slug: 'pm-surya-ghar-explained',
          title: 'PM Surya Ghar Yojana: Eligibility and Application Process Explained',
          cat: 'PM Surya Ghar',
          excerpt: 'What the scheme covers, who can apply, and the steps involved — in plain terms.',
          date: new Date('2026-06-18'),
          content: 'Under PM Surya Ghar: Muft Bijli Yojana, residential households can access substantial central financial assistance (CFA) to install rooftop solar panels. Residential systems up to 2 kW qualify for up to ₹30,000 subsidy per kW, and an additional ₹18,000 for the 3rd kW, capping at ₹78,000. Registration is carried out online through the national portal, followed by DISCOM technical feasibility approval and installation by authorized vendors.'
        },
        {
          customId: 'b3',
          slug: 'solar-maintenance-checklist',
          title: 'A Simple Solar Maintenance Checklist for Homeowners',
          cat: 'Solar Maintenance',
          excerpt: 'What actually needs regular attention after installation, and what does not.',
          date: new Date('2026-05-30'),
          content: 'Solar panels have no moving parts and require minimal upkeep. Periodic cleaning with plain water every 2 to 3 weeks to remove accumulated dust, checking for tree branch shading, and monitoring your inverter error codes or mobile telemetry app is usually all that is needed to ensure peak generation for 25+ years.'
        }
      ];
      await Blog.insertMany(initialBlogs);
      console.log('[Seed] Initial blogs seeded.');
    }

    // 5. Ensure Reviews exist
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      console.log('[Seed] Seeding initial customer reviews...');
      const initialReviews = [
        {
          customId: 'rv1',
          name: 'Rajesh Sharma',
          location: 'Bhopal, MP',
          rating: 5,
          text: 'Avani Green Solar completed our 5 kW home rooftop solar setup within just 10 days. Net metering was handled seamlessly and our monthly electricity bills dropped from ₹5,200 to under ₹400!',
          status: 'APPROVED',
          capacity: '5 kW'
        },
        {
          customId: 'rv2',
          name: 'Anand Patel',
          location: 'Indore, MP',
          rating: 5,
          text: 'Outstanding professional engineering and support. They installed a 60 kW commercial rooftop unit for our commercial premises. Highly recommend their technical team.',
          status: 'APPROVED',
          capacity: '60 kW'
        },
        {
          customId: 'rv3',
          name: 'Vikram Chouhan',
          location: 'Dewas, MP',
          rating: 5,
          text: 'Great experience working with Avani Green Solar on our industrial facility setup. Solid build quality, genuine tier-1 components, and transparent communication throughout.',
          status: 'APPROVED',
          capacity: '400 kW'
        }
      ];
      await Review.insertMany(initialReviews);
      console.log('[Seed] Initial reviews seeded.');
    }

    // 6. Ensure Initial Leads exist
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      console.log('[Seed] Seeding initial sample leads...');
      const initialLeads = [
        {
          customId: 'LD-DEMO01',
          name: 'Suresh Verma',
          phone: '9876543210',
          email: 'suresh@example.com',
          customerType: 'Residential',
          source: 'Solar Calculator',
          status: 'NEW',
          capacity: '5',
          assigned: 'Unassigned'
        },
        {
          customId: 'LD-DEMO02',
          name: 'Pooja Tiwari',
          phone: '9823456781',
          email: 'pooja@example.com',
          customerType: 'Commercial',
          source: 'Talk to Solar Expert',
          status: 'CONTACTED',
          capacity: '25',
          assigned: 'Consultant 1'
        }
      ];
      await Lead.insertMany(initialLeads);
      console.log('[Seed] Initial leads seeded.');
    }

    // 7. Ensure Site visits exist
    const visitCount = await SiteVisit.countDocuments();
    if (visitCount === 0) {
      await SiteVisit.create({
        customId: 'SV-DEMO01',
        name: 'Alok Mishra',
        address: 'Arera Colony, Bhopal',
        phone: '9893012345',
        preferredDate: '2026-09-10',
        preferredTime: '11:00',
        status: 'REQUESTED'
      });
    }

    // 8. Ensure Dealer apps exist
    const dealerCount = await DealerApp.countDocuments();
    if (dealerCount === 0) {
      await DealerApp.create({
        customId: 'DL-90812',
        name: 'Sunil Verma',
        city: 'Hoshangabad',
        phone: '9893012345',
        status: 'APPLIED'
      });
    }

    // 9. Ensure Contractor apps exist
    const contractorCount = await ContractorApp.countDocuments();
    if (contractorCount === 0) {
      await ContractorApp.create({
        customId: 'CT-34211',
        name: 'Mohit Sharma',
        city: 'Ujjain',
        phone: '9826054321',
        status: 'APPLIED'
      });
    }

    // 10. Ensure Contact messages exist
    const msgCount = await ContactMessage.countDocuments();
    if (msgCount === 0) {
      await ContactMessage.create({
        customId: 'msg-1',
        name: 'Kavita Singh',
        phone: '9827011223',
        subject: 'Industrial 100 kW enquiry',
        message: 'Need quotation for food processing unit near Mandideep.',
        status: 'OPEN'
      });
    }
  } catch (err) {
    console.error('[Seed] Error during seeding:', err.message);
  }
}
