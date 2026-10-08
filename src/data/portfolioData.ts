import { PersonalInfo, Project, Skill, Experience, EducationItem, ServiceItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: {
    latin: "SAHNOUNE CHAOUCHE ABDERREZAK",
    arabic: "عبدالرزاق سحنون شاوش",
  },
  title: {
    en: "Full-Stack Web & Desktop Developer",
    fr: "Développeur Full-Stack Web & Desktop",
    ar: "مطور تطبيقات ويب وسطح مكتب Full-Stack",
  },
  subtitle: {
    en: "Software Engineer specializing in modern web applications, desktop software, database architecture, and server infrastructure.",
    fr: "Ingénieur en Informatique spécialisé dans le développement d'applications web modernes, solutions desktop, bases de données et infrastructure serveur.",
    ar: "مهندس في الإعلام الآلي متخصص في تطوير تطبيقات الويب الحديثة وبرمجيات سطح المكتب وهندسة قواعد البيانات والبنية التحتية للخوادم.",
  },
  email: "abderrezaksac@gmail.com",
  phone: "07 80 41 23 78",
  whatsapp: "+213780412378",
  location: {
    en: "Algiers, Algeria",
    fr: "Alger, Algérie",
    ar: "الجزائر، الجزائر",
  },
  driverLicense: "Permis B",
  languages: [
    {
      name: { en: "French", fr: "Français", ar: "الفرنسية" },
      level: "B2 (Professional)",
    },
    {
      name: { en: "English", fr: "Anglais", ar: "الإنجليزية" },
      level: "B2 (Professional)",
    },
    {
      name: { en: "Arabic", fr: "Arabe", ar: "العربية" },
      level: "Native",
    }
  ],
  socials: {
    github: "https://github.com/abderrezaksac", // easily customizable
    linkedin: "https://www.linkedin.com/in/abderrezak-sahnoune-chaouche", // easily customizable
    email: "mailto:abderrezaksac@gmail.com",
    whatsapp: "https://wa.me/213780412378",
    phone: "tel:+213780412378",
  },
  stats: {
    yearsExperience: 3,
    technologiesCount: 15,
    projectsCompleted: 8,
    satisfactionRate: 100,
  }
};

