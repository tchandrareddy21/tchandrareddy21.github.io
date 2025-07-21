import React from 'react';
import { X, ExternalLink, Github, Star, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    metrics?: {
      duration: string;
      team: string;
      impact: string;
    };
    keyFeatures?: string[];
    fullDescription?: string;
    techStack?: string[];
    observations?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  type: 'learn-more' | 'github';
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 relative animate-scale-in">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              {type === 'learn-more' ? 'Project Details' : 'GitHub Repository'}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">
                {type === 'learn-more' ? project.fullDescription || project.description : project.description}
              </p>
            </div>

            {project.metrics && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{project.metrics.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{project.metrics.team}</div>
                  <div className="text-sm text-muted-foreground">Team Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{project.metrics.impact}</div>
                  <div className="text-sm text-muted-foreground">Impact</div>
                </div>
              </div>
            )}

            {type === 'learn-more' && project.keyFeatures && (
              <div>
                <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold mb-3">
                {type === 'learn-more' ? 'Technology Stack' : 'Technologies Used'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(type === 'learn-more' ? project.techStack || project.technologies : project.technologies).map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {type === 'learn-more' && project.observations && (
              <div>
                <h4 className="text-lg font-semibold mb-3">Key Observations</h4>
                <ul className="space-y-2">
                  {project.observations.map((observation, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{observation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => openInNewTab(project.githubUrl)}
                variant="outline"
                className="flex-1"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
              <Button 
                onClick={() => openInNewTab(project.githubUrl)}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectModal;