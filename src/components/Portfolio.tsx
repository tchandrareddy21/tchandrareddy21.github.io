
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Download, 
  Code, 
  Database, 
  Globe, 
  Smartphone,
  Server,
  Palette,
  Calendar,
  Award,
  GraduationCap,
  Briefcase,
  User,
  ChevronUp,
  TrendingUp,
  Target,
  Users,
  Star,
  Play,
  Eye,
  Brain,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MobileNav from './MobileNav';
import ProjectModal from './ProjectModal';
import profilePhoto from '@/assets/profile-photo.jpg';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    project: any;
    type: 'demo' | 'github' | 'learnMore';
  }>({
    isOpen: false,
    project: null,
    type: 'demo'
  });

  const fullText = "Data Scientist & ML Engineer";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    // Create a dummy PDF download (in real implementation, this would download an actual PDF)
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1q9JbicDhMbN-DPhyNBpPJXvpYn1rByCO'; // Replace with actual PDF URL
    link.download = 'TiyyaguraChandraReddy_Resume.pdf';
    link.click(); // Uncomment when you have an actual PDF
    
    toast({
      title: "Resume Download",
      description: "Resume download started successfully!",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const emailData = {
      to: "tchandrareddy21@gmail.com",
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // In a real implementation, you would send this data to your email service
    console.log('Email data:', emailData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
  };

  const skills = {
    "Machine Learning": [
      "Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "XGBoost", "SVM", "K-Means", "PCA", "DBSCAN"
    ],
    "Deep Learning": [
      "Artificial Neural Networks (ANN)", "Convolutional Neural Networks (CNN)", "Transfer Learning"
    ],
    "Natural Language Processing (NLP)": [
      "BERT", "GPT", "Transformers", "Tokenization", "Embeddings"
    ],
    "Generative AI": [
      "LangChain", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "AI Agents", "Vector Databases"
    ],
    "MLOps & Cloud": [
      "GitHub Actions", "Docker", "AWS SageMaker", "AWS Bedrock", "AWS S3", "AWS EC2", "AWS ECR", "MLflow"
    ],
    "Programming & Data Handling": [
      "Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"
    ],
    "Databases": [
      "MySQL", "MongoDB"
    ],
    "APIs & Deployment": [
      "Flask", "FastAPI", "Streamlit", "Postman", "AWS Elastic Beanstalk", "AWS Lambda"
    ]
  };

  const projects = [
    {
      title: "APS Failure Classification",
      description: "Engineered predictive analytics using a robust binary classification model focused on essential components of the Air Pressure System, reducing diagnostic time by approximately 25% through enhanced issue identification capabilities.",
      image: project1,
      technologies: ["Machine Learning", "FastAPI", "Docker", "MongoDB", "AWS(EC2, ECR, S3)"],
      liveUrl: "https://aps-failure-classification.streamlit.app",
      githubUrl: "https://github.com/tchandrareddy21/aps-failure-classification",
      metrics: {
        duration: "3 months",
        team: "Solo Project",
        impact: "25% faster diagnosis"
      },
      keyFeatures: ["Real-time prediction", "AWS deployment", "90% accuracy"]
    },
    {
      title: "Financial Product Complaint Analysis",
      description: "Built a machine learning system to classify and predict customer complaints for financial products, enabling quick identification of problematic complaints and helping companies take proactive action to resolve customer issues.",
      image: project2,
      technologies: ["Python", "Machine Learning", "Docker", "CircleCI", "Apache Airflow"],
      githubUrl: "https://github.com/tchandrareddy21/financial-product-complaint",
      metrics: {
        duration: "4 months",
        team: "Solo Project",
        impact: "Automated complaint triage"
      },
      keyFeatures: ["ML-based complaint classification", "Automated pipeline", "CI/CD integration"],
      hasLearnMore: true,
      learnMoreContent: {
        problemStatement: "Complaints can give us insights into problems people are experiencing in the marketplace and help us to understand the reason and do necessary modification in existing financial product if required.",
        solutionProposed: "By understanding existing complaints registered against financial products we can create an ML model that can help us to identify newly registered complaints whether they are problematic or not and accordingly company can take quick action to resolve the issue, and satisfy the customer's need. The problem is to identify registered complaint will be disputed by customer or not.",
        dataSource: "Consumer Financial Protection Bureau (CFPB) consumer complaints database",
        techStack: ["Python", "Machine Learning", "Docker", "CircleCI", "Apache Airflow", "Data Processing"],
        mlApproach: "Multi-class classification to categorize complaints and predict dispute likelihood",
        deployment: "Containerized solution with automated CI/CD pipeline using CircleCI",
        impact: "Enables companies to automatically triage complaints and prioritize resolution efforts"
      }
    },
    {
      title: "LLM-Based Document Q&A with RAG",
      description: "Developed an LLM-powered document Q&A system using Retrieval-Augmented Generation (RAG), integrating Groq for querying, OpenAI embeddings for vectorization, and FAISS for fast similarity search.",
      image: project3,
      technologies: ["LangChain", "Groq", "OpenAI", "FAISS", "Streamlit"],
      liveUrl: "https://llm-rag-qna.streamlit.app",
      githubUrl: "https://github.com/tchandrareddy21/llm-rag-qna",
      metrics: {
        duration: "2 months",
        team: "Solo Project", 
        impact: "95% query accuracy"
      },
      keyFeatures: ["Multi-document support", "Real-time Q&A", "Vector search"]
    },
    {
      title: "Logs Classification",
      description: "Developed a hybrid log classification system integrating Regex, Sentence Transformers with Logistic Regression, and Large Language Models (LLMs) to efficiently handle logs of varying complexity.",
      image: project1,
      technologies: ["FastAPI", "Streamlit", "Machine Learning", "RegEx", "GROQ"],
      liveUrl: "https://logs-classification.streamlit.app",
      githubUrl: "https://github.com/tchandrareddy21/logs-classification",
      metrics: {
        duration: "6 weeks",
        team: "2 developers",
        impact: "70% processing speed"
      },
      keyFeatures: ["Hybrid approach", "Multi-model pipeline", "High precision"]
    },
    {
      title: "Text2Query Chat",
      description: "Developed a Text-to-SQL chatbot using LangChain, GROQ API, and Streamlit, enabling seamless natural language database queries with 95% accuracy.",
      image: project1,
      technologies: ["Langchain", "GROQ", "Streamlit", "MySQL", "SQLite"],
      liveUrl: "https://text2query-chat.streamlit.app",
      githubUrl: "https://github.com/tchandrareddy21/text2query-chat",
      metrics: {
        duration: "1 month",
        team: "Solo Project",
        impact: "95% query accuracy"
      },
      keyFeatures: ["Natural language queries", "Multi-database support", "Chat interface"]
    }
  ];

  const openModal = (project: any, type: 'demo' | 'github' | 'learnMore') => {
    setModalState({
      isOpen: true,
      project,
      type
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      project: null,
      type: 'demo'
    });
  };

  const experiences = [
    {
      title: "Software Engineer (Full-Time)",
      company: "HCLTech",
      client: "Adobe",
      period: "Nov 2022 - Present",
      location: "Bengaluru",
      achievements: [
        {
          title: "AEM Notification System",
          description: "Designed notification cards for software compliance transition",
          impact: "Enhanced licensing adherence",
          skills: ["AEM", "User Engagement", "Compliance"]
        },
        {
          title: "Promotional Campaigns",
          description: "Developed AEM-based discount notification system",
          impact: "40% increase in conversion rates",
          skills: ["AEM", "Campaign Management", "Revenue Growth"]
        },
        {
          title: "A/B Testing Leadership",
          description: "Conducted optimization testing for user retention",
          impact: "Determined optimal 7-day grace period",
          skills: ["A/B Testing", "Data Analysis", "User Retention"]
        }
      ],
      keyMetrics: {
        teamSize: "Leading team of 4",
        projects: "15+ POCs delivered",
        impact: "40% conversion increase"
      },
      skills: ["AEM", "MILO", "A/B Testing", "Figma", "Jira", "AJO", "UWP"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology - Computer Science and Engineering",
      institution: "LBRCE",
      period: "Jun 2018 - May 2022",
      gpa: "8.95",
      description: "Graduated with 8.95 CGPA. Specialized in Computer Science and Engineering with strong foundation in algorithms, data structures, and software development."
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-SAA-123456"
    },
    {
      name: "Meta React Developer Certificate",
      issuer: "Meta",
      date: "2022",
      credentialId: "META-REACT-789"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022",
      credentialId: "GCP-DEV-456"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/20"
           style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)' }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              Tiyyagura Chandra Reddy
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <MobileNav activeSection={activeSection} scrollToSection={scrollToSection} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-purple-900/10 to-cyan-900/10">
        <div className="absolute inset-0 gradient-hero opacity-50"></div>
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Desktop Profile Image - Right Side */}
            <div className="hidden lg:flex flex-1 justify-end animate-scale-in order-2">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-card hover-glow animate-float">
                  <img 
                    src={profilePhoto} 
                    alt="Tiyyagura Chandra Reddy" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-4 rounded-full bg-gradient-primary opacity-20 blur-xl"></div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left animate-fade-in-up order-1">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="text-primary">
                  Hello, I'm
                </span>
                <br />
                <span className="text-foreground">Tiyyagura Chandra Reddy</span>
              </h1>
              <div className="text-xl lg:text-2xl mb-8 h-8">
                <span className="text-primary font-medium">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
              
              {/* Mobile/Tablet Profile Image - After Designation */}
              <div className="lg:hidden flex justify-center mb-8 animate-scale-in">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-card hover-glow animate-float">
                    <img 
                      src={profilePhoto} 
                      alt="Tiyyagura Chandra Reddy" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 rounded-full bg-gradient-primary opacity-20 blur-xl"></div>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Data Scientist / ML Engineer with 2+ years of experience as a Software Engineer and a strong foundation in Python, Machine Learning, NLP, Generative AI, and AWS-based deployments. Currently leading a team of 4 and collaborating with cross-functional stakeholders.
              </p>
              <div className="flex justify-center lg:justify-start gap-4 mb-6">
                <a
                  href="https://github.com/tchandrareddy21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow animate-float"
                  style={{ animationDelay: '0s' }}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tchandrareddy21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow animate-float"
                  style={{ animationDelay: '0.5s' }}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:tchandrareddy21@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              <div className="flex justify-center lg:justify-start">
                <Button 
                  onClick={handleDownloadResume}
                  size="lg" 
                  className="gradient-primary hover:opacity-90 transition-opacity"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="project-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <User className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Professional Summary</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I am a passionate Data Scientist / ML Engineer with 2+ years of experience as a Software Engineer 
                  and a strong foundation in Python, Machine Learning, NLP, Generative AI, and AWS-based deployments. 
                  I excel at building end-to-end ML solutions that extract insights from complex data and deliver 
                  measurable business impact.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  My expertise spans across the entire machine learning pipeline - from data preprocessing and 
                  feature engineering to model development, deployment, and monitoring. I have hands-on experience 
                  with supervised and unsupervised learning algorithms, natural language processing, and cutting-edge 
                  generative AI technologies including transformers, RAG systems, and AI agents.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Currently leading a team of 4 and collaborating with cross-functional stakeholders to ensure 
                  timely and high-quality project delivery. I'm passionate about leveraging AI and machine learning 
                  to solve real-world problems and drive innovation in data-driven decision making.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">
            Skills & Expertise
          </h2>
          <div className="max-w-6xl mx-auto">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="mb-12 group">
                <div className="flex items-center gap-3 mb-6">
                  {category === 'Machine Learning' && <Database className="h-7 w-7 text-accent" />}
                  {category === 'Deep Learning' && <Brain className="h-7 w-7 text-primary" />}
                  {category === 'Natural Language Processing (NLP)' && <MessageSquare className="h-7 w-7 text-cyan-glow" />}
                  {category === 'Generative AI' && <Sparkles className="h-7 w-7 text-accent" />}
                  {category === 'MLOps & Cloud' && <Server className="h-7 w-7 text-primary" />}
                  {category === 'Programming & Data Handling' && <Code className="h-7 w-7 text-primary" />}
                  {category === 'Databases' && <Database className="h-7 w-7 text-accent" />}
                  {category === 'APIs & Deployment' && <Globe className="h-7 w-7 text-accent" />}
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skillList.map((skill) => (
                    <div
                      key={skill}
                      className="group/skill relative px-4 py-2 rounded-full bg-card/60 backdrop-blur-xl border border-white/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                      style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 font-medium text-foreground group-hover/skill:text-primary transition-colors duration-300 text-sm">
                        {skill}
                      </span>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20" 
               style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="project-card group border-2 hover:border-primary/30 transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                 <CardContent className="p-6 space-y-4">
                   <div className="flex items-start justify-between gap-4">
                     <div className="flex-1">
                       <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                       <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                     </div>
                     <a
                       href={project.githubUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="p-2 border border-primary/50 hover:bg-primary/10 rounded-md transition-colors shrink-0"
                     >
                       <Github className="h-3 w-3 text-primary" />
                     </a>
                   </div>

                   {/* Key Features */}
                   <div className="space-y-2">
                     <h4 className="text-sm font-semibold text-primary">Key Features</h4>
                     <div className="flex flex-wrap gap-1">
                       {project.keyFeatures?.map((feature, idx) => (
                         <Badge key={idx} variant="outline" className="text-xs border-accent/50 text-accent bg-accent/5">
                           {feature}
                         </Badge>
                       ))}
                     </div>
                   </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs bg-accent/20 text-accent border border-accent/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                   {/* Metrics */}
                   <div className="grid grid-cols-3 gap-2 p-3 bg-secondary/30 rounded-lg">
                     <div className="text-center">
                       <Calendar className="w-4 h-4 mx-auto mb-1 text-primary" />
                       <p className="text-xs text-muted-foreground">{project.metrics?.duration}</p>
                     </div>
                     <div className="text-center">
                       <Users className="w-4 h-4 mx-auto mb-1 text-accent" />
                       <p className="text-xs text-muted-foreground">{project.metrics?.team}</p>
                     </div>
                     <div className="text-center">
                       <TrendingUp className="w-4 h-4 mx-auto mb-1 text-cyan-500" />
                       <p className="text-xs text-muted-foreground">{project.metrics?.impact}</p>
                     </div>
                   </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20"
               style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">
            Work Experience
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card key={index} className="project-card border-2 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {/* Header Section */}
                      <div className="flex items-start gap-4">
                         <div className="flex-shrink-0">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center border-2 border-cyan-500/30">
                             <Briefcase className="h-6 w-6 text-cyan-500" />
                           </div>
                         </div>
                         <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2 text-cyan-500">{exp.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-cyan-500 text-lg">{exp.company}</span>
                                {exp.client && (
                                  <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                                    Client: {exp.client}
                                  </div>
                                )}
                              </div>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {exp.period}
                            </span>
                            {exp.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                       {/* Key Metrics */}
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/20 rounded-lg">
                         <div className="text-center">
                           <Users className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
                           <p className="text-sm font-medium">{exp.keyMetrics.teamSize}</p>
                         </div>
                         <div className="text-center">
                           <Target className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
                           <p className="text-sm font-medium">{exp.keyMetrics.projects}</p>
                         </div>
                         <div className="text-center">
                           <TrendingUp className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
                           <p className="text-sm font-medium">{exp.keyMetrics.impact}</p>
                         </div>
                       </div>

                       {/* Key Achievements */}
                       <div className="space-y-4">
                         <h4 className="text-lg font-semibold flex items-center gap-2">
                           <Star className="w-5 h-5 text-cyan-500" />
                           Key Achievements
                         </h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                           {exp.achievements.map((achievement, idx) => (
                             <Card key={idx} className="bg-gradient-to-br from-card/80 to-card/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                               <CardContent className="p-4">
                                 <h5 className="font-semibold text-cyan-500 mb-2">{achievement.title}</h5>
                                 <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{achievement.description}</p>
                                 <div className="space-y-2">
                                   <div className="flex items-center gap-2">
                                     <TrendingUp className="w-3 h-3 text-accent" />
                                     <span className="text-xs font-medium text-accent">{achievement.impact}</span>
                                   </div>
                                   <div className="flex flex-wrap gap-1">
                                     {achievement.skills.map((skill, skillIdx) => (
                                       <Badge key={skillIdx} variant="outline" className="text-xs border-cyan-500/30 text-cyan-500">
                                         {skill}
                                       </Badge>
                                     ))}
                                   </div>
                                 </div>
                               </CardContent>
                             </Card>
                           ))}
                         </div>
                       </div>

                       {/* Technical Skills */}
                       <div className="space-y-3">
                         <h4 className="text-lg font-semibold flex items-center gap-2">
                           <Code className="w-5 h-5 text-cyan-500" />
                           Technical Skills
                         </h4>
                         <div className="flex flex-wrap gap-2">
                           {exp.skills.map((skill, skillIdx) => (
                             <Badge key={skillIdx} className="bg-cyan-500 text-white border-0 hover:bg-cyan-500/80 transition-colors font-medium">
                               {skill}
                             </Badge>
                           ))}
                         </div>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20"
               style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">
            Education
          </h2>
          <div className="max-w-5xl mx-auto">
            {education.map((edu, index) => (
              <Card key={index} className="project-card border-2 hover:border-accent/30 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border-2 border-accent/30">
                        <GraduationCap className="h-8 w-8 text-accent" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-accent">{edu.degree}</h3>
                        <div className="flex flex-wrap items-center gap-6 mb-4">
                          <span className="text-lg font-semibold text-accent">{edu.institution}</span>
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {edu.period}
                          </span>
                          {edu.gpa && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/30">
                              <Star className="h-4 w-4 text-accent" />
                              <span className="font-semibold text-accent">CGPA: {edu.gpa}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-secondary/30 rounded-lg border border-accent/20">
                        <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg border border-accent/20">
                          <Code className="w-5 h-5 mx-auto mb-2 text-accent" />
                          <p className="text-sm font-medium">Strong Foundation</p>
                          <p className="text-xs text-muted-foreground">Algorithms & Data Structures</p>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                          <Database className="w-5 h-5 mx-auto mb-2 text-primary" />
                          <p className="text-sm font-medium">Core Concepts</p>
                          <p className="text-xs text-muted-foreground">Software Development</p>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 rounded-lg border border-cyan-500/20">
                          <Globe className="w-5 h-5 mx-auto mb-2 text-cyan-500" />
                          <p className="text-sm font-medium">Academic Excellence</p>
                          <p className="text-xs text-muted-foreground">Top 10% Graduate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      


      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Tiyyagura Chandra Reddy. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/tchandrareddy21"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tchandrareddy21/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:tchandrareddy21@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 rounded-full gradient-primary hover:opacity-90 animate-bounce"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={modalState.project}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </div>
  );
};

export default Portfolio;
