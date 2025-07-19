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
  ChevronUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MobileNav from './MobileNav';
import profilePhoto from '@/assets/profile-photo.jpg';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isTyping, setIsTyping] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const typingText = "Data Scientist & ML Engineer";

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
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
      description: "Resume download started. Scrolling to contact section...",
    });
    
    // Scroll to contact section
    setTimeout(() => {
      scrollToSection('contact');
    }, 500);
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
    "Programming & Data": [
      { name: "Python", level: 95 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 88 },
      { name: "Matplotlib", level: 85 },
      { name: "Seaborn", level: 82 }
    ],
    "Machine Learning": [
      { name: "Scikit-learn", level: 90 },
      { name: "XGBoost", level: 85 },
      { name: "Random Forest", level: 88 },
      { name: "SVM", level: 80 },
      { name: "K-Means", level: 82 },
      { name: "PCA", level: 78 }
    ],
    "AI & Deep Learning": [
      { name: "BERT/GPT", level: 85 },
      { name: "Langchain", level: 88 },
      { name: "RAG", level: 82 },
      { name: "CNN", level: 80 },
      { name: "Transfer Learning", level: 75 }
    ],
    "MLOps & Cloud": [
      { name: "AWS", level: 90 },
      { name: "Docker", level: 85 },
      { name: "MLflow", level: 80 },
      { name: "SageMaker", level: 85 },
      { name: "GitHub Actions", level: 78 }
    ],
    "APIs & Deployment": [
      { name: "Flask", level: 88 },
      { name: "FastAPI", level: 85 },
      { name: "Streamlit", level: 82 },
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 78 }
    ]
  };

  const projects = [
    {
      title: "APS Failure Classification",
      description: "Engineered predictive analytics using a robust binary classification model focused on essential components of the Air Pressure System, reducing diagnostic time by approximately 25% through enhanced issue identification capabilities.",
      image: project1,
      technologies: ["Machine Learning", "FastAPI", "Docker", "MongoDB", "AWS(EC2, ECR, S3)"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "LLM-Based Document Q&A with RAG",
      description: "Developed an LLM-powered document Q&A system using Retrieval-Augmented Generation (RAG), integrating Groq for querying, OpenAI embeddings for vectorization, and FAISS for fast similarity search.",
      image: project2,
      technologies: ["LangChain", "Groq", "OpenAI", "FAISS", "Streamlit"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Logs Classification",
      description: "Developed a hybrid log classification system integrating Regex, Sentence Transformers with Logistic Regression, and Large Language Models (LLMs) to efficiently handle logs of varying complexity.",
      image: project3,
      technologies: ["FastAPI", "Streamlit", "Machine Learning", "RegEx", "GROQ"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Text2Query Chat",
      description: "Developed a Text-to-SQL chatbot using LangChain, GROQ API, and Streamlit, enabling seamless natural language database queries with 95% accuracy.",
      image: project1,
      technologies: ["Langchain", "GROQ", "Streamlit", "MySQL", "SQLite"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const experiences = [
    {
      title: "Software Engineer (Full-Time)",
      company: "HCLTech",
      period: "Nov 2022 - Present",
      location: "Bengaluru",
      description: [
        "Designed and implemented AEM notification cards to encourage users of non-genuine Adobe applications to transition to legitimate software, enhancing compliance and licensing adherence.",
        "Developed AEM-based promotional discount notifications, increasing conversion rates by 40% and driving revenue growth through effective user engagement strategies.",
        "Conducted A/B testing on AEM notifications, determining the 7-day grace period as the most effective for maximizing user transition and retention.",
        "Built Proofs of Concept (POCs) and web pages using Milo, streamlining migration processes and ensuring seamless project alignment.",
        "Skills: AEM, MILO, A/B Testing, Figma, Jira, AJO, UWP"
      ]
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              Tiyyagura Chandra Reddy
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' }
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
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-50"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 flex justify-center lg:justify-end animate-scale-in order-1 lg:order-2">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-card hover-glow animate-float">
                  <img 
                    src={profilePhoto} 
                    alt="Tiyyagura Chandra Reddy" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-4 rounded-full bg-gradient-primary opacity-20 blur-xl"></div>
                <div className="mt-6 flex justify-center gap-4">
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background/80 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover-glow"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left animate-fade-in-up order-2 lg:order-1">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="gradient-primary bg-clip-text text-transparent">
                  Hello, I'm
                </span>
                <br />
                <span className="text-foreground">Tiyyagura Chandra Reddy</span>
              </h1>
              <div className="text-xl lg:text-2xl mb-8 h-8">
                {isTyping && (
                  <span className="animate-typing overflow-hidden whitespace-nowrap">
                    {typingText}
                  </span>
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Data Scientist / ML Engineer with 2 years of experience as a Software Engineer and a strong foundation in Python, Machine Learning, NLP, Generative AI, and AWS-based deployments. Currently leading a team of 4 and collaborating with cross-functional stakeholders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={handleDownloadResume}
                  size="lg" 
                  className="gradient-primary hover:opacity-90 transition-opacity"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-secondary bg-clip-text text-transparent">
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
                  I am a passionate Data Scientist / ML Engineer with 2 years of experience as a Software Engineer 
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
          <h2 className="text-4xl font-bold text-center mb-16 gradient-primary bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="skill-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {category === 'Programming & Data' && <Code className="h-6 w-6 text-primary" />}
                    {category === 'Machine Learning' && <Database className="h-6 w-6 text-accent" />}
                    {category === 'AI & Deep Learning' && <Globe className="h-6 w-6 text-cyan-glow" />}
                    {category === 'MLOps & Cloud' && <Server className="h-6 w-6 text-primary" />}
                    {category === 'APIs & Deployment' && <Globe className="h-6 w-6 text-accent" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill.name} variant="secondary" className="px-3 py-1">
                        {skill.name}
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
      <section id="projects" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="project-card group">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-primary bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card key={index} className="project-card">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                       <div className="flex-1">
                         <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                         <div className="flex items-center gap-4 mb-3 text-muted-foreground">
                           <span className="font-medium text-primary">{exp.company}</span>
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
                         {Array.isArray(exp.description) ? (
                           <div className="space-y-2">
                             {exp.description.map((item, idx) => (
                               <p key={idx} className="text-muted-foreground">• {item}</p>
                             ))}
                           </div>
                         ) : (
                           <p className="text-muted-foreground">{exp.description}</p>
                         )}
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
      <section id="education" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-secondary bg-clip-text text-transparent">
            Education
          </h2>
          <div className="max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <Card key={index} className="project-card">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                     <div className="flex-1">
                       <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                       <div className="flex items-center gap-4 mb-3 text-muted-foreground">
                         <span className="font-medium text-accent">{edu.institution}</span>
                         <span className="flex items-center gap-1">
                           <Calendar className="h-4 w-4" />
                           {edu.period}
                         </span>
                         {edu.gpa && (
                           <span className="font-medium text-primary">CGPA: {edu.gpa}</span>
                         )}
                       </div>
                       <p className="text-muted-foreground">{edu.description}</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-primary bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="skill-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-cyan-glow/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-cyan-glow" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{cert.date}</span>
                          <span>ID: {cert.credentialId}</span>
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-secondary bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a friendly chat about technology and development.
              </p>
            </div>
            
            {/* Contact Form - Centered */}
            <Card className="project-card">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <Input name="firstName" placeholder="Your first name" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <Input name="lastName" placeholder="Your last name" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input name="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input name="subject" placeholder="What's this about?" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea 
                      name="message"
                      placeholder="Tell me about your project or question..." 
                      rows={6}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full gradient-primary hover:opacity-90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm justify-center">
              © 2024 Tiyyagura Chandra Reddy. All rights reserved.
            </p>
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
    </div>
  );
};

export default Portfolio;
