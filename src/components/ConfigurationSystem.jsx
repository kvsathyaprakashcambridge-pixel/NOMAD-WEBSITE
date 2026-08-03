import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion, AnimatePresence } from 'framer-motion';
import dailyModeImage from '../assets/daily-mode replace.webp';
import creatorModeImage from '../assets/mode-creator.webp';
import escapeModeImage from '../assets/mode-escape.webp';

const MODES = [
  {
    num: "01",
    title: "DAILY MODE",
    capacity: "24 L / EVERYDAY CONFIGURATION",
    desc: "Organised for a laptop, notebooks, chargers, a water bottle and everyday essentials.",
    labels: [],
    image: dailyModeImage,
    alt: "Closed NOMAD X1 backpack in compact Daily Mode with laptop and water bottle."
  },
  {
    num: "02",
    title: "CREATOR MODE",
    capacity: "24 L / MODULAR CONFIGURATION",
    desc: "Reconfigured for a tablet, camera equipment, cables, headphones and creative tools.",
    labels: [],
    image: escapeModeImage,
    alt: "Open NOMAD X1 Creator Mode backpack organised with camera equipment, tablet, cables and headphones."
  },
  {
    num: "03",
    title: "ESCAPE MODE",
    capacity: "32 L / EXPANDED CONFIGURATION",
    desc: "Expanded for clothing, technology and everything required for a short journey.",
    labels: [],
    image: creatorModeImage,
    alt: "Open NOMAD X1 Escape Mode backpack packed with clothing and travel organisers."
  }
];

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth < 768) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    
    const handler = () => {
      if (mobileQuery.matches) setBreakpoint('mobile');
      else if (tabletQuery.matches) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };
    
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', handler);
      tabletQuery.addEventListener('change', handler);
    } else {
      mobileQuery.addListener(handler);
      tabletQuery.addListener(handler);
    }
    
    return () => {
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener('change', handler);
        tabletQuery.removeEventListener('change', handler);
      } else {
        mobileQuery.removeListener(handler);
        tabletQuery.removeListener(handler);
      }
    };
  }, []);

  return breakpoint;
}

export default function ConfigurationSystem() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const shouldReduceMotion = useReducedMotion();
  const [activeMode, setActiveMode] = useState(0);

  if (isMobile) {
    return <MobileConfigurationSystem modes={MODES} activeMode={activeMode} setActiveMode={setActiveMode} shouldReduceMotion={shouldReduceMotion} />;
  }
  
  return <DesktopConfigurationSystem 
            modes={MODES} 
            activeMode={activeMode} 
            setActiveMode={setActiveMode}
            isTablet={isTablet} 
            shouldReduceMotion={shouldReduceMotion} 
         />;
}

