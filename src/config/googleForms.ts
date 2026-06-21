export interface FormConfig {
  name: string;
  responseUrl: string;
  fields: Record<string, string>;
  successMessage: string;
  errorMessage: string;
}

export const GOOGLE_FORMS_CONFIG: Record<string, FormConfig> = {
  contact: {
    name: "Contact Us",
    responseUrl: process.env.GOOGLE_FORM_CONTACT_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse",
    fields: {
      name: "entry.1353425408",
      email: "entry.1969378770",
      phone: "entry.160795679",
      subject: "entry.1037341358",
      privacyAgreement: "entry.153006986"
    },
    successMessage: "Thank you! Your message has been submitted successfully.",
    errorMessage: "Google Forms operational sync failed. Please try again."
  },
  careers: {
    name: "Careers / Job Application",
    responseUrl: process.env.GOOGLE_FORM_CAREERS_URL || "https://docs.google.com/forms/d/e/1FAIpQLSd0Q-32ng0VoJwKwLwQrFNPd92kg6Hn1hZp4GbDG828RDifAg/formResponse",
    fields: {
      name: "entry.1671554388",
      email: "entry.1670549978",
      phone: "entry.333759508",
      city: "entry.669131547",
      country: "entry.1524498034",
      position: "entry.943860298",
      experience: "entry.590781511",
      company: "entry.1084455224",
      role: "entry.207489116",
      skillC: "entry.1853953854",
      skillCpp: "entry.2081598495",
      skillCSharp: "entry.1115383138",
      reactExperience: "entry.716933715",
      interPercentage: "entry.1015538290",
      college: "entry.144751842",
      graduationYear: "entry.1413820569",
      cgpa: "entry.1502552650",
      whyJoin: "entry.730422050",
      additionalInfo: "entry.1187003539",
      previouslyApplied: "entry.1562151060",
      resumeUrl: "entry.1389936284",
      expectedSalary: "entry.2059086350",
      relocate: "entry.682296028",
      declaration: "entry.102387604"
    },
    successMessage: "Thank you! Your career application has been submitted successfully.",
    errorMessage: "Careers operational spreadsheet sync failed. Please try again."
  },
  internship: {
    name: "Internship Application",
    responseUrl: process.env.GOOGLE_FORM_INTERNSHIP_URL || "https://docs.google.com/forms/d/e/1FAIpQLScJ4JJwoO9BzIp7y9MI22LA3J-2kP3KUEeNc1II92e3FRb5KA/formResponse",
    fields: {
      name: "entry.2134206329",
      email: "entry.515727789",
      phone: "entry.827593428",
      college: "entry.1233903058",
      degree: "entry.779620700",
      branch: "entry.2097582529",
      year: "entry.1698760899",
      specialization: "entry.2111866613",
      skillC: "entry.1524749585",
      skillCpp: "entry.678567450",
      previousInternship: "entry.747828698",
      whyJoin: "entry.590398659",
      careerGoals: "entry.1754579422",
      availableImmediately: "entry.896583479",
      resumeSubmitted: "entry.1478783160",
      declaration: "entry.229175302"
    },
    successMessage: "Thank you! Your internship application has been submitted successfully.",
    errorMessage: "Internship operational spreadsheet sync failed. Please try again."
  },
  partnership: {
    name: "Partnerships",
    responseUrl: process.env.GOOGLE_FORM_PARTNERSHIPS_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse", // Fallback to Contact form if not custom-made
    fields: {
      name: "entry.1353425408",
      email: "entry.1969378770",
      phone: "entry.160795679",
      subject: "entry.1037341358",
      message: "entry.1037341358"
    },
    successMessage: "Partnership request sent successfully.",
    errorMessage: "Partnership operational sync failed. Please try again."
  },
  print_orders: {
    name: "Print Orders",
    responseUrl: process.env.GOOGLE_FORM_PRINT_ORDERS_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse",
    fields: {
      name: "entry.1353425408",
      email: "entry.1969378770",
      phone: "entry.160795679",
      message: "entry.1037341358"
    },
    successMessage: "Print order request submitted successfully.",
    errorMessage: "Print order operational sync failed. Please try again."
  },
  pg_hostel: {
    name: "PG / Hostel Enquiry",
    responseUrl: process.env.GOOGLE_FORM_PG_HOSTEL_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse",
    fields: {
      name: "entry.1353425408",
      email: "entry.1969378770",
      phone: "entry.160795679",
      message: "entry.1037341358"
    },
    successMessage: "PG/Hostel enquiry submitted successfully.",
    errorMessage: "PG/Hostel operational sync failed. Please try again."
  },
  demo: {
    name: "Product Demo",
    responseUrl: process.env.GOOGLE_FORM_PRODUCT_DEMO_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse",
    fields: {
      name: "entry.1353425408",
      email: "entry.1969378770",
      phone: "entry.160795679",
      message: "entry.1037341358"
    },
    successMessage: "Product demo request submitted successfully.",
    errorMessage: "Product demo operational sync failed. Please try again."
  },
  newsletter: {
    name: "Newsletter",
    responseUrl: process.env.GOOGLE_FORM_NEWSLETTER_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse",
    fields: {
      email: "entry.1969378770"
    },
    successMessage: "Subscribed to newsletter successfully.",
    errorMessage: "Newsletter operational sync failed. Please try again."
  },
  support: {
    name: "Support",
    responseUrl: process.env.GOOGLE_FORM_SUPPORT_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse",
    fields: {
      name: "entry.1353425408",
      email: "entry.1969378770",
      phone: "entry.160795679",
      subject: "entry.1037341358",
      message: "entry.1037341358"
    },
    successMessage: "Support request logged successfully.",
    errorMessage: "Support operational sync failed. Please try again."
  },
  feedback: {
    name: "Feedback",
    responseUrl: process.env.GOOGLE_FORM_FEEDBACK_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse",
    fields: {
      name: "entry.1353425408",
      email: "entry.1969378770",
      message: "entry.1037341358"
    },
    successMessage: "Feedback submitted successfully. Thank you!",
    errorMessage: "Feedback operational sync failed. Please try again."
  },
  feature_requests: {
    name: "Feature Request",
    responseUrl: process.env.GOOGLE_FORM_FEATURE_REQUESTS_URL || "https://docs.google.com/forms/d/e/1FAIpQLSc_HBZro98JNl7LrnjoZQSE74FWjOgxNXvNzQyYZS8oeSbrWA/formResponse",
    fields: {
      name: "entry.1353425408",
      email: "entry.1969378770",
      message: "entry.1037341358"
    },
    successMessage: "Feature request submitted successfully.",
    errorMessage: "Feature request operational sync failed. Please try again."
  }
};
