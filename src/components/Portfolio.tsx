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
        duration: "6 weeks",
        team: "2 developers",
        impact: "70% processing speed"
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
        duration: "1 month",
        team: "Solo Project",
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
                    icon: Sparkles,
                    title: "Generative AI",
                    description: "LLMs, RAG systems, prompt engineering, and building AI-powered applications",
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
                    <CardTitle className={`text-2xl font-bold flex items-center gap-3 ${
                      categoryIndex % 7 === 0 ? 'text-violet-400' : 
                      categoryIndex % 7 === 1 ? 'text-emerald-400' : 
                      categoryIndex % 7 === 2 ? 'text-cyan-400' :
                      categoryIndex % 7 === 3 ? 'text-rose-400' :
                      categoryIndex % 7 === 4 ? 'text-amber-400' :
                      categoryIndex % 7 === 5 ? 'text-indigo-400' :
                      'text-teal-400'
                    }`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        categoryIndex % 7 === 0 ? 'bg-gradient-to-br from-violet-500 to-violet-600' :
                        categoryIndex % 7 === 1 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                        categoryIndex % 7 === 2 ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' :
                        categoryIndex % 7 === 3 ? 'bg-gradient-to-br from-rose-500 to-rose-600' :
                        categoryIndex % 7 === 4 ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                        categoryIndex % 7 === 5 ? 'bg-gradient-to-br from-indigo-500 to-indigo-600' :
                        'bg-gradient-to-br from-teal-500 to-teal-600'
                      } group-hover:rotate-6 transition-transform duration-300`}>
                        {categoryIndex === 0 ? <Code className="w-5 h-5 text-white" /> :
                         categoryIndex === 1 ? <Database className="w-5 h-5 text-white" /> :
                         categoryIndex === 2 ? <Brain className="w-5 h-5 text-white" /> :
                         categoryIndex === 3 ? <MessageSquare className="w-5 h-5 text-white" /> :
                         categoryIndex === 4 ? <Sparkles className="w-5 h-5 text-white" /> :
                         categoryIndex === 5 ? <Server className="w-5 h-5 text-white" /> :
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
                            skillIndex % 6 === 0 ? 'bg-blue-900/40 text-blue-300 border-blue-500/40 hover:bg-blue-800/60' :
                            skillIndex % 6 === 1 ? 'bg-purple-900/40 text-purple-300 border-purple-500/40 hover:bg-purple-800/60' :
                            skillIndex % 6 === 2 ? 'bg-green-900/40 text-green-300 border-green-500/40 hover:bg-green-800/60' :
                            skillIndex % 6 === 3 ? 'bg-pink-900/40 text-pink-300 border-pink-500/40 hover:bg-pink-800/60' :
                            skillIndex % 6 === 4 ? 'bg-yellow-900/40 text-yellow-300 border-yellow-500/40 hover:bg-yellow-800/60' :
                            'bg-red-900/40 text-red-300 border-red-500/40 hover:bg-red-800/60'
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

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-material-surface via-material-surface-variant to-material-surface opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, hsl(var(--tertiary) / 0.05) 0%, transparent 50%)`
        }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Innovative machine learning solutions and AI-powered applications that demonstrate 
              expertise in data science, natural language processing, and scalable deployments.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <article 
                key={index}
                className="group relative bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Technology Badges */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Image */}
                <div className="px-6 pb-4">
                  <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted group-hover:border-primary/30 transition-colors duration-300">
                    <img
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Key Features & Impact */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {project.keyFeatures.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="text-xs leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        index === 0 ? 'text-emerald-500' : 
                        index === 1 ? 'text-orange-500' : 
                        index === 2 ? 'text-pink-500' : 
                        index === 3 ? 'text-violet-500' : 
                        'text-sky-500'
                      }`}>Impact</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">Duration:</span>
                          <span className="text-xs font-medium">{project.metrics.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">Team:</span>
                          <span className="text-xs font-medium">{project.metrics.team}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">Result:</span>
                          <span className={`text-xs font-bold ${
                            index === 0 ? 'text-emerald-500' : 
                            index === 1 ? 'text-orange-500' : 
                            index === 2 ? 'text-pink-500' : 
                            index === 3 ? 'text-violet-500' : 
                            'text-sky-500'
                          }`}>{project.metrics.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-4 border-t border-border flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <Button
                      onClick={() => openModal(project, 'demo')}
                      className="flex-1 min-w-[120px] bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.hasLearnMore && (
                    <Button
                      onClick={() => openModal(project, 'learnMore')}
                      variant="outline"
                      className="flex-1 min-w-[120px] border-border text-foreground hover:bg-accent hover:text-accent-foreground font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Read Case Study
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* View All Projects CTA */}
          <div className="text-center mt-16">
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary px-8 py-3 font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              asChild
            >
              <a 
                href="https://github.com/tchandrareddy21" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View all projects on GitHub"
              >
                <Github className="w-5 h-5 mr-2" />
                Explore All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/80 backdrop-blur-sm rounded-full border border-blue-500/30 shadow-lg mb-6">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <span className="text-blue-300 font-semibold">Professional Journey</span>
            </div>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Work Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Driving innovation and delivering measurable results through technical leadership and strategic problem-solving
            </p>
          </div>
          
          {/* Experience Cards */}
          <div className="max-w-7xl mx-auto">
            {experiences.map((exp, index) => (
              <div key={index} className="group relative mb-16 last:mb-0">
                {/* Timeline Connector */}
                <div className="absolute left-8 top-16 w-1 h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 origin-top"></div>
                
                {/* Main Card */}
                <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 transform hover:-translate-y-2 overflow-hidden">
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-[2px] rounded-3xl bg-slate-800/95 backdrop-blur-xl"></div>
                  
                  <div className="relative z-10 p-8 lg:p-12">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row items-start gap-8 mb-10">
                      {/* Company Icon */}
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-3 transition-transform duration-500">
                          <Briefcase className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 rounded-2xl blur-lg"></div>
                        
                        {/* Status Indicator */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="mb-4">
                          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                            <span className="text-xl font-bold text-blue-400">{exp.company}</span>
                          </div>
                        </div>
                        
                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-xl border border-blue-500/30">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-300 font-medium">{exp.period}</span>
                          </div>
                          {exp.client && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-900/30 rounded-xl border border-indigo-500/30">
                              <Star className="w-4 h-4 text-indigo-400" />
                              <span className="text-indigo-300 font-medium">Client: {exp.client}</span>
                            </div>
                          )}
                          {exp.location && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-xl border border-purple-500/30">
                              <MapPin className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-300 font-medium">{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Impact Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div className="group/metric bg-blue-900/20 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover/metric:rotate-12 transition-transform duration-300">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-blue-300">Team Leadership</h4>
                            <p className="text-blue-400 font-semibold">{exp.keyMetrics.teamSize}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group/metric bg-indigo-900/20 rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover/metric:rotate-12 transition-transform duration-300">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-indigo-300">Projects Delivered</h4>
                            <p className="text-indigo-400 font-semibold">{exp.keyMetrics.projects}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group/metric bg-purple-900/20 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover/metric:rotate-12 transition-transform duration-300">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-purple-300">Business Impact</h4>
                            <p className="text-purple-400 font-semibold">{exp.keyMetrics.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Key Achievements</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {exp.achievements.map((achievement, idx) => (
                          <div key={idx} className="group/achievement bg-slate-800/60 rounded-2xl p-6 border border-slate-600/50 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-lg">
                            <div className="mb-4">
                              <h5 className="text-xl font-bold text-white mb-2 group-hover/achievement:text-blue-400 transition-colors duration-300">{achievement.title}</h5>
                              <p className="text-gray-300 leading-relaxed mb-4">{achievement.description}</p>
                              
                              <div className="flex items-center gap-2 mb-4 p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-green-300 font-semibold text-sm">{achievement.impact}</span>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {achievement.skills.map((skill, skillIdx) => (
                                  <span key={skillIdx} className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    skillIdx % 3 === 0 ? 'bg-blue-900/40 text-blue-300 border border-blue-500/30' :
                                    skillIdx % 3 === 1 ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-500/30' :
                                    'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                                  }`}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Skills */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Code className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Technical Skills</h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {exp.skills.map((skill, skillIdx) => (
                          <div key={skillIdx} className={`px-4 py-2 rounded-xl font-semibold border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                            skillIdx % 4 === 0 ? 'bg-blue-900/40 text-blue-300 border-blue-500/40 hover:bg-blue-800/60' :
                            skillIdx % 4 === 1 ? 'bg-indigo-900/40 text-indigo-300 border-indigo-500/40 hover:bg-indigo-800/60' :
                            skillIdx % 4 === 2 ? 'bg-purple-900/40 text-purple-300 border-purple-500/40 hover:bg-purple-800/60' :
                            'bg-pink-900/40 text-pink-300 border-pink-500/40 hover:bg-pink-800/60'
                          }`}>
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      <div className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/50 shadow-lg">
                        <p className="text-slate-200 leading-relaxed text-lg">{edu.description}</p>
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
                            'Project Management',
                            'Machine Learning',
                            'Exploratory Data Analysis',
                            'Deep Learning and NLP',
                            'Big Data'
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
