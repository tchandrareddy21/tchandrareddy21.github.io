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
    liveUrl: string;
    githubUrl: string;
    metrics?: {
      duration: string;
      team: string;
      impact: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
  type: 'demo' | 'github';
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
              {type === 'demo' ? 'Live Demo' : 'GitHub Repository'}
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

          <div className="mb-6">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            {project.metrics && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">{project.metrics.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                  <Users className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Team Size</p>
                    <p className="font-medium">{project.metrics.team}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Impact</p>
                    <p className="font-medium">{project.metrics.impact}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h5 className="font-semibold mb-2">Technologies Used</h5>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border border-primary/20">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {type === 'demo' ? (
                <>
                  <Button 
                    onClick={() => openInNewTab(project.liveUrl)}
                    className="gradient-primary hover:opacity-90"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Live Demo
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => openInNewTab(project.githubUrl)}
                    className="bg-background text-foreground border border-border hover:bg-secondary"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Open in New Tab
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectModal;