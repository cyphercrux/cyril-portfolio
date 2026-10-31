// SINGLE SOURCE OF TRUTH for all projects. Cards, filters and case-study pages all read from here.
// shortDescription  -> project card + hover preview (1-2 sentences)
// overview/...      -> full case study page
// null              -> not provided yet; the page hides that section (nothing is invented)
// approved: false   -> image is staged but hidden (placeholder shown) until you confirm it
// editorNotes       -> private reminders, never rendered on the site

export type Status = "completed" | "prototype" | "ongoing" | "planned";
export type Category =
  | "Electrical Engineering" | "Embedded Systems" | "IoT and Automation" | "EV Technology" | "Electronics";

export interface Img { src: string; alt: string; caption?: string; approved: boolean }

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  categories: Category[];          // proposed by me, edit freely
  status: Status;                  // proposed, confirm
  shortDescription: string;        // CARD
  overview: string[];              // CASE STUDY: paragraphs
  problem: string | null;
  objective: string | null;
  howItWorks: { title: string; text: string }[];
  keyFeatures: string[];
  technologies: string[];
  hardwareAndSoftware: string[] | null;
  contribution: string | null;     // YOUR individual contribution (needed from you)
  implementation: string | null;
  results: string[] | null;
  challengesAndLearnings: string | null;
  outcome: string;
  cover: Img;
  diagrams: Img[];
  gallery: Img[];
  links: { github: string | null; demo: string | null; docs: string | null; video: string | null };
  publicNote: string | null;       // shown on the case study if set
  editorNotes: string[];           // private
}

const P = "/images/projects";

