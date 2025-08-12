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
import APSFailureClassification from '@/assets/APS Failure Classification.jpeg';
import FinancialProductComplaintAnalysis from '@/assets/Financial Product Complaint Analysis.jpeg';
import RAG from '@/assets/RAG.jpeg';
import LogsClassification from '@/assets/Logs Classification.jpeg';
import Text2QueryChat from '@/assets/Text2Query Chat.jpeg'

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

  const fullText = "Data Scientist & AI/ML Engineer";

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
    "Programming & Data Handling": [
      "Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"
    ],
    "Databases": [
      "MySQL", "MongoDB"
    ],
    "Machine Learning": [
      "Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "XGBoost", "SVM", "K-Means", "PCA", "DBSCAN"
    ],
    "Deep Learning & Natural Language Processing (NLP)": [
      "Artificial Neural Networks (ANN)", "Convolutional Neural Networks (CNN)", "Transfer Learning", "BERT", "GPT", "Transformers", "Tokenization", "Embeddings"
    ],
    "Generative AI": [
      "LangChain", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "AI Agents", "Vector Databases"
    ],
    "MLOps & Cloud": [
      "GitHub Actions", "Docker", "AWS SageMaker", "AWS Bedrock", "AWS S3", "AWS EC2", "AWS ECR", "MLflow"
    ],
    "APIs & Deployment": [
      "Flask", "FastAPI", "Streamlit", "Postman", "AWS Elastic Beanstalk", "AWS Lambda"
    ]
  };

  const projects = [
    {
      title: "APS Failure Classification",
      description: "Engineered predictive analytics using a robust binary classification model focused on essential components of the Air Pressure System, reducing diagnostic time by approximately 25% through enhanced issue identification capabilities.",
      image: APSFailureClassification,
      technologies: ["Machine Learning", "FastAPI", "Docker", "MongoDB", "AWS(EC2, ECR, S3)"],
      liveUrl: "https://aps-failure-classification.streamlit.app",
      githubUrl: "https://github.com/tchandrareddy21/aps-failure-classification",
      metrics: {
        impact: "25% faster diagnosis"
      },
      keyFeatures: ["Real-time prediction", "AWS deployment", "90% accuracy"],
      hasLearnMore: true
    },
    {
      title: "Financial Product Complaint Analysis",
      description: "Built a machine learning system to classify and predict customer complaints for financial products, enabling quick identification of problematic complaints and helping companies take proactive action to resolve customer issues.",
      image: FinancialProductComplaintAnalysis,
      technologies: ["Python", "Machine Learning", "Docker", "CircleCI", "Apache Airflow"],
      githubUrl: "https://github.com/tchandrareddy21/financial-product-complaint",
      metrics: {
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
      image: RAG,
      technologies: ["LangChain", "Groq", "OpenAI", "FAISS", "Streamlit"],
      liveUrl: "https://llm-rag-qna.streamlit.app",
      githubUrl: "https://github.com/tchandrareddy21/llm-rag-qna",
      metrics: {
        impact: "95% query accuracy"
      },
      keyFeatures: ["Multi-document support", "Real-time Q&A", "Vector search"],
      hasLearnMore: true
    },
    {
      title: "Logs Classification",
      description: "Developed a hybrid log classification system integrating Regex, Sentence Transformers with Logistic Regression, and Large Language Models (LLMs) to efficiently handle logs of varying complexity.",
      image: LogsClassification,
      technologies: ["FastAPI", "Streamlit", "Machine Learning", "RegEx", "GROQ"],
      liveUrl: "https://logs-classification.streamlit.app",
      githubUrl: "https://github.com/tchandrareddy21/logs-classification",
      metrics: {
        impact: "70% faster processing speed"
      },
      keyFeatures: ["Hybrid approach", "Multi-model pipeline", "High precision"],
      hasLearnMore: true
    },
    {
      title: "Text2Query Chat",
      description: "Developed a Text-to-SQL chatbot using LangChain, GROQ API, and Streamlit, enabling seamless natural language database queries with 95% accuracy.",
      image: Text2QueryChat,
      technologies: ["Langchain", "GROQ", "Streamlit", "MySQL", "SQLite"],
      liveUrl: "https://text2query-chat.streamlit.app",
      githubUrl: "https://github.com/tchandrareddy21/text2query-chat",
      metrics: {
        impact: "95% query accuracy"
      },
      keyFeatures: ["Natural language queries", "Multi-database support", "Chat interface"],
      hasLearnMore: true
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
      description: "Graduated with 8.95 CGPA. Specialized in Computer Science and Engineering with strong foundation in algorithms, data structures, and software development.",
      keyFocusAreas: ["Machine Learning", "Python", "SQL", "Linux", "NLP", "Big Data"]
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
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-teal-500/10 text-foreground">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 material-surface-variant backdrop-blur-xl border-b border-border material-elevation-2">
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
                  className={`nav-link material-ripple ${activeSection === item.id ? 'active' : ''}`}
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
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-orange-500/5 to-yellow-500/5"></div>
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Desktop Profile Image - Right Side */}
            <div className="hidden lg:flex flex-1 justify-end animate-scale-in order-2">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gradient-primary/50 material-elevation-3 animate-float relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 rounded-full"></div>
                  <img 
                    src={profilePhoto} 
                    alt="Tiyyagura Chandra Reddy" 
                    className="w-full h-full object-cover relative z-10"
                  />
                </div>
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-teal-500/30 blur-xl animate-pulse"></div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left animate-fade-in-up order-1">
              <div className="mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full text-sm font-medium border border-purple-500/30 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Welcome to my portfolio
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">
                  Hello, I'm
                </span>
                <br />
                <span className="text-foreground">Tiyyagura Chandra Reddy</span>
              </h1>
              <div className="text-xl lg:text-2xl mb-8 h-8">
                <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
              
              {/* Mobile/Tablet Profile Image - After Designation */}
              <div className="lg:hidden flex justify-center mb-8 animate-scale-in">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-gradient-primary/50 material-elevation-3 animate-float relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 rounded-full"></div>
                    <img 
                      src={profilePhoto} 
                      alt="Tiyyagura Chandra Reddy" 
                      className="w-full h-full object-cover relative z-10"
                    />
                  </div>
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-teal-500/30 blur-xl animate-pulse"></div>
                </div>
              </div>
              
              <p className="text-lg text-foreground mb-8 max-w-2xl leading-relaxed">
                Data Scientist / AI/ML Engineer with 3+ years of experience as a Software Engineer and a strong foundation in Python, Machine Learning, NLP, Generative AI, and AWS-based deployments. Currently leading a team of 4 and collaborating with cross-functional stakeholders.
              </p>
              <div className="flex justify-center lg:justify-start gap-4 mb-6">
                <a
                  href="https://www.linkedin.com/in/tchandrareddy21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect
                </a>
                <Button
                  onClick={handleDownloadResume}
                  variant="outline"
                  className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="w-5 h-5" />
                  Resume
                </Button>
              </div>
              <div className="flex justify-center lg:justify-start gap-6">
                <a
                  href="https://github.com/tchandrareddy21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="mailto:tchandrareddy21@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href="tel:+919441239633"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm passionate about leveraging data and AI to solve complex problems and drive meaningful innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                As a Data Scientist and AI/ML Engineer with a strong foundation in Computer Science, I bring 3+ years of software engineering experience to the world of artificial intelligence and machine learning.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Currently leading a team of 4 at HCLTech, I specialize in developing end-to-end ML solutions, from data preprocessing and model development to deployment on cloud platforms like AWS. My expertise spans across traditional machine learning, deep learning, NLP, and the latest in Generative AI technologies.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                I'm passionate about creating scalable AI systems that solve real-world problems and drive business value. Whether it's building predictive models, implementing RAG systems, or designing automated ML pipelines, I focus on delivering robust, production-ready solutions.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">AI/ML Models Deployed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Team Members Led</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 rounded-lg overflow-hidden border border-border material-elevation-2">
                <img 
                  src={profilePhoto} 
                  alt="Tiyyagura Chandra Reddy working" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">Technical Skills</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive expertise across the full data science and AI/ML technology stack
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card key={index} className="skill-card">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    {category === "Programming & Data Handling" && <Code className="w-5 h-5" />}
                    {category === "Databases" && <Database className="w-5 h-5" />}
                    {category === "Machine Learning" && <Brain className="w-5 h-5" />}
                    {category === "Deep Learning & Natural Language Processing (NLP)" && <MessageSquare className="w-5 h-5" />}
                    {category === "Generative AI" && <Sparkles className="w-5 h-5" />}
                    {category === "MLOps & Cloud" && <Server className="w-5 h-5" />}
                    {category === "APIs & Deployment" && <Globe className="w-5 h-5" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              End-to-end AI/ML solutions showcasing expertise in data science, machine learning, and cloud deployment
            </p>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="project-card group cursor-pointer overflow-hidden h-full">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <CardTitle className="text-xl mb-3 text-primary">{project.title}</CardTitle>
                  <CardDescription className="text-foreground mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </CardDescription>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Measurable Outcomes:</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      {project.metrics.impact}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    {project.liveUrl && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={() => openModal(project, 'demo')}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openModal(project, 'github')}
                      className="flex-1"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => openModal(project, 'learnMore')}
                      className="flex-1"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'hsl(var(--work-primary))' }}>Work Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional journey and key achievements in my career
            </p>
          </div>
          
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={index} className="relative">
                {/* Timeline */}
                <div className="absolute left-8 top-0 h-full w-px" style={{ backgroundColor: 'hsl(var(--work-border))' }}></div>
                <div className="absolute left-6 top-8 w-6 h-6 rounded-full border-4 border-background z-10 flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--work-primary))' }}>
                  <Briefcase className="w-4 h-4" style={{ color: 'hsl(var(--work-foreground))' }} />
                </div>
                
                {/* Content */}
                <div className="ml-20">
                  <Card className="p-6 material-card" style={{ borderColor: 'hsl(var(--work-border) / 0.3)' }}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1" style={{ color: 'hsl(var(--work-primary))' }}>{experience.title}</h3>
                        <p className="text-lg text-foreground mb-1">{experience.company}</p>
                        {experience.client && (
                          <p className="text-sm text-muted-foreground mb-1">Client: {experience.client}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{experience.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium" style={{ color: 'hsl(var(--work-primary))' }}>{experience.period}</p>
                      </div>
                    </div>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-lg" style={{ background: 'hsl(var(--work-container) / 0.2)' }}>
                      <div className="text-center">
                        <p className="text-2xl font-bold" style={{ color: 'hsl(var(--work-primary))' }}>{experience.keyMetrics.teamSize}</p>
                        <p className="text-xs text-muted-foreground">Team Leadership</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold" style={{ color: 'hsl(var(--work-primary))' }}>{experience.keyMetrics.projects}</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold" style={{ color: 'hsl(var(--work-primary))' }}>{experience.keyMetrics.impact}</p>
                        <p className="text-xs text-muted-foreground">Business Impact</p>
                      </div>
                    </div>
                    
                    {/* Achievements */}
                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold text-foreground">Key Achievements:</h4>
                      {experience.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="border-l-4 pl-4" style={{ borderColor: 'hsl(var(--work-primary))' }}>
                          <h5 className="font-medium text-foreground mb-1">{achievement.title}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-green-600">{achievement.impact}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {achievement.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs" style={{ borderColor: 'hsl(var(--work-border))', color: 'hsl(var(--work-primary))' }}>
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Skills */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Technologies & Tools:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} className="text-xs" style={{ backgroundColor: 'hsl(var(--work-container))', color: 'hsl(var(--work-foreground))' }}>
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">Education</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Academic foundation and specialized learning in computer science and engineering
            </p>
          </div>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative">
                {/* Timeline */}
                <div className="absolute left-8 top-0 h-full w-px bg-border"></div>
                <div className="absolute left-6 top-8 w-6 h-6 bg-primary rounded-full border-4 border-background z-10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <div className="ml-20">
                  <Card className="p-6 material-card">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-primary mb-2">{edu.degree}</CardTitle>
                        <p className="text-lg font-medium text-foreground mb-1">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.period}</p>
                      </div>
                    </div>
                    <CardDescription className="text-foreground mb-4">
                      {edu.description}
                    </CardDescription>
                    
                    {/* Key Focus Areas */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground mb-3">Key Focus Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.keyFocusAreas.map((area, areaIndex) => (
                          <Badge key={areaIndex} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="outline" className="text-primary border-primary">
                        GPA: {edu.gpa}
                      </Badge>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and continuous learning achievements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="material-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                      <p className="text-sm font-medium text-primary">{cert.date}</p>
                      <p className="text-xs text-muted-foreground mt-2">ID: {cert.credentialId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-primary">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's discuss opportunities in data science, AI/ML, or collaboration on innovative projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href="mailto:tchandrareddy21@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        tchandrareddy21@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href="tel:+919441239633" className="text-muted-foreground hover:text-primary transition-colors">
                        +91 9441239633
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-muted-foreground">Bengaluru, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">Connect With Me</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/tchandrareddy21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/tchandrareddy21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <Card className="material-card">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg z-40"
          size="icon"
        >
          <ChevronUp className="w-6 h-6" />
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