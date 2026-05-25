import React, { useState, useEffect, useRef } from 'react';

export default function EndCallToAction({
    title = "Actualiza tu taller ahora.",
    subtitle = "Rápido de implementar. Fácil de cambiar. Diseñado para escalar.",
    buttonText = "Agenda una demo"
}) {
    const [scrollY, setScrollY] = useState(0);
    const [currentLang, setCurrentLang] = useState('en');
    const containerRef = useRef(null);

    useEffect(() => {
        const initial = localStorage.getItem('atelier-lang') || 'en';
        setCurrentLang(initial);

        const handleLangChange = (e) => {
            setCurrentLang(e.detail.lang);
        };
        window.addEventListener('languagechange', handleLangChange);

        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrolled = window.scrollY;
            
            // Calculate progress relative to container viewport entry
            const containerTop = rect.top + scrolled;
            const offset = scrolled + viewportHeight - containerTop;
            
            // Limit the parallax calculations to when the component is relatively near
            if (rect.top < viewportHeight && rect.bottom > 0) {
                setScrollY(offset);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        
        // Initial call
        handleScroll();

        return () => {
            window.removeEventListener('languagechange', handleLangChange);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const content = {
        es: {
            title: title,
            subtitle: subtitle,
            buttonText: buttonText
        },
        en: {
            title: "Upgrade your workshop now.",
            subtitle: "Fast to deploy. Easy to change. Built to scale.",
            buttonText: "Upgrade your workshop"
        }
    };

    const activeText = content[currentLang];

    // Parallax translations: different rates for left and right creates a multi-layered 3D depth effect!
    const leftTranslateY = scrollY * -0.06;
    const rightTranslateY = scrollY * -0.10;

    return (
        <div 
            ref={containerRef}
            className="relative w-full overflow-hidden bg-[#B3D4F8] py-20 md:py-32 px-6 flex flex-col items-center justify-center select-none"
        >
            {/* Repeating Blueprint Isometric Grid Pattern Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.45] mix-blend-overlay z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='69.282' viewBox='0 0 120 69.282' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 34.641 L60 0 L120 34.641 L60 69.282 Z M60 0 L60 69.282 M0 34.641 L120 34.641' fill='none' stroke='%23212121' stroke-width='0.75' stroke-opacity='0.15'/%3E%3C/svg%3E")`,
                    backgroundSize: '120px 69.282px',
                    backgroundPosition: 'center',
                }}
            />

            {/* Radial soft lighting glow in center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none z-0" />

            {/* Style declarations for custom micro-animations (Hatching patterns, Bouncing icons, Marching ants) */}
            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(0.5deg); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-6px) rotate(-0.5deg); }
                }
                @keyframes pulse-soft {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.08); opacity: 1; }
                }
                @keyframes dash-flow {
                    to {
                        stroke-dashoffset: -20;
                    }
                }
                @keyframes arrow-bounce {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(4px); }
                }
                .anim-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                .anim-float-medium {
                    animation: float-medium 5s ease-in-out infinite;
                }
                .anim-pulse-soft {
                    animation: pulse-soft 3s ease-in-out infinite;
                }
                .anim-dash-flow {
                    stroke-dasharray: 6, 4;
                    animation: dash-flow 1.5s linear infinite;
                }
                .anim-arrow-bounce {
                    animation: arrow-bounce 2s ease-in-out infinite;
                }
            `}</style>

            <div className="container mx-auto relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between">
                
                {/* ================= LEFT ISOMETRIC TOWER PANEL ================= */}
                <div 
                    className="hidden md:block w-[300px] lg:w-[400px] h-[460px] relative pointer-events-none transition-transform duration-100 ease-out z-10"
                    style={{ transform: `translateY(${leftTranslateY}px)` }}
                >
                    <svg 
                        viewBox="0 0 400 480" 
                        className="w-full h-full drop-shadow-xl"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            {/* Technical Isometric Hatching Pattern: 30 degrees diagonal lines */}
                            <pattern id="hatch-left" width="12" height="12" patternTransform="rotate(30)" patternUnits="userSpaceOnUse">
                                <line x1="0" y1="0" x2="0" y2="12" stroke="#212121" strokeWidth="1" strokeOpacity="0.18" />
                            </pattern>
                        </defs>

                        {/* Ground Grid Blueprint Lines */}
                        <line x1="80" y1="391" x2="20" y2="356" stroke="#212121" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3,3" />
                        <line x1="180" y1="391" x2="220" y2="414" stroke="#212121" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3,3" />
                        <line x1="340" y1="351" x2="380" y2="374" stroke="#212121" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3,3" />
                        <line x1="130" y1="420" x2="130" y2="460" stroke="#212121" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3,3" />

                        {/* === TALL PILLAR (Back-Right) === */}
                        {/* Shadow base projection */}
                        <path d="M 240,351 L 290,380 L 340,351 L 290,322 Z" fill="#212121" fillOpacity="0.03" />
                        
                        {/* Tall Pillar Left Face (Hatched) */}
                        <path d="M 240,150 L 290,179 L 290,380 L 240,351 Z" fill="rgba(255, 255, 255, 0.4)" />
                        <path d="M 240,150 L 290,179 L 290,380 L 240,351 Z" fill="url(#hatch-left)" />
                        <path d="M 240,150 L 290,179 L 290,380 L 240,351 Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" fill="none" />

                        {/* Tall Pillar Right Face (Solid Semi-transparent White) */}
                        <path d="M 290,179 L 340,150 L 340,351 L 290,380 Z" fill="rgba(255, 255, 255, 0.55)" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
                        
                        {/* Tall Pillar Top Face (Solid Semi-transparent White) */}
                        <path d="M 240,150 L 290,121 L 340,150 L 290,179 Z" fill="rgba(255, 255, 255, 0.7)" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />

                        {/* === SHORT PLATFORM (Front-Left) === */}
                        {/* Shadow base projection */}
                        <path d="M 80,391 L 130,420 L 180,391 L 130,362 Z" fill="#212121" fillOpacity="0.03" />

                        {/* Short Platform Left Face (Hatched) */}
                        <path d="M 80,310 L 130,339 L 130,420 L 80,391 Z" fill="rgba(255, 255, 255, 0.4)" />
                        <path d="M 80,310 L 130,339 L 130,420 L 80,391 Z" fill="url(#hatch-left)" />
                        <path d="M 80,310 L 130,339 L 130,420 L 80,391 Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" fill="none" />

                        {/* Short Platform Right Face */}
                        <path d="M 130,339 L 180,310 L 180,391 L 130,420 Z" fill="rgba(255, 255, 255, 0.55)" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
                        
                        {/* Short Platform Top Face */}
                        <path d="M 80,310 L 130,281 L 180,310 L 130,339 Z" fill="rgba(255, 255, 255, 0.7)" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />

                        {/* === DATA CONNECTION PATH === */}
                        {/* Ground guide connection */}
                        <path d="M 290,380 C 200,380 130,390 130,420" fill="none" stroke="#212121" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.2" />
                        
                        {/* Core Animated Curved Flow Line */}
                        <path 
                            d="M 290,150 C 200,150 130,200 130,280" 
                            fill="none" 
                            stroke="#212121" 
                            strokeWidth="1.5" 
                            strokeOpacity="0.3" 
                            strokeDasharray="4,4"
                        />
                        <path 
                            d="M 290,150 C 200,150 130,200 130,280" 
                            fill="none" 
                            stroke="#0071eb" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            className="anim-dash-flow" 
                        />

                        {/* === FLOATING ICONS WITH BOUNCE & ANCHOR LINES === */}
                        {/* 1. Shopping Cart Icon Group (Floating above tall block) */}
                        <g className="anim-float-slow">
                            {/* Vertical anchor guide line */}
                            <line x1="290" y1="130" x2="290" y2="70" stroke="#212121" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.3" />
                            {/* Outer Circle Bubble */}
                            <circle cx="290" cy="70" r="22" fill="white" stroke="#212121" strokeWidth="1.5" className="shadow-lg" />
                            {/* Inner Shopping Cart Icon Path */}
                            <path 
                                d="M 280,63 L 284,63 L 287,73 L 298,73 L 301,66 L 287,66 M 288,77 C 289,77 290,76 290,75 C 290,74 289,73 288,73 C 287,73 286,74 286,75 C 286,76 287,77 288,77 Z M 296,77 C 297,77 298,76 298,75 C 298,74 297,73 296,73 C 295,73 294,74 294,75 C 294,76 295,77 296,77 Z" 
                                fill="none" 
                                stroke="#212121" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                            />
                        </g>

                        {/* 2. Server Database Icon Group (Floating above short block) */}
                        <g className="anim-float-medium">
                            {/* Vertical anchor guide line */}
                            <line x1="130" y1="290" x2="130" y2="230" stroke="#212121" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.3" />
                            {/* Outer Circle Bubble */}
                            <circle cx="130" cy="230" r="20" fill="white" stroke="#212121" strokeWidth="1.5" className="shadow-md" />
                            {/* Isometric Server Icon Drawing */}
                            <g transform="translate(118, 218)">
                                {/* Server Layer 1 */}
                                <path d="M 2,6 L 12,2 L 22,6 L 12,10 Z" fill="#E5E7EB" stroke="#212121" strokeWidth="1.2" strokeLinejoin="round" />
                                <path d="M 2,6 L 2,9 C 2,11 6,12 12,12 C 18,12 22,11 22,9 L 22,6" fill="none" stroke="#212121" strokeWidth="1.2" strokeLinejoin="round" />
                                {/* Server Layer 2 */}
                                <path d="M 2,13 L 2,16 C 2,18 6,19 12,19 C 18,19 22,18 22,16 L 22,13" fill="none" stroke="#212121" strokeWidth="1.2" strokeLinejoin="round" />
                                {/* Glow nodes */}
                                <circle cx="8" cy="8" r="1" fill="#0071eb" className="anim-pulse-soft" />
                                <circle cx="16" cy="8" r="1" fill="#0071eb" className="anim-pulse-soft" />
                                <circle cx="8" cy="15" r="1" fill="#0071eb" />
                                <circle cx="16" cy="15" r="1" fill="#0071eb" />
                            </g>
                        </g>
                    </svg>
                </div>

                {/* ================= CENTER TEXT & CALL TO ACTION ================= */}
                <div className="w-full md:w-auto flex-1 max-w-xl flex flex-col items-center justify-center text-center px-4 z-20">
                    
                    {/* Header: Mona Sans bold, high contrast, clean typography */}
                    <h2 className="font-['Mona_Sans'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#212121] leading-[1.1] mb-6">
                        {activeText.title}
                    </h2>

                    {/* Animated Connection Double-headed Arrow Structure */}
                    <div className="relative h-16 w-12 flex flex-col items-center justify-between my-2">
                        {/* Upper Connector Dot */}
                        <div className="w-2 h-2 rounded-full bg-[#212121] opacity-75" />
                        
                        {/* Double arrow vertical line with animated bouncing pointer */}
                        <div className="w-[1.5px] h-10 bg-gradient-to-b from-[#212121] via-[#212121] to-[#212121] relative flex items-center justify-center">
                        </div>
                        
                        {/* Lower Connector Dot */}
                        <div className="w-2 h-2 rounded-full bg-[#212121] opacity-75" />
                    </div>

                    {/* Subtitle: Arimo light elegant text */}
                    <p className="font-['Arimo'] text-[#212121] text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed opacity-85 mb-8 max-w-md">
                        {activeText.subtitle}
                    </p>

                    {/* Button CTA: Matte black premium pill-button */}
                    <button className="group rounded-md px-10 py-4 bg-[#212121] hover:bg-[#0071eb] text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-2">
                        <span className="font-['Arimo'] leading-none">
                            {activeText.buttonText}
                        </span>
                        {/* Elegant micro-interactive arrow */}
                        <svg 
                            className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                {/* ================= RIGHT ISOMETRIC TOWER PANEL ================= */}
                <div 
                    className="hidden md:block w-[300px] lg:w-[400px] h-[460px] relative pointer-events-none transition-transform duration-100 ease-out z-10"
                    style={{ transform: `translateY(${rightTranslateY}px)` }}
                >
                    <svg 
                        viewBox="0 0 400 480" 
                        className="w-full h-full drop-shadow-xl"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            {/* Technical Isometric Hatching Pattern: 30 degrees diagonal lines */}
                            <pattern id="hatch-right" width="12" height="12" patternTransform="rotate(30)" patternUnits="userSpaceOnUse">
                                <line x1="0" y1="0" x2="0" y2="12" stroke="#212121" strokeWidth="1" strokeOpacity="0.18" />
                            </pattern>
                        </defs>

                        {/* Ground Grid Blueprint Lines */}
                        <line x1="220" y1="361" x2="180" y2="338" stroke="#212121" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3,3" />
                        <line x1="320" y1="361" x2="360" y2="384" stroke="#212121" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3,3" />
                        <line x1="160" y1="410" x2="120" y2="433" stroke="#212121" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3,3" />
                        <line x1="270" y1="390" x2="270" y2="440" stroke="#212121" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3,3" />

                        {/* === TALL PILLAR (Back-Left) === */}
                        {/* Shadow base projection */}
                        <path d="M 110,381 L 160,410 L 210,381 L 160,352 Z" fill="#212121" fillOpacity="0.03" />

                        {/* Tall Pillar Left Face (Hatched) */}
                        <path d="M 110,180 L 160,209 L 160,410 L 110,381 Z" fill="rgba(255, 255, 255, 0.4)" />
                        <path d="M 110,180 L 160,209 L 160,410 L 110,381 Z" fill="url(#hatch-right)" />
                        <path d="M 110,180 L 160,209 L 160,410 L 110,381 Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" fill="none" />

                        {/* Tall Pillar Right Face */}
                        <path d="M 160,209 L 210,180 L 210,381 L 160,410 Z" fill="rgba(255, 255, 255, 0.55)" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />

                        {/* Tall Pillar Top Face */}
                        <path d="M 110,180 L 160,151 L 210,180 L 160,209 Z" fill="rgba(255, 255, 255, 0.7)" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />

                        {/* === SHORT PLATFORM (Front-Right) === */}
                        {/* Shadow base projection */}
                        <path d="M 220,361 L 270,390 L 320,361 L 270,332 Z" fill="#212121" fillOpacity="0.03" />

                        {/* Short Platform Left Face (Hatched) */}
                        <path d="M 220,280 L 270,309 L 270,390 L 220,361 Z" fill="rgba(255, 255, 255, 0.4)" />
                        <path d="M 220,280 L 270,309 L 270,390 L 220,361 Z" fill="url(#hatch-right)" />
                        <path d="M 220,280 L 270,309 L 270,390 L 220,361 Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" fill="none" />

                        {/* Short Platform Right Face */}
                        <path d="M 270,309 L 320,280 L 320,390 L 270,390 Z" fill="rgba(255, 255, 255, 0.55)" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />

                        {/* Short Platform Top Face */}
                        <path d="M 220,280 L 270,251 L 320,280 L 270,309 Z" fill="rgba(255, 255, 255, 0.7)" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />

                        {/* === DATA CONNECTION PATH === */}
                        {/* Ground guide connection */}
                        <path d="M 160,410 C 230,410 270,410 270,390" fill="none" stroke="#212121" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.2" />

                        {/* Core Animated Curved Flow Line */}
                        <path 
                            d="M 160,180 C 230,180 270,210 270,260" 
                            fill="none" 
                            stroke="#212121" 
                            strokeWidth="1.5" 
                            strokeOpacity="0.3" 
                            strokeDasharray="4,4"
                        />
                        <path 
                            d="M 160,180 C 230,180 270,210 270,260" 
                            fill="none" 
                            stroke="#0071eb" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            className="anim-dash-flow" 
                        />

                        {/* === FLOATING ICONS WITH BOUNCE & ANCHOR LINES === */}
                        {/* 1. Parcel Box Icon Group (Floating above tall block) */}
                        <g className="anim-float-slow">
                            {/* Vertical anchor guide line */}
                            <line x1="160" y1="150" x2="160" y2="100" stroke="#212121" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.3" />
                            {/* Detailed Isometric 3D Parcel Box Drawing */}
                            <g transform="translate(145, 80)">
                                {/* Box Top Face */}
                                <path d="M 15,2 L 27,8 L 15,14 L 3,8 Z" fill="#FBBF24" stroke="#212121" strokeWidth="1.5" strokeLinejoin="round" />
                                {/* Tape strip on top */}
                                <path d="M 15,2 L 15,14 M 9,5 L 21,11" fill="none" stroke="#212121" strokeWidth="1.2" strokeOpacity="0.4" />
                                {/* Box Left Face */}
                                <path d="M 3,8 L 15,14 L 15,27 L 3,21 Z" fill="#D97706" stroke="#212121" strokeWidth="1.5" strokeLinejoin="round" />
                                {/* Box Right Face */}
                                <path d="M 15,14 L 27,8 L 27,21 L 15,27 Z" fill="#F59E0B" stroke="#212121" strokeWidth="1.5" strokeLinejoin="round" />
                            </g>
                        </g>

                        {/* 2. Gear/Cog Icon Group (Floating near short block) */}
                        <g className="anim-float-medium">
                            {/* Vertical anchor guide line */}
                            <line x1="270" y1="260" x2="270" y2="200" stroke="#212121" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.3" />
                            {/* Outer Circle Bubble */}
                            <circle cx="270" cy="200" r="20" fill="white" stroke="#212121" strokeWidth="1.5" className="shadow-md" />
                            {/* Gear Icon Path */}
                            <path 
                                d="M 270,190 A 10,10 0 1,0 270,210 A 10,10 0 1,0 270,190 Z" 
                                fill="none" 
                                stroke="#212121" 
                                strokeWidth="1.5" 
                            />
                            <path 
                                d="M 270,193 L 270,187 M 270,207 L 270,213 M 263,200 L 257,200 M 277,200 L 283,200 M 265,195 L 261,191 M 275,205 L 279,209 M 265,205 L 261,209 M 275,195 L 279,191" 
                                fill="none" 
                                stroke="#212121" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                            />
                            {/* Central Hole */}
                            <circle cx="270" cy="200" r="3" fill="#212121" />
                        </g>
                    </svg>
                </div>

            </div>
        </div>
    );
}