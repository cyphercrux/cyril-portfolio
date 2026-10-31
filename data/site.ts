// Central personal/site data. Only verified-by-you values live here.
// null = not provided yet (components should hide the item or show a placeholder).
export const site = {
  name: "Cyril William",
  title: "Electrical Engineering student and aspiring engineer",
  location: "Kalyan–Dombivli, Maharashtra, India",
  email: "cyrilwilliam2003@gmail.com",
  secondaryEmail: "cyrilwilliam750@gmail.com",
  phone: "+91 9920422355",
  links: {
    github: "https://github.com/cyphercrux",
    instagram: "https://www.instagram.com/_cyril_william_/",
    linkedin: "https://www.linkedin.com/in/cyrilwilliam",
    resume: null as string | null, // set once a public resume PDF is chosen, e.g. "/Cyril_William_Resume.pdf"
  },
  images: {
    portrait: "/images/personal/portrait-about.webp",
    portraitAlt: "Cyril William smiling in a blue shirt with arms crossed",
  },
} as const;

export const about = {
  aboutPortrait: "/images/personal/portrait-about.webp",
  intro: "I’m an Electrical Engineering student and aspiring engineer: curious, hands-on and adaptable, with a habit of combining physical hardware with software and intelligent systems.",
  education: [
    { what: "Bachelor of Electrical Engineering", where: "University of Mumbai", note: "Fr. C. Rodrigues Institute of Technology, Vashi" },
    { what: "Higher Secondary Certificate (HSC)", where: "Maharashtra State Board", note: "2021" },
    { what: "Secondary School Certificate (SSC)", where: "Maharashtra State Board", note: "2019" },
  ],
  internships: [
    { role: "Intern, Testing Department", org: "Siemens, Kalwa", length: "1 month", field: "Electrical panel manufacturing",
      points: ["Performed functional and safety testing of electrical panels and components.", "Diagnosed electrical faults and ensured compliance with industry standards.", "Assisted in test report analysis to improve panel efficiency and reliability."] },
    { role: "Intern, QC Department", org: "Vivid Electromech Pvt. Ltd.", length: "2 months", field: "Electrical panel manufacturing",
      points: ["Assisted in assembly, wiring, and integration of industrial electrical panels.", "Conducted quality and performance testing to meet safety standards.", "Interpreted electrical schematics, load distribution, and circuit protection.", "Collaborated with production teams to improve efficiency and reduce downtime."] },
  ],
  skills: [
    { group: "Electrical engineering", items: ["Switchboards", "Electrical panels", "Panel testing", "Circuit breakers"] },
    { group: "Embedded systems and IoT", items: ["Arduino", "ESP boards", "Sensors", "IoT systems", "EV solutions"] },
    { group: "Software tools", items: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"] },
    { group: "Soft skills", items: ["Communication", "Teamwork", "Adaptability"] },
  ],
  exploring: ["EV battery safety", "AI-assisted fault prediction", "Industrial electrical systems", "Embedded systems and IoT", "Automation", "Hardware development"],
};