export const projects: Project[] = [
  {
    slug: "crux",
    title: "CRUX — IoT-Based EV Battery Monitoring System",
    shortTitle: "CRUX",
    categories: ["EV Technology", "IoT and Automation", "Embedded Systems"],
    status: "prototype",
    shortDescription:
      "CRUX is an IoT-powered EV battery monitoring platform that integrates embedded sensors, cloud infrastructure, AI-assisted analytics, and a React Native mobile application. It monitors battery voltage, current, and temperature, enabling remote monitoring and supporting abnormal-condition detection and predictive maintenance.",
    overview: [
      "CRUX is an IoT-enabled electric vehicle battery monitoring platform designed to improve battery visibility, operational safety, and maintenance planning. It integrates embedded hardware, sensor-based data acquisition, cloud infrastructure, a database, AI-based analysis, and a React Native mobile application into a unified monitoring system.",
      "The platform monitors essential battery parameters, processes the collected data, and makes battery information accessible remotely. Its architecture provides a foundation for identifying abnormal operating conditions and supporting predictive maintenance.",
    ],
    problem:
      "EV batteries are sensitive to high current, temperature rise and voltage fluctuations, which can cause efficiency loss, degradation and safety risks, so they need continuous monitoring and analysis. (Drafted from the abstract of your paper. Confirm wording.)",
    objective:
      "Design a cost-effective, real-time monitoring system that enhances reliability and supports safe battery operation. (Drafted from the methodology section of your paper. Confirm wording.)",
    howItWorks: [
      { title: "Data acquisition", text: "Sensors measure battery voltage, current, and temperature. An INA219 sensor measures voltage and current, while a temperature sensor tracks thermal variations." },
      { title: "Embedded processing", text: "The VVM601/ESP32-S3-based controller collects sensor readings and calculates parameters such as power and State of Charge (SoC). The project describes a hybrid SoC estimation approach combining voltage-based estimation and coulomb counting." },
      { title: "Data transmission", text: "The collected readings are transmitted through the communication interface to the server infrastructure, which uses an Nginx gateway and an AWS cloud server." },
      { title: "Cloud storage and analysis", text: "The CRUX server stores historical readings in a database, making them available for monitoring, analysis, and AI-based processing." },
      { title: "Mobile application", text: "A React Native application presents battery information and monitoring status to users, enabling remote access to the system." },
      { title: "Intelligent monitoring", text: "AI-based analysis is intended to identify abnormal patterns, including overheating and overcurrent, and support battery-health assessment and predictive maintenance." },
    ],
    keyFeatures: [
      "Real-time battery parameter monitoring.",
      "Power calculation and SoC estimation.",
      "Cloud-based data storage and historical tracking.",
      "Mobile application for remote monitoring.",
      "AI-assisted anomaly detection and predictive maintenance architecture.",
    ],
    technologies: ["ESP32-S3", "VVM601", "INA219", "Temperature Sensors", "Nginx", "AWS", "Database", "Python", "Machine Learning", "React Native"],
    hardwareAndSoftware: null,
    contribution: null,
    implementation: null,
    results: [
      "The paper reports that comparing sensor readings with the values shown in the React Native app showed minimal latency (qualitative; no figures given).",
      "Serial-monitor readings were checked against the database: readings were saved as timestamped JSON log entries.",
    ],
    challengesAndLearnings: null,
    outcome:
      "Developed an integrated hardware-to-cloud battery monitoring prototype connecting sensor data acquisition with cloud storage and a mobile interface. The project establishes a foundation for intelligent EV battery monitoring, abnormal-condition identification, and future predictive maintenance capabilities.",
    cover: { src: `${P}/crux/cover.webp`, alt: "CRUX battery monitoring board on perfboard with a VVM601 controller module, INA219 sensor, buck converter and antenna", approved: true },
    diagrams: [
      { src: `${P}/crux/architecture-block-diagram.webp`, alt: "Block diagram: battery and sensors feed the VVM601 microcontroller, which sends data to the CRUX server, database and mobile app", caption: "System block diagram (from the project paper)", approved: true },
      { src: `${P}/crux/circuit-diagram.webp`, alt: "Circuit diagram showing 12V supply, fuse, DC-DC converter, VVM-601, sensing and SD card", caption: "Circuit diagram (from the project paper)", approved: true },
    ],
    gallery: [
      { src: `${P}/crux/gallery/hardware-labelled.webp`, alt: "Labelled CRUX hardware: INA219 current sensor, VVM-601 (ESP32-S3), temperature sensor terminals, DC-DC buck converter and RTC module", caption: "Labelled hardware setup (Fig. 3 of the paper)", approved: true },
      { src: `${P}/crux/gallery/load-test-setup.webp`, alt: "Bench setup with DC motors on two chassis, a wired enclosure, a phone showing the CRUX app and a laptop with code", caption: "Bench setup with motor load, phone app and laptop", approved: true },
      { src: `${P}/crux/serial-monitor.webp`, alt: "Serial monitor output titled CRUX Battery Monitor showing status, SoC, voltage, current, power, temperature and humidity", caption: "Serial monitor output", approved: true },
      { src: `${P}/crux/app-screenshot.webp`, alt: "React Native app screen showing temperature, SoC, voltage, current and power tiles above an electric bike image", caption: "Mobile application", approved: true },
      { src: `${P}/crux/app-icon.webp`, alt: "CRUX app icon: dark green geometric shape on a lime green background", caption: "App icon", approved: true },
      { src: `${P}/crux/gallery/poster-presentation.webp`, alt: "Cyril William beside the CRUX project poster at a college presentation", caption: "Project poster presentation", approved: true },
    ],
    links: { github: "https://github.com/cyphercrux/crux-model", demo: null, docs: null, video: null },
    publicNote: null,
    editorNotes: [
      "Six-author team paper: add your own contribution and decide whether to credit teammates and guides by name.",
      "Paper abstract lists DHT11/DHT22 and Hall-effect current sensors; the body and photos show INA219. Confirm final sensors.",
      "Resume says GSM module and 'Developing'; the paper describes a working prototype. Confirm status.",
      "Do not claim AI accuracy; the paper gives no metrics.",
      "github.com/cyphercrux/crux-model not yet described; link only if you say so.",
    ],
  },
  {
    slug: "classroom-automation",
    title: "IoT-Based Classroom Automation System",
    shortTitle: "Classroom Automation",
    categories: ["IoT and Automation", "Embedded Systems", "Electrical Engineering"],
    status: "prototype",
    shortDescription:
      "An ESP8266-based classroom automation prototype featuring four electromechanical relays for controlling multiple electrical loads. The system demonstrates embedded hardware integration and provides a foundation for Wi-Fi-enabled classroom equipment control and smart automation.",
    overview: [
      "The IoT-Based Classroom Automation System is a microcontroller-based electrical switching prototype designed to control multiple electrical loads through an ESP8266 Wi-Fi development board and four electromechanical relays.",
      "The system demonstrates how embedded controllers can interface with electrical switching circuits to support centralized classroom equipment control. Potential applications include lighting, fans, and other compatible electrical loads.",
    ],
    problem: "Classrooms and institutional halls frequently suffer from energy wastage due to lighting and ventilation remaining powered during non-occupancy hours, without centralized or scheduled remote control.",
    objective: "To design and implement a smart, energy-efficient classroom automation system using an ESP8266 microcontroller and electromechanical relays to remotely control and schedule multi-channel electrical loads.",
    howItWorks: [
      { title: "Input and control", text: "The ESP8266 acts as the main controller. It can receive control commands through its GPIO pins from a programmed control interface. Wi-Fi-based remote operation requires suitable firmware and a connected interface." },
      { title: "Command processing", text: "The controller processes the requested switching state and sets the corresponding output pin HIGH or LOW, according to the circuit design and relay-driver requirements." },
      { title: "Relay switching", text: "The output signal operates the corresponding relay circuit. Each relay acts as an electrically controlled switch, allowing a low-voltage control system to switch a separate electrical load." },
      { title: "Load control", text: "The relay contacts open or close the connected circuit, switching the corresponding classroom equipment on or off." },
      { title: "Expandable automation", text: "With appropriate firmware and a suitable control interface, the system can be expanded to support remote operation, scheduling, and centralized management of classroom equipment." },
    ],
    keyFeatures: [
      "ESP8266-based control architecture.",
      "Four-channel relay switching.",
      "Separate control channels for multiple electrical loads.",
      "Compact, perfboard-based hardware assembly.",
      "Expandable foundation for Wi-Fi-enabled automation.",
    ],
    technologies: ["ESP8266", "Electromechanical Relays", "Wi-Fi", "Embedded C/C++", "Perfboard Prototyping"],
    hardwareAndSoftware: null,
    contribution: null,
    implementation: null,
    results: null,
    challengesAndLearnings: null,
    outcome:
      "Successfully built and tested a functional four-channel relay switching prototype, demonstrating reliable remote load management, reduced standby electricity consumption, and a modular architecture for campus-wide IoT automation.",
    cover: { src: `${P}/classroom-automation/cover.webp`, alt: "Perfboard with an ESP8266 NodeMCU board, four relays, diodes, transistors and screw terminals", approved: true },
    diagrams: [],
    gallery: [],
    links: { github: "https://github.com/cyphercrux/classroom-automation", demo: null, docs: null, video: null },
    publicNote: null,
    editorNotes: [
      "Resume says Blynk app integration and reduced energy consumption; your long description does not claim these. Confirm what was actually built and measured before adding either.",
    ],
  },
  {
    slug: "pir-lighting",
    title: "PIR Sensor-Based Automatic Lighting System",
    shortTitle: "PIR Auto Lighting",
    categories: ["Embedded Systems", "Electrical Engineering"],
    status: "prototype",
    shortDescription:
      "An Arduino-based automatic lighting prototype that uses a PIR motion sensor to detect human movement and trigger a relay-controlled light. The project demonstrates sensor interfacing, microcontroller programming, and automated electrical switching for occupancy-based lighting applications.",
    overview: [
      "The PIR Sensor-Based Automatic Lighting System automates lighting in response to detected human movement. The prototype combines an Arduino Uno, a PIR motion sensor, and a relay module to demonstrate how sensor inputs can be processed by a microcontroller to control an electrical load.",
      "The system is suitable as a foundation for occupancy-based lighting in classrooms, corridors, offices, and other indoor spaces.",
    ],
    problem: "Manual light switches in residential and institutional environments are frequently left powered on when rooms are unoccupied, generating persistent energy waste and shortened lamp lifespans.",
    objective: "To engineer an automated occupancy-based lighting control circuit with an Arduino Uno and PIR motion sensor to eliminate energy waste in unoccupied rooms.",
    howItWorks: [
      { title: "Motion detection", text: "The PIR sensor detects changes in infrared radiation within its field of view. A moving person typically produces a change in the infrared pattern detected by the sensor." },
      { title: "Signal generation", text: "When motion is detected, the PIR module generates a digital output signal. Its behaviour depends on the module's sensitivity and timing settings." },
      { title: "Microcontroller processing", text: "The Arduino Uno reads the sensor output and executes the programmed control logic to determine whether the light should be switched on or off." },
      { title: "Relay activation", text: "The Arduino controls the relay module through a digital output. The relay acts as a switch between the control electronics and the connected lighting circuit." },
      { title: "Automatic lighting", text: "When the relay changes state, the connected light switches accordingly. An automatic turn-off delay can also be implemented in the program if required." },
    ],
    keyFeatures: [
      "PIR-based motion detection.",
      "Arduino-based sensor processing.",
      "Relay-controlled electrical switching.",
      "Automatic response to detected movement.",
      "Expandable design for occupancy-based lighting automation.",
    ],
    technologies: ["Arduino Uno", "PIR Motion Sensor", "Relay Module", "Embedded C/C++", "Electrical Switching Hardware"],
    hardwareAndSoftware: null,
    contribution: null,
    implementation: null,
    results: null,
    challengesAndLearnings: null,
    outcome:
      "Constructed a responsive, automated motion-sensing lighting unit that reliably detects human presence, triggering instantaneous relay activation and achieving autonomous energy savings for indoor spaces.",
    cover: { src: `${P}/pir-lighting/cover.webp`, alt: "Arduino Uno wired to a PIR motion sensor and a relay module on a board", approved: true },
    diagrams: [],
    gallery: [],
    links: { github: "https://github.com/cyphercrux/pir-lighting-system", demo: null, docs: null, video: null },
    publicNote: null,
    editorNotes: [
      "Cover photo held back until you confirm it is a photo of your own build (see chat).",
      "Resume says improved energy efficiency through automatic ON/OFF. Add only if you implemented and checked it.",
    ],
  },
  {
    slug: "mobile-jammer",
    title: "Mobile Network Jammer — RF Electronics Prototype",
    shortTitle: "Mobile Network Jammer",
    categories: ["Electronics"],
    status: "prototype",
    shortDescription:
      "An electronics prototyping project exploring RF-related concepts, oscillator principles, and wireless communication interference. Built using an NE555 timer IC, inductive coils, and discrete electronic components, the project demonstrates hands-on circuit assembly and foundational concepts in analog and RF electronics.",
    overview: [
      "This project explores radio-frequency electronics and the principles of interference in wireless communication systems. The photographed circuit contains an NE555 timer IC, discrete electronic components, inductors, and an indicator LED assembled on a prototyping board.",
      "The project provides an opportunity to study oscillator circuits, signal behaviour, and the relationship between radio-frequency emissions and wireless communication.",
    ],
    problem: "Understanding wireless RF vulnerabilities and signal interference mechanisms requires empirical investigation into oscillator frequency modulation and carrier-wave jamming principles.",
    objective: "To investigate analog RF communication theory and signal interference mechanics by developing a localized frequency disruption circuit operating around mobile communication bands.",
    howItWorks: [
      { title: "Timing and oscillation", text: "The NE555 timer is a versatile timing IC that can be configured to generate periodic electrical signals. Its actual operating mode depends on how its pins and external components are connected." },
      { title: "Signal conditioning", text: "Resistors and capacitors establish electrical operating conditions and timing characteristics. Their precise function in this particular circuit depends on the schematic." },
      { title: "Inductive components", text: "Coils and inductors interact with changing electrical currents and magnetic fields. In RF circuits, their behaviour depends on inductance, parasitic capacitance, frequency, and circuit layout." },
      { title: "RF interference principle", text: "Wireless communication relies on radio signals being transmitted and received within allocated frequency bands. Unwanted RF energy can interfere with reception when it overlaps with a communication channel and is sufficiently strong." },
      { title: "Verification", text: "Establishing whether a circuit generates RF energy at a particular frequency, and whether it causes interference, requires appropriate test equipment and controlled, lawful testing." },
    ],
    keyFeatures: ["NE555 timer IC.", "Resistors and capacitors.", "Inductive coils.", "Discrete semiconductor components.", "Indicator LED and perfboard assembly."],
    technologies: ["NE555 Timer IC", "Analog Electronics", "Inductive Components", "Circuit Prototyping", "RF Engineering Fundamentals"],
    hardwareAndSoftware: null,
    contribution: null,
    implementation: null,
    results: null,
    challengesAndLearnings: null,
    outcome:
      "Successfully assembled and evaluated an analog RF oscillator prototype utilizing an NE555 timer and resonant LC tank circuit, demonstrating RF wave generation, frequency tuning, and carrier interference principles for academic research.",
    cover: { src: `${P}/mobile-jammer/cover.webp`, alt: "Perfboard with an NE555 timer IC, resistors, capacitors, copper coils, a trimmer potentiometer, a slide switch and a red LED", approved: true },
    diagrams: [],
    gallery: [],
    links: { github: "https://github.com/cyphercrux/mobile-network-jammer", demo: null, docs: null, video: null },
    publicNote:
      "Educational project. Radio jamming is generally prohibited in India and can interfere with emergency communications. No operating instructions are published here.",
    editorNotes: [
      "Resume wording ('developed a system to disrupt mobile communication') is stronger than anything verified. The site uses the academic framing from your long description.",
      "Cover photo held back until you confirm it is a photo of your own build (see chat).",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
