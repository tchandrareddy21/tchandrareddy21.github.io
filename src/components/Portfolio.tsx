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
        duration: "3 months",
        team: "Solo Project",
        impact: "25% faster diagnosis"
      },
      keyFeatures: ["Real-time prediction", "AWS deployment", "90% accuracy"]
    },
    {
      title: "Financial Product Complaint Analysis",
      description: "Built a machine learning system to classify and predict customer complaints for financial products, enabling quick identification of problematic complaints and helping companies take proactive action to resolve customer issues.",
      image: FinancialProductComplaintAnalysis,
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
      image: RAG,
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
      image: LogsClassification,
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
      image: Text2QueryChat,
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
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Data Scientist / AI/ML Engineer with 3+ years of experience as a Software Engineer and a strong foundation in Python, Machine Learning, NLP, Generative AI, and AWS-based deployments. Currently leading a team of 4 and collaborating with cross-functional stakeholders.
              </p>
              <div className="flex justify-center lg:justify-start gap-4 mb-6">
                <a
                  href="https://github.com/tchandrareddy21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tchandrareddy21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:tchandrareddy21@gmail.com"
                  className="p-3 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
                <Button 
                  size="lg" 
                  className="gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  onClick={handleDownloadResume}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-border hover:bg-background/80 transition-all hover:scale-105"
                  onClick={() => scrollToSection('about')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4 animate-fade-in">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Passionate about transforming data into actionable insights and building intelligent solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-scale-in"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Main Content */}
              <div className="space-y-8 animate-fade-in-up">
                <Card className="group relative overflow-hidden border-0 bg-gray-900/90 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                      My Journey
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      As a Data Scientist and AI/ML Engineer with over 3+ years of software engineering experience, I specialize in developing end-to-end machine learning solutions that drive business value. Currently leading a team of 4 at HCLTech, working with Adobe to create innovative solutions that enhance user engagement and drive conversion rates.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      My expertise spans the entire ML pipeline - from data preprocessing and feature engineering to model deployment and monitoring. I'm passionate about leveraging cutting-edge technologies like LangChain, RAG systems, and Generative AI to solve complex business problems.
                    </p>
                  </CardContent>
                </Card>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="group relative overflow-hidden border-0 bg-gray-900/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:rotate-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-6 text-center relative z-10">
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">3+</div>
                      <p className="text-sm text-gray-400 font-medium">Years Experience</p>
                    </CardContent>
                  </Card>
                  <Card className="group relative overflow-hidden border-0 bg-gray-900/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:-rotate-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-6 text-center relative z-10">
                      <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">15+</div>
                      <p className="text-sm text-gray-400 font-medium">Projects Completed</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Focus Areas */}
              <div className="space-y-6 animate-fade-in-up delay-300">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-8">
                  Focus Areas
                </h3>
                
                {[
                  {
                    icon: Brain,
                    title: "Machine Learning & AI",
                    description: "Building predictive models, implementing deep learning solutions, and deploying ML pipelines",
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    icon: MessageSquare,
                    title: "Natural Language Processing",
                    description: "Working with transformers, BERT, GPT models, and developing conversational AI systems",
                    color: "from-pink-500 to-pink-600"
                  },
                  {
                    icon: Database,
                    title: "Data Engineering",
                    description: "ETL processes, data warehousing, and building scalable data infrastructure",
                    color: "from-orange-500 to-orange-600"
                  },
                  {
                    icon: Globe,
                    title: "MLOps & Cloud",
                    description: "AWS deployment, containerization with Docker, and CI/CD for ML models",
                    color: "from-red-500 to-red-600"
                  }
                ].map((area, index) => (
                  <Card key={index} className="group relative overflow-hidden border-0 bg-gray-900/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300`}>
                          <area.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-200 mb-2">{area.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{area.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 animate-fade-in">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              A comprehensive toolkit for building intelligent data-driven solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full animate-scale-in"></div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                <Card key={category} className="group relative overflow-hidden border-0 bg-gray-900/90 backdrop-blur-xl shadow-2xl hover:shadow-orange-500/40 transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        categoryIndex % 4 === 0 ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                        categoryIndex % 4 === 1 ? 'bg-gradient-to-br from-red-500 to-red-600' :
                        categoryIndex % 4 === 2 ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                        'bg-gradient-to-br from-purple-500 to-purple-600'
                      } group-hover:rotate-6 transition-transform duration-300`}>
                        {categoryIndex % 4 === 0 ? <Code className="w-5 h-5 text-white" /> :
                         categoryIndex % 4 === 1 ? <Database className="w-5 h-5 text-white" /> :
                         categoryIndex % 4 === 2 ? <Server className="w-5 h-5 text-white" /> :
                         <Globe className="w-5 h-5 text-white" />}
                      </div>
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-3">
                      {skillList.map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className={`group/skill px-4 py-2 rounded-2xl text-sm font-bold border transition-all duration-300 hover:scale-105 ${
                            skillIndex % 4 === 0 ? 'bg-orange-100/10 border-orange-600 text-orange-300 hover:bg-orange-100/20' :
                            skillIndex % 4 === 1 ? 'bg-red-100/10 border-red-600 text-red-300 hover:bg-red-100/20' :
                            skillIndex % 4 === 2 ? 'bg-pink-100/10 border-pink-600 text-pink-300 hover:bg-pink-100/20' :
                            'bg-purple-100/10 border-purple-600 text-purple-300 hover:bg-purple-100/20'
                          }`}
                        >
                          <span className="group-hover/skill:font-bold transition-all duration-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent mb-4 animate-fade-in">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Innovative solutions leveraging machine learning, AI, and modern technologies
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 mx-auto rounded-full animate-scale-in"></div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={project.title} className="group relative overflow-hidden border-0 bg-gray-900/90 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-fuchsia-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          onClick={() => openModal(project, 'demo')}
                          className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group/demo"
                        >
                          <Play className="h-4 w-4 group-hover/demo:scale-110 transition-transform duration-300" />
                        </Button>
                      )}
                      {project.hasLearnMore && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openModal(project, 'learnMore')}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm group/learn"
                        >
                          <Eye className="h-4 w-4 group-hover/learn:scale-110 transition-transform duration-300" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6 relative z-10 space-y-4">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:from-fuchsia-600 group-hover:to-pink-600 transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <div
                          key={tech}
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            techIndex % 3 === 0 ? 'bg-purple-900/30 border-purple-600 text-purple-300' :
                            techIndex % 3 === 1 ? 'bg-fuchsia-900/30 border-fuchsia-600 text-fuchsia-300' :
                            'bg-pink-900/30 border-pink-600 text-pink-300'
                          }`}
                        >
                          {tech}
                        </div>
                      ))}
                      {project.technologies.length > 3 && (
                        <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-700/50 border border-gray-600 text-gray-300">
                          +{project.technologies.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                      <div className="text-center">
                        <p className="text-xs font-medium text-purple-300">{project.metrics?.duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-fuchsia-300">{project.metrics?.team}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-pink-300">{project.metrics?.impact}</p>
                      </div>
                    </div>

                    {/* GitHub CTA */}
                    <div className="pt-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white rounded-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group/github transform hover:scale-105"
                      >
                        <Github className="h-6 w-6 group-hover/github:scale-110 transition-transform duration-300" />
                        <span className="text-lg font-bold">GitHub</span>
                        <ExternalLink className="h-4 w-4 opacity-70 group-hover/github:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-4 animate-fade-in">
              Work Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              My professional journey in software engineering and leadership
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full animate-scale-in"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {experiences.map((exp, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-gray-900/90 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 transform hover:-translate-y-3">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-10 relative z-10">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Icon & Visual Elements */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-6 transition-transform duration-500">
                        <Briefcase className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-70"></div>
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      {/* Header */}
                      <div className="space-y-4">
                        <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                          {exp.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
                            <span className="text-2xl font-bold text-cyan-400">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 rounded-2xl border border-emerald-700">
                            <Calendar className="h-5 w-5 text-emerald-400" />
                            <span className="font-bold text-emerald-300">{exp.period}</span>
                          </div>
                          {exp.client && (
                            <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-pink-100 to-rose-50 dark:from-pink-900/30 dark:to-rose-800/20 rounded-2xl border-2 border-pink-300 dark:border-pink-600 shadow-lg">
                              <Star className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                              <span className="font-bold text-lg text-pink-700 dark:text-pink-300">Client: {exp.client}</span>
                            </div>
                          )}
                          {exp.location && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-900/30 to-teal-800/20 rounded-2xl border border-teal-700">
                              <MapPin className="h-5 w-5 text-teal-400" />
                              <span className="font-bold text-teal-300">{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="group/highlight text-center p-6 bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20 rounded-2xl border-2 border-cyan-200 dark:border-cyan-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/highlight:rotate-12 transition-transform duration-300">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-bold text-cyan-700 dark:text-cyan-300 text-lg mb-2">Team Leadership</h4>
                          <p className="text-sm text-cyan-600 dark:text-cyan-400">{exp.keyMetrics.teamSize}</p>
                        </div>
                        
                        <div className="group/highlight text-center p-6 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl border-2 border-emerald-200 dark:border-emerald-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/highlight:rotate-12 transition-transform duration-300">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-lg mb-2">Projects Delivered</h4>
                          <p className="text-sm text-emerald-600 dark:text-emerald-400">{exp.keyMetrics.projects}</p>
                        </div>
                        
                        <div className="group/highlight text-center p-6 bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20 rounded-2xl border-2 border-teal-200 dark:border-teal-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/highlight:rotate-12 transition-transform duration-300">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-bold text-teal-700 dark:text-teal-300 text-lg mb-2">Business Impact</h4>
                          <p className="text-sm text-teal-600 dark:text-teal-400">{exp.keyMetrics.impact}</p>
                        </div>
                      </div>

                      {/* Key Achievements */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold flex items-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Key Achievements</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                          {exp.achievements.map((achievement, idx) => (
                            <Card key={idx} className="group/achievement relative overflow-hidden border-0 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-teal-500/10 opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-500"></div>
                              <CardContent className="p-4 sm:p-6 relative z-10">
                                <h5 className="font-bold text-base sm:text-lg text-cyan-400 mb-3">{achievement.title}</h5>
                                <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">{achievement.description}</p>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm font-bold text-emerald-300">{achievement.impact}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {achievement.skills.map((skill, skillIdx) => (
                                      <div key={skillIdx} className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${
                                        skillIdx % 3 === 0 ? 'bg-cyan-900/30 border-cyan-600 text-cyan-300' :
                                        skillIdx % 3 === 1 ? 'bg-emerald-900/30 border-emerald-600 text-emerald-300' :
                                        'bg-teal-900/30 border-teal-600 text-teal-300'
                                      }`}>
                                        {skill}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Technical Skills */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold flex items-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <Code className="w-4 h-4 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Technical Skills</span>
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {exp.skills.map((skill, skillIdx) => (
                            <div key={skillIdx} className={`px-4 py-2 rounded-2xl text-sm font-bold border transition-all duration-300 hover:scale-105 ${
                              skillIdx % 3 === 0 ? 'bg-cyan-100/10 border-cyan-600 text-cyan-300 hover:bg-cyan-100/20' :
                              skillIdx % 3 === 1 ? 'bg-emerald-100/10 border-emerald-600 text-emerald-300 hover:bg-emerald-100/20' :
                              'bg-teal-100/10 border-teal-600 text-teal-300 hover:bg-teal-100/20'
                            }`}>
                              {skill}
                            </div>
                          ))}
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

      {/* Education Section */}
      <section id="education" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 animate-fade-in">
              Education
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              My academic journey and foundation in Computer Science & Engineering
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full animate-scale-in"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {education.map((edu, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-gray-900/90 backdrop-blur-xl shadow-2xl hover:shadow-teal-500/40 transition-all duration-500 transform hover:-translate-y-3">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-10 relative z-10">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Icon & Visual Elements */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-6 transition-transform duration-500">
                        <GraduationCap className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-70"></div>
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      {/* Header */}
                      <div className="space-y-4">
                        <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                          {edu.degree}
                        </h3>
                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                            <span className="text-2xl font-bold text-teal-400">{edu.institution}</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 rounded-2xl border border-cyan-700">
                            <Calendar className="h-5 w-5 text-cyan-400" />
                            <span className="font-bold text-cyan-300">{edu.period}</span>
                          </div>
                          {edu.gpa && (
                            <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-100 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-800/20 rounded-2xl border-2 border-amber-300 dark:border-amber-600 shadow-lg">
                              <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                              <span className="font-bold text-lg text-amber-700 dark:text-amber-300">CGPA: {edu.gpa}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                        <p className="text-gray-300 leading-relaxed text-lg">{edu.description}</p>
                      </div>

                      {/* Achievement Highlights */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="group/highlight text-center p-6 bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/30 dark:to-teal-800/20 rounded-2xl border-2 border-teal-200 dark:border-teal-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/highlight:rotate-12 transition-transform duration-300">
                            <Code className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-bold text-teal-700 dark:text-teal-300 text-lg mb-2">Strong Foundation</h4>
                          <p className="text-sm text-teal-600 dark:text-teal-400">Algorithms & Data Structures</p>
                        </div>
                        
                        <div className="group/highlight text-center p-6 bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-800/20 rounded-2xl border-2 border-cyan-200 dark:border-cyan-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/highlight:rotate-12 transition-transform duration-300">
                            <Database className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-bold text-cyan-700 dark:text-cyan-300 text-lg mb-2">Technical Skills</h4>
                          <p className="text-sm text-cyan-600 dark:text-cyan-400">Software Development</p>
                        </div>
                        
                        <div className="group/highlight text-center p-6 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl border-2 border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/highlight:rotate-12 transition-transform duration-300">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-bold text-blue-700 dark:text-blue-300 text-lg mb-2">Academic Excellence</h4>
                          <p className="text-sm text-blue-600 dark:text-blue-400">Top Performance</p>
                        </div>
                      </div>

                      {/* Key Subjects/Achievements */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold flex items-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Key Focus Areas</span>
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {[
                            'Computer Science Fundamentals',
                            'Software Engineering',
                            'Data Structures & Algorithms',
                            'Database Systems',
                            'Web Development',
                            'Project Management'
                          ].map((subject, idx) => (
                            <div key={idx} className={`px-4 py-2 rounded-2xl text-sm font-bold border transition-all duration-300 hover:scale-105 cursor-default ${
                              idx % 3 === 0 ? 'bg-teal-100/10 border-teal-600 text-teal-300 hover:bg-teal-100/20' :
                              idx % 3 === 1 ? 'bg-cyan-100/10 border-cyan-600 text-cyan-300 hover:bg-cyan-100/20' :
                              'bg-blue-100/10 border-blue-600 text-blue-300 hover:bg-blue-100/20'
                            }`}>
                              {subject}
                            </div>
                          ))}
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
