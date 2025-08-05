import React from 'react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  name, 
  role, 
  content, 
  rating = 5,
  initials,
  gradientFrom,
  gradientTo
}) => {
  return (
    <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 group">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {initials}
        </div>
        <div className="ml-3">
          <div className="text-white font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {name}
          </div>
          <div className="text-slate-400 text-sm">{role}</div>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed mb-4">
        "{content}"
      </p>
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} className="text-lg">★</span>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