function DesktopConfigurationSystem({ modes, activeMode, setActiveMode, isTablet, shouldReduceMotion }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newMode = 0;
    if (latest >= 0.33 && latest < 0.66) newMode = 1;
    else if (latest >= 0.66) newMode = 2;
    
    setActiveMode(prev => {
      if (prev !== newMode) return newMode;
      return prev;
    });
  });
  const vhAmount = isTablet ? "270vh" : "300vh";
  const progressHeight = activeMode === 0 ? "0%" : activeMode === 1 ? "50%" : "100%";

  return (
    <section ref={sectionRef} className="config-system-wrapper" style={{ height: vhAmount, position: 'relative' }}>
      <div className="config-sticky-container">
        <div className="container config-container">
          
          <div className="config-bg-number" aria-hidden="true">
             <motion.span
                key={activeMode}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                animate={{ opacity: 0.04, scale: 1 }}
                transition={{ duration: 0.45 }}
             >
                {modes[activeMode].num}
             </motion.span>
          </div>

          <div className="config-left-col">
            <div className="config-left-content">
              <p className="eyebrow">NOMAD <span className="x1-normal">X1</span> / CONFIGURATION SYSTEM</p>
              <h2>ONE SYSTEM. THREE MODES.</h2>
              <p className="lede light-copy">NOMAD X1 adapts its organisation and capacity around what the day requires.</p>
              
              <div className="config-modes-list">
              <div className="config-modes-layout">
                <div className="config-selector-list">
                  <div className="config-progress-track">
                    <div className="config-progress-fill" style={{ height: progressHeight, transition: 'height 0.4s ease' }} />
                    <div className={`config-progress-dot ${activeMode >= 0 ? 'active' : ''}`} style={{ top: '0%' }} />
                    <div className={`config-progress-dot ${activeMode >= 1 ? 'active' : ''}`} style={{ top: '50%' }} />
                    <div className={`config-progress-dot ${activeMode >= 2 ? 'active' : ''}`} style={{ top: '100%' }} />
                  </div>
                  {modes.map((mode, idx) => {
                    const isActive = idx === activeMode;
                    return (
                      <div key={mode.num} className={`config-mode-header ${isActive ? 'active' : 'inactive'}`}>
                        <span className="config-mode-num">{mode.num}</span>
                        <h3>{mode.title}</h3>
                      </div>
                    );
                  })}
                </div>

                <div className="config-active-panel">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMode}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: shouldReduceMotion ? 0 : -6,
                        transition: { duration: 0.16 }
                      }}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
                    >
                      <span className="config-mode-capacity">{modes[activeMode].capacity}</span>
                      <p className="config-mode-desc">{modes[activeMode].desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="config-right-col">
              <div className="config-bag-container">
                <BagVisual 
                   activeMode={activeMode} 
                   shouldReduceMotion={shouldReduceMotion} 
                   isTablet={isTablet} 
                   labels={modes[activeMode].labels}
                   image={modes[activeMode].image}
                   alt={modes[activeMode].alt}
                />
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BagVisual({ activeMode, shouldReduceMotion, isTablet, labels, image, alt }) {
  let scale = 1, y = 0;
  if (activeMode === 0) { scale = 0.96; y = 6; }
  else if (activeMode === 1) { scale = 1; y = 0; }
  else if (activeMode === 2) { scale = 1.04; y = -4; }

  if (shouldReduceMotion) {
    scale = 1;
    y = 0;
  }

  const labelsAround = isTablet ? labels.slice(0, 3) : labels;
  const labelsBelow = isTablet ? labels.slice(3) : [];

  return (
    <div className="bag-visual-inner">
       <div className="bag-labels-overlay">
          {/* Labels removed per request */}
       </div>

       <motion.div 
         className="bag-transform-wrapper"
         initial={false}
         animate={{ scale, y }}
         transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
       >
         <AnimatePresence mode="wait">
           <motion.img 
             key={activeMode}
             src={image} 
             alt={alt} 
             className="config-bag-image"
             initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
             animate={{ 
                opacity: 1, 
                scale: activeMode === 0 ? 1.05 : 1, 
                transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } 
             }}
             exit={{ 
                opacity: 0, 
                scale: shouldReduceMotion ? 1 : 0.985, 
                transition: { duration: 0.16 } 
             }}
           />
         </AnimatePresence>
       </motion.div>
    </div>
  )
}

const DESKTOP_POS = [
  { top: '22%', left: '30%', align: 'left', line: '36px' },
  { top: '50%', left: '25%', align: 'left', line: '44px' },
  { top: '20%', left: '70%', align: 'right', line: '36px' },
  { top: '45%', left: '75%', align: 'right', line: '44px' },
  { top: '68%', left: '68%', align: 'right', line: '36px' },
];



function MobileConfigurationSystem({ modes, activeMode, setActiveMode, shouldReduceMotion }) {
  return (
    <section className="config-system-mobile section">
      <div className="container">
         <p className="eyebrow">NOMAD <span className="x1-normal">X1</span> / CONFIGURATION SYSTEM</p>
         <h2>ONE SYSTEM. THREE MODES.</h2>
         <p className="lede light-copy">NOMAD X1 adapts its organisation and capacity around what the day requires.</p>
         
         <div className="mobile-bag-container">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeMode}
                src={modes[activeMode].image} 
                alt={modes[activeMode].alt} 
                className="mobile-bag-image"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
                animate={{ 
                   opacity: 1, 
                   scale: activeMode === 0 ? 1.05 : 1, 
                   transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } 
                }}
                exit={{ 
                   opacity: 0, 
                   scale: shouldReduceMotion ? 1 : 0.985, 
                   transition: { duration: 0.16 } 
                }}
              />
            </AnimatePresence>
         </div>

         <div className="mobile-tabs" role="tablist">
           {modes.map((mode, idx) => (
             <button
               key={mode.num}
               role="tab"
               aria-selected={activeMode === idx}
               type="button"
               className={`mobile-tab ${activeMode === idx ? 'active' : ''}`}
               onClick={() => setActiveMode(idx)}
             >
               {mode.title.split(' ')[0]}
             </button>
           ))}
         </div>

         <div className="mobile-active-content">
            <motion.div 
              key={activeMode}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
               <p className="config-mode-capacity">{modes[activeMode].capacity}</p>
               <p className="config-mode-desc">{modes[activeMode].desc}</p>
               <div className="mobile-chips">
                 {modes[activeMode].labels.map((lbl, i) => (
                    <motion.span 
                      key={lbl} 
                      className="feature-chip"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: shouldReduceMotion ? 0 : i * 0.04 }}
                    >
                      {lbl}
                    </motion.span>
                 ))}
               </div>
            </motion.div>
         </div>
      </div>
    </section>
  )
}
