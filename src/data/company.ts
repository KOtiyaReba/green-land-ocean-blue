// Central company information. Edit text here and every page updates.
// Anything marked [PLACEHOLDER] must be replaced with real details before launch.

export const company = {
  name: "Green Land and Ocean Blue Energy",
  tagline: "Towards a cleaner and greener tomorrow",
  headquarters: "Puthenkuriz, Ernakulam, Kerala",

  intro:
    "We are engaged in the manufacture and distribution of Diesel Exhaust Fluid (DEF/AdBlue), with an all-India tie-up with Rohan Energy Solutions Pvt Ltd for manufacture.",

  vision:
    "To create a cleaner and greener tomorrow through eco-friendly products, ideas and technologies.",

  mission:
    "To offer sustainable and non-polluting products with quality and value for money.",

  values: [
    "Quality",
    "Environment",
    "Philanthropy",
    "Sustainability",
    "Inclusive Growth",
  ],

  partners: [
    {
      name: "Rohan Energy Solutions Pvt Ltd",
      role: "All-India manufacturing tie-up for Diesel Exhaust Fluid (DEF/AdBlue)",
    },
    {
      name: "HP DEF",
      role: "Authorized distributor",
    },
    {
      name: "Gulf Lubricants",
      role: "Authorized distributor",
    },
    {
      name: "Enecon Corporation",
      role: "Authorized dealer for industrial coating and repair/protection solutions",
    },
  ],

  coverage: {
    current: ["Kerala", "South Tamil Nadu"],
    expansion: "We are building our network across India.",
  },

  // Placeholders: do NOT present these as real details.
  contact: {
    phone: "[PLACEHOLDER: phone number]",
    email: "[PLACEHOLDER: email address]",
    address: "Puthenkuriz, Ernakulam, Kerala [PLACEHOLDER: full address]",
  },

  contactCategories: [
    "Contact Info",
    "Franchisee",
    "Customer Complaints",
    "Career",
  ],
} as const;