export const projects: Project[] = [
  {
    id: "civil-society",
    title: "Civil Society Digital Platform",
    category: "government",
    featured: true,
    technologies: ["React.js", "JavaScript", "Python", "Django", "PostgreSQL", "Nginx", "VM Linux"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://civilsociety.marsad.dz",
    githubUrl: "https://github.com/abderrezaksac/civil-society-platform",
    description: {
      en: "Official nationwide digital platform for the Algerian Civil Society Observatory, digitizing core public interactions and civic engagement services.",
      fr: "Plateforme numérique officielle dédiée à l'Observatoire National de la Société Civile permettant la digitalisation de plusieurs services et interactions citoyennes.",
      ar: "منصة رقمية وطنية رسمية للمرصد الوطني للمجتمع المدني تتيح رقمنة العديد من الخدمات والتفاعلات المؤسساتية والمجتمعية.",
    },
    longDescription: {
      en: "Architected and built the complete frontend and core systems, hosted on dedicated Virtual Machines provided by Algérie Télécom within a managed Data Center environment.",
      fr: "Conception et réalisation de l'architecture frontend et intégration avec les APIs Django, hébergée sur des machines virtuelles Algérie Télécom dans un Data Center.",
      ar: "هندسة وبناء الواجهة الأمامية وربطها بالخوادم المستضافة على أجهزة افتراضية مزودة من اتصالات الجزائر ضمن مركز بيانات متطور.",
    },
    highlights: {
      en: [
        "High-performance React frontend with responsive UI",
        "Secure Django REST APIs & PostgreSQL persistence",
        "Hosted on Algérie Télécom Virtual Machines with Nginx reverse proxy",
        "High availability and data integrity for public services"
      ],
      fr: [
        "Frontend React haute performance et ergonomique",
        "APIs sécurisées Django REST et base PostgreSQL",
        "Déploiement sur machines virtuelles Algérie Télécom avec Nginx",
        "Haute disponibilité et intégrité des données publiques"
      ],
      ar: [
        "واجهة أمامية سريعة ومتجاوبة بتقنية React",
        "واجهات برمجية آمنة عبر Django وقاعدة بيانات PostgreSQL",
        "استضافة على أجهزة افتراضية لاتصالات الجزائر مع خادم Nginx",
        "جاهزية عالية وحماية لبيانات المنظومة"
      ]
    }
  },
  {
    id: "blood-donors",
    title: "Blood Donors Life-Saving Platform",
    category: "government",
    featured: true,
    technologies: ["React.js", "Django", "Python", "PostgreSQL", "REST API", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://civilsociety.marsad.dz/donors",
    githubUrl: "https://github.com/abderrezaksac/blood-donors-platform",
    description: {
      en: "Dedicated healthcare platform connecting voluntary blood donors with regional medical centers and urgent blood transfusion needs across the nation.",
      fr: "Plateforme solidaire de donneurs de sang reliant les donneurs volontaires aux centres médicaux et répondant aux urgences de transfusion sanguine.",
      ar: "منصة وطنية للتبرع بالدم تربط المتبرعين المتطوعين بالمراكز الطبية وتلبي احتياجات نقل الدم العاجلة بكفاءة وسرعة.",
    },
    longDescription: {
      en: "Built to provide real-time donor matching, geolocation-based filtering, and fast emergency notifications for critical blood shortages.",
      fr: "Développée pour offrir un ciblage rapide des donneurs par groupe sanguin et région, avec gestion des alertes d'urgence.",
      ar: "تم تطويرها لتوفير مطابقة فورية للمتبرعين حسب فصيلة الدم والمنطقة الجغرافية مع نظام تنبيهات عاجلة للحالات الحرجة.",
    },
    highlights: {
      en: [
        "Instant donor lookup filtered by blood type and province",
        "Responsive interface optimized for mobile and emergency usage",
        "Strict privacy protection and verified donor registry"
      ],
      fr: [
        "Recherche instantanée des donneurs par groupe sanguin et wilaya",
        "Interface responsive optimisée pour l'usage mobile et les urgences",
        "Protection des données personnelles et registre vérifié"
      ],
      ar: [
        "بحث فوري عن المتبرعين حسب فصيلة الدم والولاية",
        "واجهة متجاوبة ومجهزة لحالات الطوارئ",
        "حماية الخصوصية وسجل معتمد للمتبرعين"
      ]
    }
  },
  {
    id: "school-management",
    title: "CEM Middle School Management System",
    category: "desktop",
    featured: true,
    technologies: ["Python", "SQL", "Database Design", "Desktop GUI", "Reporting Engine"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/abderrezaksac/school-management-system",
    description: {
      en: "Comprehensive school management software automating student enrollment, academic records, grade transcripts, and administrative workflows.",
      fr: "Logiciel complet de gestion de scolarité pour collège (CEM) automatisant l'inscription des élèves, les relevés de notes et la gestion administrative.",
      ar: "برنامج متكامل لإدارة شؤون التلاميذ والتمدرس بالتعليم المتوسط، لأتمتة التسجيلات وكشوف النقاط والتقارير الإدارية.",
    },
    longDescription: {
      en: "Delivered to educational institutions to streamline student files, track attendance, calculate automated term averages, and export official reports.",
      fr: "Développé pour simplifier le suivi scolaire, calculer automatiquement les moyennes et exporter les documents officiels.",
      ar: "صُمم لتسهيل متابعة التلاميذ، وحساب المعدلات الفصلية آلياً، واستخراج التقارير الرسمية والشهادات المدرسية.",
    },
    highlights: {
      en: [
        "Automated grade calculation and transcript generation",
        "Fast local SQL database storage with zero cloud latency",
        "Role-based access for administration and teachers"
      ],
      fr: [
        "Calcul automatisé des moyennes et génération des bulletins",
        "Base de données SQL locale rapide et sécurisée",
        "Gestion des accès par rôle pour l'administration et enseignants"
      ],
      ar: [
        "حساب آلي للمعدلات وإصدار كشوف النقاط",
        "قاعدة بيانات محلية سريعة ومحمية",
        "صلاحيات مخصصة للإدارة والأساتذة"
      ]
    }
  },
  {
    id: "twitter-sarcasm-detection",
    title: "Twitter Sarcasm & NLP Sentiment AI",
    category: "ml",
    featured: true,
    technologies: ["Python", "Machine Learning", "NLP", "Text Processing", "Data Science"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/abderrezaksac/nlp-sarcasm-detection",
    description: {
      en: "Natural Language Processing and Machine Learning model trained to identify sarcasm and nuanced linguistic sentiment in social media streams.",
      fr: "Modèle de Traitement Automatique du Langage Naturel (NLP) et Machine Learning entraîné pour détecter le sarcasme et les nuances sémantiques sur Twitter.",
      ar: "نموذج ذكاء اصطناعي لمعالجة اللغات الطبيعية (NLP) مدرب على كشف السخرية والتهكم والمعاني المبطنة في التغريدات والمنشورات.",
    },
    longDescription: {
      en: "Utilized modern NLP preprocessing, feature extraction, TF-IDF / embeddings, and classification algorithms to accurately evaluate context cues.",
      fr: "Utilise des techniques avancées de prétraitement textuel, d'extraction de caractéristiques et de classification sémantique.",
      ar: "يعتمد على تقنيات متقدمة لمعالجة النصوص واستخراج الخصائص الدلالية وتصنيف المعاني غير المباشرة.",
    },
    highlights: {
      en: [
        "NLP preprocessing pipeline for slang, emojis, and hashtags",
        "High accuracy in nuanced sentiment classification",
        "Interactive testing interface for real-time text analysis"
      ],
      fr: [
        "Pipeline de traitement pour argot, émoticônes et hashtags",
        "Précision élevée dans la classification des nuances de langage",
        "Interface de test en temps réel pour l'analyse de phrases"
      ],
      ar: [
        "معالجة متقدمة للمفردات العامية والرموز التعبيرية والوسوم",
        "دقة تصنيف عالية للمشاعر المركبة",
        "واجهة تفاعلية لاختبار النصوص وتحليلها فورياً"
      ]
    }
  }
];

export const skills: Skill[] = [
  // Frontend
  {
    name: "React.js",
    category: "frontend",
    level: 92,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Hooks, SPA, State Management, Custom Components", fr: "Hooks, SPA, Gestion d'état, Composants sur mesure", ar: "هوكز، تطبيقات الصفحة الواحدة، إدارة الحالة، مكونات مخصصة" },
    iconName: "Atom",
    color: "#00f2fe",
  },
  {
    name: "JavaScript (ES6+)",
    category: "frontend",
    level: 90,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Async/Await, DOM, Modern Web APIs, Event-driven", fr: "Async/Await, DOM, APIs Web modernes, Événements", ar: "البرمجة غير المتزامنة، التفاعل مع DOM، أحدث ميزات ES6+" },
    iconName: "Code2",
    color: "#f7df1e",
  },
  {
    name: "HTML5",
    category: "frontend",
    level: 95,
    levelLabel: { en: "Expert", fr: "Expert", ar: "خبير" },
    description: { en: "Semantic Markup, SEO, Accessibility, Forms", fr: "Balisage sémantique, SEO, Accessibilité, Formulaires", ar: "هيكلة سيمانتيك، توافق مع محركات البحث SEO، إمكانية الوصول" },
    iconName: "FileCode2",
    color: "#e34f26",
  },
  {
    name: "CSS3 / Modern UI",
    category: "frontend",
    level: 92,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Flexbox, Grid, Animations, Responsive, Glassmorphism", fr: "Flexbox, Grid, Animations, Responsive, Glassmorphism", ar: "تصميم متجاوب، فليكس بوكس، غريد، تحريكات عصرية" },
    iconName: "Palette",
    color: "#38bdf8",
  },

  // Backend
  {
    name: "Python",
    category: "backend",
    level: 92,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "OOP, Scripting, Automation, Data Processing, Algorithms", fr: "POO, Scripting, Automatisation, Algorithmes", ar: "البرمجة كائنية التوجه، الأتمتة، معالجة البيانات، الخوارزميات" },
    iconName: "Terminal",
    color: "#3776ab",
  },
  {
    name: "Django / Django REST",
    category: "backend",
    level: 88,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "REST APIs, Authentication, ORM, Admin, Architecture", fr: "APIs REST, Authentification, ORM, Sécurité, Architecture", ar: "بناء واجهات REST API، التوثيق، ORM، أمان التطبيقات" },
    iconName: "Server",
    color: "#092e20",
  },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
    level: 88,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Schema Design, Indexes, Constraints, Relations, Optimization", fr: "Modélisation relationnelle, Index, Contraintes, Optimisation", ar: "تصميم المخططات، الفهارس، العلاقات، تحسين الأداء" },
    iconName: "Database",
    color: "#336791",
  },
  {
    name: "SQL",
    category: "database",
    level: 90,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Complex Queries, Joins, Triggers, Views, Transactions", fr: "Requêtes complexes, Jointures, Vues, Transactions", ar: "استعلامات معقدة، الربط، المعاملات وقواعد البيانات" },
    iconName: "Layers",
    color: "#00f2fe",
  },

  // Infrastructure & DevOps
  {
    name: "Linux / Ubuntu",
    category: "infrastructure",
    level: 86,
    levelLabel: { en: "Proficient", fr: "Maîtrisé", ar: "متمكن" },
    description: { en: "Server Admin, Bash, Permissions, Services, Security", fr: "Administration serveur, Bash, Permissions, Services", ar: "إدارة خوادم لينكس، أوامر Bash، الصلاحيات، الخدمات" },
    iconName: "Cpu",
    color: "#e95420",
  },
  {
    name: "Nginx",
    category: "infrastructure",
    level: 84,
    levelLabel: { en: "Proficient", fr: "Maîtrisé", ar: "متمكن" },
    description: { en: "Reverse Proxy, SSL/TLS, Load Balancing, Web Hosting", fr: "Reverse Proxy, Configuration SSL, Hébergement Web", ar: "البروكسي العكسي، شهادات الأمان SSL، استضافة المواقع" },
    iconName: "Globe",
    color: "#009639",
  },
  {
    name: "Virtual Machines / VM",
    category: "infrastructure",
    level: 88,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Algérie Télécom VMs, VirtualBox, Datacenter Hosting", fr: "VMs Algérie Télécom, VirtualBox, Déploiement Data Center", ar: "أجهزة افتراضية، بيئة مراكز البيانات، استضافة التطبيقات" },
    iconName: "Boxes",
    color: "#8a2be2",
  },
  {
    name: "Windows Server & Desktop",
    category: "infrastructure",
    level: 90,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Enterprise Environment, System Maintenance, Networking", fr: "Environnement d'entreprise, Maintenance, Réseaux", ar: "بيئة المؤسسات، صيانة الأنظمة والشبكات" },
    iconName: "Monitor",
    color: "#0078d7",
  },

  // Tools
  {
    name: "Git / GitHub",
    category: "tools",
    level: 88,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Version Control, Branching, Pull Requests, Code Review", fr: "Contrôle de version, Branches, Collaboration d'équipe", ar: "التحكم بالإصدارات، الفروع، التعاون البرمجي" },
    iconName: "GitBranch",
    color: "#f05032",
  },
  {
    name: "VS Code & IDEs",
    category: "tools",
    level: 94,
    levelLabel: { en: "Expert", fr: "Expert", ar: "خبير" },
    description: { en: "Extensions, Debugging, Linting, Productivity Workflows", fr: "Débogage avancé, Extensions, Environnement optimisé", ar: "بيئة تطوير متكاملة، تصحيح الأخطاء، الإنتاجية البرمجية" },
    iconName: "Laptop",
    color: "#007acc",
  },
  {
    name: "MobaXterm & PuTTY",
    category: "tools",
    level: 90,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "SSH Remote Management, File Transfers, Terminal Sessions", fr: "Connexions SSH à distance, Gestion de terminaux", ar: "الاتصال البعيد SSH وإدارة الجلسات الطرفية" },
    iconName: "ShieldAlert",
    color: "#00ffcc",
  },
  {
    name: "FileZilla / FTP",
    category: "tools",
    level: 92,
    levelLabel: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
    description: { en: "Secure SFTP/FTP Deployments, Remote File Systems", fr: "Déploiements sécurisés SFTP, Synchronisation de fichiers", ar: "النقل الآمن للملفات SFTP وإدارة خوادم الملفات" },
    iconName: "HardDrive",
    color: "#bf2a2a",
  }
];

