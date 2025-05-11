import { useEffect, useState } from 'react';

const VisualSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    
  }, []);
  
  return (
    <div className="flex-1 bg-blue-500 text-white relative overflow-hidden flex flex-col justify-between p-12 md:p-8 w-full">
      <div 
        className="absolute top-0 left-0 w-full h-[120%] bg-cover bg-center opacity-20 z-0"
        style={{ 
          backgroundImage: `url('https://images.pexels.com/photos/7563687/pexels-photo-7563687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          transform: `translateY(${scrollPosition * 0.4}px)`
        }}
      ></div>
      
      <div className="relative z-10 h-full flex flex-col justify-between w-full">
        <div className="font-bold text-2xl tracking-tight">
          <span>Carloo</span>
        </div>
        
        <div className="mt-20 md:mt-8">
          <h1 className="text-5xl md:text-3xl font-bold leading-tight mb-4 tracking-tight">
            Join our community
          </h1>
          <p className="text-center leading-relaxed opacity-90 w-full">
            Create an account to get started with our services and unlock premium Car Renting.
          </p>
        </div>
        
        
      </div>
    </div>
  );
};

export default VisualSection;