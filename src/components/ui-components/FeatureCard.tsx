
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  style?: React.CSSProperties;
}

const FeatureCard = ({ title, description, icon: Icon, className, style }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "glass-morphism p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      style={style}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