export const experiences: Experience[] = [
  {
    id: "exp-onsc",
    role: {
      en: "Software Engineer & Full-Stack Developer",
      fr: "Ingénieur Informatique / Développeur Full-Stack",
      ar: "مهندس إعلام آلي / مطور Full-Stack",
    },
    organization: "Observatoire National de la Société Civile",
    location: "Alger, Algérie",
    period: {
      en: "Since October 2023 — Present",
      fr: "Depuis Octobre 2023 — Présent",
      ar: "منذ أكتوبر 2023 — حتى الآن",
    },
    isCurrent: true,
    featured: true,
    tasks: {
      en: [
        "Architected and developed the frontend for the nationwide Civil Society Digital Platform (civilsociety.marsad.dz)",
        "Designed and implemented the Blood Donors Life-Saving Platform (civilsociety.marsad.dz/donors)",
        "Deployed, maintained, and managed application code on high-performance Virtual Machines provided by Algérie Télécom",
        "Managed on-premise and cloud Data Center infrastructure, ensuring 99.9% service continuity and security",
        "Orchestrated ongoing hardware and software IT maintenance, diagnostic resolution, and IT equipment rollout",
        "Applied cutting-edge React, Django, Python, PostgreSQL, and Nginx reverse proxy standards for government grade applications"
      ],
      fr: [
        "Création et architecture de la plateforme frontend Civil Society (civilsociety.marsad.dz)",
        "Création de la plateforme nationale de donneurs de sang (civilsociety.marsad.dz/donors)",
        "Hébergement du code et déploiement sur des machines virtuelles fournies par Algérie Télécom",
        "Gestion et supervision de l'infrastructure du Data Center et des environnements de production",
        "Gestion de la maintenance informatique, installation de matériel et résolution proactive des incidents techniques",
        "Développement d'applications Web avec technologies modernes Frontend (React) et Backend (Python / Django / PostgreSQL)"
      ],
      ar: [
        "بناء وهندسة الواجهة الأمامية للمنصة الرقمية للمجتمع المدني (civilsociety.marsad.dz)",
        "تطوير منصة المتبرعين بالدم لتلبية النداءات الطبية العاجلة (civilsociety.marsad.dz/donors)",
        "استضافة ونشر البرمجيات على أجهزة افتراضية متطورة مزودة من طرف اتصالات الجزائر",
        "إدارة مركز البيانات (Data Center) وضمان استمرارية الخدمات والجاهزية الأمنية",
        "إدارة وصيانة البنية التحتية لتكنولوجيا المعلومات وتركيب العتاد ومعالجة المشاكل التقنية",
        "استخدام أحدث تقنيات الويب Frontend و Backend وقواعد البيانات والخوادم"
      ]
    },
    technologies: ["React.js", "JavaScript", "Python", "Django", "PostgreSQL", "Nginx", "Linux VM", "Data Center", "Algérie Télécom"],
    links: [
      { name: "Civil Society Platform", url: "https://civilsociety.marsad.dz" },
      { name: "Blood Donors Platform", url: "https://civilsociety.marsad.dz/donors" }
    ]
  },
  {
    id: "exp-teacher",
    role: {
      en: "Computer Science Teacher",
      fr: "Professeur d'Informatique",
      ar: "أستاذ مادة الإعلام الآلي",
    },
    organization: "CEM Bousmaïl Saad",
    location: "El Affroune - Blida, Algérie",
    period: {
      en: "2022",
      fr: "2022",
      ar: "2022",
    },
    tasks: {
      en: [
        "Trained students in essential computer literacy, algorithmic thinking, and modern IT tools",
        "Delivered structured courses in Microsoft Office suite (Excel data analysis, Word formatting, PowerPoint presentations)",
        "Introduced visual programming, logical problem solving, and basic algorithmic concepts with Scratch"
      ],
      fr: [
        "Développement des capacités des étudiants dans la maîtrise des outils informatiques et la logique algorithmique",
        "Enseignement approfondi de la suite Microsoft Office (Excel, Word, PowerPoint)",
        "Initiation à la programmation et aux concepts logiques via Scratch"
      ],
      ar: [
        "تنمية وتطوير مهارات التلاميذ في استخدام الحواسيب والأدوات البرمجية والتفكير المنطقي",
        "تدريس حزمة برامج Microsoft Office (إكسل، وورد، باوربوينت)",
        "تعليم مبادئ البرمجة والخوارزميات عبر بيئة Scratch التفاعلية"
      ]
    },
    technologies: ["Scratch", "Algorithms", "Microsoft Office", "Excel", "Pedagogy"]
  },
  {
    id: "exp-statistician",
    role: {
      en: "National Statistics Application Controller",
      fr: "Contrôleur en Statistique National",
      ar: "مراقب وطني للإحصاء والتطبيقات الإحصائية",
    },
    organization: "National Statistics Project",
    location: "Algérie",
    period: {
      en: "2022",
      fr: "2022",
      ar: "2022",
    },
    tasks: {
      en: [
        "Troubleshot and debugged mobile & web statistical data collection applications in real time",
        "Trained field statistical agents on application usage, validation rules, and error recovery protocols",
        "Monitored live digital submissions, data integrity, and compliance across field agents"
      ],
      fr: [
        "Résolution technique des problèmes et bugs sur les applications statistiques de collecte de données",
        "Formation et accompagnement des agents statistiques sur les outils logiciels et protocoles",
        "Suivi et contrôle de la conformité et de l'intégrité des flux de données collectés"
      ],
      ar: [
        "حل المشكلات التقنية والأعطال في التطبيقات الميدانية لجمع البيانات الإحصائية",
        "تدريب أعوان الإحصاء على استخدام التطبيقات الرقمية وضوابط التحقق من البيانات",
        "متابعة ومراقبة دقة البيانات ومطابقتها للمعايير الرقمية المعتمدة"
      ]
    },
    technologies: ["Statistical Apps", "Data Validation", "Technical Support", "Troubleshooting"]
  },
  {
    id: "exp-freelance",
    role: {
      en: "Freelance Software Developer",
      fr: "Développeur Freelance",
      ar: "مطور برمجيات حر (Freelance)",
    },
    organization: "Independent Software Solutions",
    location: "Algeria & Remote",
    period: {
      en: "2022",
      fr: "2022",
      ar: "2022",
    },
    tasks: {
      en: [
        "Developed custom CEM Middle School management software for student records, enrollment, and grade reporting",
        "Engineered an NLP-powered Twitter sarcasm and sentiment detection system using Python machine learning algorithms",
        "Provided client technical consulting, database modeling, and bespoke software implementation"
      ],
      fr: [
        "Développement du logiciel de gestion de scolarité CEM (élèves, inscriptions, relevés de notes)",
        "Conception d'un système de détection de sarcasme sur Twitter basé sur le Machine Learning et le NLP",
        "Conseil technique et réalisation de solutions logicielles sur mesure pour divers clients"
      ],
      ar: [
        "تطوير برنامج مخصص لإدارة التمدرس بمؤسسات التعليم المتوسط (إدارة التلاميذ وكشوف النقاط)",
        "بناء نظام ذكي لكشف السخرية وتحليل المشاعر على منصة تويتر باستخدام تقنيات تعلم الآلة",
        "تقديم استشارات برمجية وتطوير حلول برمجية مخصصة حسب الطلب"
      ]
    },
    technologies: ["Python", "Machine Learning", "NLP", "SQL", "Database Design", "Desktop GUI"]
  }
];

export const education: EducationItem[] = [
  {
    id: "master",
    degree: {
      en: "Master's Degree in Software Engineering & Distributed Systems",
      fr: "Master en Génie Logiciel et Systèmes Distribués",
      ar: "ماستر في هندسة البرمجيات والأنظمة الموزعة",
    },
    institution: "Université Djilali Bounaama Khemis Miliana",
    period: "2021",
    details: {
      en: "In-depth specialization in advanced software architecture, distributed computing, database systems, concurrency, and enterprise design patterns.",
      fr: "Spécialisation approfondie en architectures logicielles avancées, systèmes distribués, bases de données, parallélisme et patrons de conception.",
      ar: "تخصص معمق في هندسة البرمجيات المتقدمة، الأنظمة الموزعة، قواعد البيانات، المعالجة المتزامنة، وأنماط التصميم المؤسساتية.",
    }
  },
  {
    id: "licence",
    degree: {
      en: "Bachelor's Degree in Computer Science Systems",
      fr: "Licence en Système Informatique",
      ar: "ليسانس في الإعلام الآلي ونظم المعلومات",
    },
    institution: "Université Djilali Bounaama Khemis Miliana",
    period: "2019",
    details: {
      en: "Core computer science fundamentals: algorithms, data structures, operating systems, networking, databases, and programming paradigms.",
      fr: "Fondamentaux de l'informatique : algorithmique, structures de données, systèmes d'exploitation, réseaux, bases de données et programmation.",
      ar: "الأسس المتينة للإعلام الآلي: الخوارزميات، هياكل البيانات، نظم التشغيل، الشبكات، قواعد البيانات ومبادئ البرمجة.",
    }
  },
  {
    id: "bac",
    degree: {
      en: "Baccalaureate in Experimental Sciences",
      fr: "Baccalauréat Sciences Expérimentales",
      ar: "بكالوريا علوم تجريبية",
    },
    institution: "Ministère de l'Éducation Nationale",
    period: "2016",
    details: {
      en: "Strong scientific foundation in mathematics, analytical reasoning, and physics.",
      fr: "Solide formation scientifique en mathématiques, raisonnement analytique et physique.",
      ar: "قاعدة علمية قوية في الرياضيات والتفكير التحليلي والعلوم الفيزيائية.",
    }
  }
];

