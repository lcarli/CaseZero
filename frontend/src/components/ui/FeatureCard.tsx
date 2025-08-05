import React from 'react';
import { cn } from '../../utils/cn';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  iconColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  className = '',
  iconColor = 'text-blue-400'
}) => {
  return (
    <div className={cn(
      'bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-opacity-50 transition-all duration-300 group',
      className
    )}>
      <div className={cn('mb-4 group-hover:scale-110 transition-transform duration-300', iconColor)}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
        {title}
      </h3>
      <p className="text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
