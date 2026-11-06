/**
 * PROJECTS DATA - SINGLE SOURCE OF TRUTH
 * Verified information matching the academic papers and engineering documentation.
 */
export const categories = [
  "All",
  "EV Technology",
  "IoT & Automation",
  "Embedded Systems",
  "Electronics",
];

export const projects = [
  {
    id: "01",
    slug: "crux",
    title: "CRUX — IoT-Based EV Battery Monitoring System Using AI Predictive Analysis",
    shortTitle: "CRUX EV Battery Monitor",
    category: "EV Technology",
    categories: ["EV Technology", "IoT & Automation", "Embedded Systems"],
    status: "Prototype",
    featured: true,
    shortDescription:
      "An IoT-powered EV battery telemetry platform integrating embedded sensors, AWS cloud infrastructure, Decision Tree predictive modeling, and a React Native mobile application for real-time voltage, current, temperature, and State of Charge (SoC) monitoring.",
    overview: [
      "CRUX is an IoT-enabled electric vehicle battery monitoring platform designed to enhance battery health visibility, operational safety, and predictive maintenance planning.",
      "The system integrates embedded hardware, sensor-based data acquisition, cloud processing, database storage, and a React Native mobile application into a unified monitoring ecosystem. It provides early detection of overheating, overcurrent, and abnormal voltage drops."
    ],
    problem:
      "EV batteries are highly sensitive to overcurrent surges, rapid temperature elevation, and cell voltage fluctuations, which cause efficiency losses, rapid degradation, and thermal safety hazards. Continuous automated telemetry is essential for safe operation.",
    objective:
      "To design a real-time, low-latency monitoring system that captures battery operational parameters and feeds an intelligent predictive pipeline for anomaly detection and health assessment.",
    howItWorks: [
      {
        title: "Data Acquisition",
        text: "An INA219 sensor continuously samples battery bus voltage and current, while dedicated thermal sensors track battery temperature variations."
      },
      {
        title: "Embedded Processing",
        text: "The VVM601 / ESP32-S3 microcontroller ingests raw telemetry, filters noise, and computes instantaneous power alongside hybrid State of Charge (SoC) estimation."
      },
      {
        title: "Cloud Telemetry Pipeline",
        text: "Data is packaged and securely transmitted via HTTP/MQTT through an Nginx reverse proxy to an AWS cloud server backend."
      },
      {
        title: "Predictive Analytics",
        text: "Machine learning Decision Tree models analyze historical and real-time streams to detect thermal anomalies and abnormal discharge profiles."
      },
      {
        title: "Mobile Interface",
        text: "A React Native cross-platform application visualizes live battery health tiles, historical trend charts, and alerts."
      }
    ],
    keyFeatures: [
      "Real-time battery parameter telemetry (Voltage, Current, Power, Temperature)",
      "Hybrid State of Charge (SoC) calculation & Coulomb counting",
      "Cloud-based historical logging with timestamped JSON logs",
      "React Native mobile dashboard for remote diagnostics",
      "AI anomaly detection architecture for thermal runaway prevention"
    ],
    technologies: [
      "ESP32-S3",
      "VVM601",
      "INA219",
      "Temperature Sensors",
      "Nginx",
      "AWS Cloud",
      "Python",
      "Decision Trees",
      "React Native"
    ],
    verifiedResults: [
      "Confirmed low-latency telemetry transmission from microcontroller to React Native app.",
      "Successfully verified sensor readings against cloud database timestamped JSON log records.",
      "Conducted physical bench testing with motor loads and real-time current draw curves."
    ],
    coverImage: "/images/projects/crux.jpg",
    coverAlt: "CRUX battery monitoring board on perfboard with VVM601 controller and INA219 sensor",
    diagrams: [
      {
        src: "/images/projects/crux-block-diagram.png",
        alt: "CRUX Telemetry & System Architecture Block Diagram",
        caption: "System Block Diagram: Battery & sensors to VVM601 MCU, AWS Cloud Server, and React Native Client"
      },
      {
        src: "/images/projects/crux/circuit-diagram.webp",
        alt: "CRUX Hardware Circuit Schematic",
        caption: "Circuit Schematic: 12V Supply, DC-DC Buck Converter, VVM601 Pinout & Sensing Circuit"
      }
    ],
    gallery: [
      {
        src: "/images/projects/crux-load-test.jpg",
        alt: "CRUX Motor-Load Test Bench Setup",
        caption: "Bench setup with DC motor loads, telemetry enclosure, and live smartphone monitoring"
      },
      {
        src: "/images/projects/crux/gallery/hardware-labelled.webp",
        alt: "Labelled CRUX Hardware Components",
        caption: "Labelled hardware: INA219 current sensor, VVM-601 ESP32-S3, buck converter, RTC module"
      },
      {
        src: "/images/projects/crux/serial-monitor.webp",
        alt: "CRUX Microcontroller Serial Telemetry Output",
        caption: "Microcontroller serial monitor output logging SoC, voltage, current, and temperature"
      },
      {
        src: "/images/projects/crux/app-screenshot.webp",
        alt: "React Native Mobile Telemetry Application",
        caption: "React Native mobile telemetry UI displaying real-time vehicle battery vitals"
      }
    ],
    githubUrl: "https://github.com/cyphercrux/crux-model",
    paperNote: "Presented at technical symposium; co-authored academic research paper."
  },
  {
    id: "02",
    slug: "classroom-automation",
    title: "Classroom Automation Using ESP8266 and IoT",
    shortTitle: "IoT Classroom Automation",
    category: "IoT & Automation",
    categories: ["IoT & Automation", "Embedded Systems", "Electrical Engineering"],
    status: "Prototype",
    featured: true,
    shortDescription:
      "A microcontroller-based electrical switching prototype utilizing an ESP8266 Wi-Fi board and a 4-channel electromechanical relay module to remotely control, schedule, and automate institutional electrical loads.",
    overview: [
      "The IoT-Based Classroom Automation System is an embedded switching solution developed to centrally manage lighting and ventilation appliances across classrooms and institutional spaces.",
      "By interfacing an ESP8266 Wi-Fi development board with optocoupler-isolated relays, the system allows remote switching over local or cloud IoT platforms, curtailing idle electricity waste in unoccupied rooms."
    ],
    problem:
      "Classrooms and university laboratories frequently suffer from significant power wastage when lighting, fans, and projectors remain energized during non-occupancy hours, lacking centralized or automated override control.",
    objective:
      "To design and assemble a robust, cost-effective IoT switching controller capable of independently toggling multi-channel AC loads with remote interface feedback.",
    howItWorks: [
      {
        title: "Network Connectivity",
        text: "The ESP8266 connects to the institutional Wi-Fi network and maintains an encrypted bidirectional communication channel."
      },
      {
        title: "Command Routing",
        text: "Switching triggers from the dashboard or mobile interface are translated into digital GPIO state changes on the microcontroller."
      },
      {
        title: "Relay Driver Isolation",
        text: "Transistor-based drivers and optocouplers switch 5V electromechanical relay coils while safely isolating the low-voltage logic from mains AC."
      },
      {
        title: "Load Operation",
        text: "Relay contacts close or open high-voltage appliance circuits with audible feedback and visual LED state indications."
      }
    ],
    keyFeatures: [
      "ESP8266 NodeMCU Wi-Fi architecture",
      "4-channel high-voltage electromechanical relay switching",
      "Optically isolated control circuit for microcontroller safety",
      "Custom compact perfboard prototype fabrication",
      "Modular expandability for automated schedule timers"
    ],
    technologies: [
      "NodeMCU ESP8266",
      "4-Channel Relay Modules",
      "Blynk IoT Platform",
      "Wi-Fi Telemetry",
      "Embedded C/C++",
      "Hardware Prototyping"
    ],
    verifiedResults: [
      "Validated independent switching of four discrete electrical appliance circuits.",
      "Achieved stable remote operation through network control dashboard.",
      "Eliminated idle standby power draw during non-lecture hours."
    ],
    coverImage: "/images/projects/classroom-automation.jpg",
    coverAlt: "ESP8266 NodeMCU controller wired to 4-channel relay module on custom prototyping board",
    diagrams: [
      {
        src: "/images/projects/classroom-architecture.webp",
        alt: "Classroom Automation System Architecture",
        caption: "System Architecture: Remote Interface → Wi-Fi Gateway → NodeMCU ESP8266 → 4-Channel Relays → Classroom Loads"
      }
    ],
    gallery: [
      {
        src: "/images/projects/classroom-automation/smart-classroom-architecture.webp",
        alt: "Blynk + ESP8266 Relay Control Flowchart",
        caption: "Blynk IoT interface integration and hardware relay driver topology"
      }
    ],
    githubUrl: "https://github.com/cyphercrux/Classroom-automation",
    paperNote: "Hardware prototype evaluated for campus energy management."
  },
  {
    id: "03",
    slug: "pir-lighting",
    title: "PIR Sensor-Based Automatic Lighting System",
    shortTitle: "PIR Automatic Lighting",
    category: "Embedded Systems",
    categories: ["Embedded Systems", "Electrical Engineering"],
    status: "Prototype",
    featured: true,
    shortDescription:
      "An automated occupancy-sensing lighting controller utilizing an Arduino Uno, HC-SR501 passive infrared sensor, and a 5V relay module for energy-efficient room and corridor lighting.",
    overview: [
      "The PIR Sensor Lighting System automates lighting circuits based on real-time human movement detection. The prototype integrates an Arduino Uno microcontroller, an HC-SR501 passive infrared sensor, and a heavy-duty relay module.",
      "It provides hands-free illumination and automatically terminates power delivery when room inactivity is sustained beyond a configurable timeout window."
    ],
    problem:
      "Manual switch operation in public corridors, restrooms, and storage spaces results in lights remaining powered continuously for hours without human presence, wasting electrical energy and reducing lamp lifespan.",
    objective:
      "To build a responsive motion-triggered switching circuit with programmable countdown timers and reliable noise rejection.",
    howItWorks: [
      {
        title: "Infrared Radiation Detection",
        text: "The HC-SR501 dual-element pyroelectric sensor monitors changes in ambient infrared radiation caused by human body heat movement."
      },
      {
        title: "Digital Trigger Signal",
        text: "Upon sensing infrared disruption, the sensor module produces a 3.3V digital HIGH pulse to the microcontroller input pin."
      },
      {
        title: "Microcontroller State Logic",
        text: "The Arduino Uno processes the interrupt pulse, turns on the relay output, and initiates an internal non-blocking countdown timer."
      },
      {
        title: "Automatic Turn-Off",
        text: "If no subsequent motion is detected within the programmed hold time (e.g. 30 seconds), the Arduino de-energizes the relay coil to cut power."
      }
    ],
    keyFeatures: [
      "Passive infrared (PIR) pyroelectric motion detection",
      "Arduino Uno microcontroller state machine with non-blocking timing",
      "5V optocoupled relay output for mains-rated electrical switching",
      "Configurable hold-time delay and sensitivity adjustment",
      "Zero manual touch requirement for hygiene and convenience"
    ],
    technologies: [
      "Arduino Uno",
      "HC-SR501 PIR Sensor",
      "5V Relay Module",
      "Embedded C/C++",
      "Electrical Circuit Assembly"
    ],
    verifiedResults: [
      "Demonstrated instantaneous light activation within 150ms of human motion detection.",
      "Reliable automatic power disconnection after 30 seconds of quiet occupancy.",
      "Confirmed significant reduction in duty cycle for auxiliary corridor lighting."
    ],
    coverImage: "/images/projects/pir-lighting.jpg",
    coverAlt: "Arduino Uno wired to HC-SR501 PIR motion sensor and relay module on test bench",
    diagrams: [
      {
        src: "/images/projects/pir-architecture.webp",
        alt: "PIR Lighting System Functional Block Diagram",
        caption: "Motion Detection Flow: Human Movement → HC-SR501 PIR Sensor → Arduino Uno (30s Timer) → 5V Relay → Load"
      }
    ],
    gallery: [
      {
        src: "/images/projects/pir-lighting/pir-sensor-flow-diagram.webp",
        alt: "PIR Lighting Wiring and Control Architecture",
        caption: "Hardware wiring schematic: Sensor pinout, microcontroller input, and relay switching contact"
      }
    ],
    githubUrl: "https://github.com/cyphercrux/PIR-system",
    paperNote: "Prototyped and verified on laboratory test bench."
  },
  {
    id: "04",
    slug: "mobile-jammer",
    title: "Mobile Signal Jammer — RF Electronics Prototype",
    shortTitle: "RF Oscillator Prototype",
    category: "Electronics",
    categories: ["Electronics", "Electrical Engineering"],
    status: "Prototype",
    featured: false,
    shortDescription:
      "An academic electronics project exploring radio-frequency concepts, analog oscillator principles, and high-frequency circuit prototyping using an NE555 timer IC, discrete inductors, and tuned LC resonant tanks.",
    overview: [
      "This hardware project investigates analog radio-frequency principles and high-frequency wave generation on prototyping perfboards.",
      "Built with an NE555 timer IC configured for high-frequency oscillation, custom wound inductors, precision capacitors, and tuning potentiometers, the circuit demonstrates the physical fundamentals of RF emissions and carrier disruption."
    ],
    problem:
      "Studying wireless carrier disruption, oscillator frequency stability, and parasitic circuit behavior requires hands-on exploration of analog LC tank circuits and RF wave generation.",
    objective:
      "To assemble an analog high-frequency oscillator circuit to study frequency modulation, resonant tank behaviors, and the theoretical mechanics of carrier interference.",
    howItWorks: [
      {
        title: "Astable Oscillation",
        text: "The NE555 timer is configured in astable multivibrator mode, outputting continuous square-wave pulses determined by external timing resistors and capacitors."
      },
      {
        title: "LC Resonant Tuning",
        text: "An inductive coil paired with a variable trimmer capacitor forms a tuned resonant tank to shape and oscillate high-frequency harmonics."
      },
      {
        title: "RF Energy Radiance",
        text: "High-frequency currents driven through the inductive antenna radiate electromagnetic waves across localized test frequencies."
      },
      {
        title: "Carrier Superposition",
        text: "Radiated RF noise creates destructive interference with weak incoming receiver carriers within close laboratory range."
      }
    ],
    keyFeatures: [
      "NE555 precision timer oscillator core",
      "Discrete hand-wound copper inductive coils",
      "Tunable LC resonant tank with trimmer potentiometer",
      "Manual toggle power switch with LED diagnostic indicator",
      "Clean perfboard layout optimized for analog stability"
    ],
    technologies: [
      "NE555 Timer IC",
      "Analog Electronics",
      "Inductive Coils",
      "Resonant LC Tank",
      "RF Prototyping",
      "Soldering & Circuit Fabrication"
    ],
    verifiedResults: [
      "Verified stable high-frequency pulse generation on oscilloscope test probe.",
      "Observed resonant frequency shifts corresponding to inductance and capacitance tuning.",
      "Documented analog oscillator behavior for academic coursework report."
    ],
    coverImage: "/images/projects/rf-project.jpg",
    coverAlt: "Analog RF oscillator prototype on perfboard with NE555 timer, copper coils and discrete components",
    diagrams: [],
    gallery: [],
    githubUrl: "https://github.com/cyphercrux/mobile-network-jammer",
    paperNote: "Strictly educational project exploring analog RF fundamentals in controlled lab conditions."
  }
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