export const services: ServiceItem[] = [
  {
    id: "web-dev",
    iconName: "Globe2",
    title: {
      en: "Modern Web Development",
      fr: "Développement Web Moderne",
      ar: "تطوير تطبيقات الويب الحديثة",
    },
    description: {
      en: "Building responsive, blazing-fast web applications using React.js, modern JavaScript, and clean component architectures.",
      fr: "Création d'applications web ultra-rapides et ergonomiques avec React.js, JavaScript moderne et une architecture propre.",
      ar: "بناء تطبيقات ويب فائقة السرعة ومتجاوبة باستخدام React.js وهندسة برمجية عصرية ونظيفة.",
    },
    features: {
      en: ["Single Page Applications (SPA)", "Interactive UX & Micro-animations", "SEO & Performance Optimization", "Responsive Multi-device Layouts"],
      fr: ["Applications Web Single Page (SPA)", "UX dynamique et animations fluides", "Optimisation SEO et rapidité", "Design adaptatif tous écrans"],
      ar: ["تطبيقات الصفحة الواحدة SPA", "تجربة مستخدم تفاعلية وسلسة", "تحسين محركات البحث وسرعة التحميل", "تصميم متجاوب لكافة الشاشات"]
    }
  },
  {
    id: "backend-dev",
    iconName: "Server",
    title: {
      en: "Backend & API Architecture",
      fr: "Architecture Backend & APIs",
      ar: "تطوير الواجهات الخلفية و APIs",
    },
    description: {
      en: "Engineering robust, scalable server-side systems and RESTful APIs using Python and the Django framework.",
      fr: "Conception de systèmes serveurs robustes et d'APIs RESTful évolutives avec Python et le framework Django.",
      ar: "بناء أنظمة خلفية متينة وقابلة للتوسع وواجهات برمجية RESTful بواسطة Python وإطار عمل Django.",
    },
    features: {
      en: ["Django REST Framework APIs", "Secure JWT & Session Auth", "Business Logic & Automation", "Third-party Integrations"],
      fr: ["APIs Django REST sécurisées", "Authentification JWT et sessions", "Logique métier et automatisation", "Intégration de services tiers"],
      ar: ["واجهات برمجية آمنة عبر Django REST", "أنظمة توثيق وحماية متقدمة", "أتمتة العمليات والمنطق البرمجي", "ربط الخدمات والأنظمة الخارجية"]
    }
  },
  {
    id: "database-dev",
    iconName: "Database",
    title: {
      en: "Database Engineering & SQL",
      fr: "Ingénierie de Bases de Données",
      ar: "هندسة وإدارة قواعد البيانات",
    },
    description: {
      en: "Designing resilient relational database schemas, query optimization, indexing, and data security with PostgreSQL & SQL.",
      fr: "Modélisation relationnelle robuste, optimisation de requêtes SQL, indexation et intégrité des données avec PostgreSQL.",
      ar: "تصميم مخططات قواعد البيانات العلائقية، وتحسين الاستعلامات والفهارس وحماية البيانات عبر PostgreSQL و SQL.",
    },
    features: {
      en: ["PostgreSQL Schema Design", "Query Performance Tuning", "Data Migration & Backups", "Complex Relational Constraints"],
      fr: ["Conception de schémas PostgreSQL", "Optimisation des performances SQL", "Migrations et sauvegardes", "Contraintes relationnelles avancées"],
      ar: ["تصميم مخططات PostgreSQL", "تحسين سرعة الاستعلامات الضخمة", "النسخ الاحتياطي وترحيل البيانات", "سلامة وتكامل البيانات المعقدة"]
    }
  },
  {
    id: "desktop-dev",
    iconName: "Laptop",
    title: {
      en: "Desktop Applications",
      fr: "Applications Desktop",
      ar: "تطوير برمجيات سطح المكتب",
    },
    description: {
      en: "Crafting customized, offline-first desktop software for enterprise management, school administration, and local workflows.",
      fr: "Développement de logiciels desktop sur mesure pour la gestion d'établissements, d'entreprises et le travail hors-ligne.",
      ar: "برمجة برمجيات سطح مكتب مخصصة لإدارة المؤسسات والمدارس والأنشطة الإدارية مع العمل دون إنترنت.",
    },
    features: {
      en: ["Tailored Business Software", "Local Database Integration", "Automated PDF/Excel Reporting", "Intuitive User Interfaces"],
      fr: ["Logiciels métiers sur mesure", "Bases de données locales intégrées", "Génération de rapports PDF/Excel", "Interfaces simples et ergonomiques"],
      ar: ["برمجيات أعمال مفصلة حسب الطلب", "قواعد بيانات محلية مدمجة", "إصدار تقارير PDF وإكسل تلقائياً", "واجهات مستخدم سهلة ومريحة"]
    }
  },
  {
    id: "deployment-dev",
    iconName: "Cpu",
    title: {
      en: "Deployment & Server Management",
      fr: "Déploiement & Gestion de Serveurs",
      ar: "النشر وإدارة الخوادم والاستضافة",
    },
    description: {
      en: "Configuring Linux VMs, Nginx reverse proxies, SSL certificates, and deploying apps to production Data Center environments.",
      fr: "Configuration de machines virtuelles Linux, reverse proxy Nginx, certificats SSL et mise en production en Data Center.",
      ar: "إعداد الخوادم الافتراضية Linux وخوادم Nginx وشهادات الأمان ونشر التطبيقات في بيئات مراكز البيانات.",
    },
    features: {
      en: ["Linux VM Administration", "Nginx Reverse Proxy & SSL", "Data Center Code Deployment", "Monitoring & Production Stability"],
      fr: ["Administration de VM Linux", "Configuration Nginx & Certificats SSL", "Déploiement en Data Center", "Surveillance et haute disponibilité"],
      ar: ["إدارة أجهزة Linux الافتراضية", "إعداد البروكسي العكسي Nginx والـ SSL", "نشر المشاريع في مراكز البيانات", "مراقبة الاستقرار واستمرارية العمل"]
    }
  },
  {
    id: "it-solutions",
    iconName: "ShieldCheck",
    title: {
      en: "IT Solutions & Technical Support",
      fr: "Solutions IT & Support Technique",
      ar: "الحلول التقنية والدعم الفني",
    },
    description: {
      en: "Diagnosing complex technical bottlenecks, network troubleshooting, hardware rollout, and engineering bespoke software fixes.",
      fr: "Diagnostic des blocages techniques, maintenance des réseaux, installation de matériel et assistance informatique experte.",
      ar: "تشخيص الأعطال التقنية المعقدة، صيانة الشبكات والأنظمة، تركيب التجهيزات وتقديم الدعم الفني المتخصص.",
    },
    features: {
      en: ["Comprehensive IT Diagnostics", "Hardware & Software Maintenance", "Network Configuration", "Workflow Digitization"],
      fr: ["Diagnostics informatiques complets", "Maintenance matérielle et logicielle", "Configuration réseaux", "Digitalisation des processus"],
      ar: ["تشخيص شامل للمنظومة التقنية", "صيانة العتاد والبرمجيات", "إعداد وضبط الشبكات", "رقمنة المعاملات والأنشطة"]
    }
  }
];

export const howIBuildSteps = [
  {
    step: "01",
    title: { en: "Analyze", fr: "Analyser", ar: "التحليل" },
    subtitle: {
      en: "Deep dive into business requirements, user needs, and architectural boundaries.",
      fr: "Étude approfondie des besoins métiers, des cas d'usage et des exigences techniques.",
      ar: "دراسة متعمقة لمتطلبات المشروع، وتحديد احتياجات المستخدم والهيكلية التقنية.",
    },
    iconName: "SearchCheck",
    color: "#00f2fe",
  },
  {
    step: "02",
    title: { en: "Design", fr: "Concevoir", ar: "التصميم" },
    subtitle: {
      en: "Relational database modeling, API schema definition, and modern UI wireframing.",
      fr: "Modélisation des bases de données, spécification des APIs et ergonomie de l'interface.",
      ar: "تصميم مخططات قواعد البيانات، وتحديد هياكل الـ APIs وبناء واجهات مريحة وعصرية.",
    },
    iconName: "Compass",
    color: "#38bdf8",
  },
  {
    step: "03",
    title: { en: "Develop", fr: "Développer", ar: "التطوير" },
    subtitle: {
      en: "Writing clean, scalable, maintainable code using React, Python, Django, and PostgreSQL.",
      fr: "Écriture d'un code propre, modulaire et performant avec React, Python, Django et SQL.",
      ar: "كتابة كود نظيف وقابل للتوسع باستخدام React و Python و Django وقواعد بيانات قوية.",
    },
    iconName: "Code",
    color: "#8a2be2",
  },
  {
    step: "04",
    title: { en: "Test", fr: "Tester", ar: "الاختبار" },
    subtitle: {
      en: "Rigorous testing, edge-case handling, cross-browser validation, and data integrity checks.",
      fr: "Tests rigoureux, validation des cas limites, tests multi-écrans et sécurité des données.",
      ar: "اختبارات دقيقة لمعالجة كافة الحالات الخاصة، والتأكد من الأمان وسرعة الاستجابة.",
    },
    iconName: "ShieldAlert",
    color: "#00ffcc",
  },
  {
    step: "05",
    title: { en: "Deploy", fr: "Déployer", ar: "النشر" },
    subtitle: {
      en: "Production rollout on Linux VMs with Nginx, SSL configuration, and live monitoring.",
      fr: "Mise en production sur machines virtuelles Linux avec Nginx, SSL et supervision continue.",
      ar: "النشر الفعلي على خوادم Linux الافتراضية مع ضبط Nginx والأمان والمراقبة الحية.",
    },
    iconName: "Rocket",
    color: "#a855f7",
  }
];
