import React, { useState, useEffect, useRef } from 'react';

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLang, setActiveLang] = useState('en'); // Default to English as per website
    const containerRef = useRef(null);

    // Auto-close menu when clicking outside & Sync initial language state
    useEffect(() => {
        const initial = localStorage.getItem('atelier-lang') || 'en';
        setActiveLang(initial);

        const handleLangChange = (e) => {
            setActiveLang(e.detail.lang);
        };
        window.addEventListener('languagechange', handleLangChange);

        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('languagechange', handleLangChange);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Available languages
    const languages = [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleSelectLanguage = (code) => {
        setActiveLang(code);
        setIsOpen(false); // Close menu after selecting
        localStorage.setItem('atelier-lang', code);
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: code } }));
    };

    return (
        <div 
            ref={containerRef}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none font-['Arimo']"
        >
            {/* Pop-up Menu (Slides up, scales and fades in) */}
            <div 
                className={`absolute bottom-16 right-0 mb-3 w-40 bg-white rounded-xl shadow-2xl py-1.5 flex flex-col transition-all duration-300 origin-bottom-right z-50 ${
                    isOpen 
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                        : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                }`}
            >
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`w-full px-4 py-2.5 text-sm font-medium text-left transition-colors duration-200 flex items-center justify-between cursor-pointer ${
                            activeLang === lang.code 
                                ? 'text-[#0071eb] bg-blue-50/40' 
                                : 'text-neutral-700 hover:text-[#0071eb] hover:bg-neutral-50/70'
                        }`}
                    >
                        <span>{lang.name}</span>
                        {/* Selected Indicator dot */}
                        {activeLang === lang.code && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0071eb] animate-pulse" />
                        )}
                    </button>
                ))}
            </div>

            {/* Main Floating Action Button (FAB) */}
            <button 
                onClick={toggleMenu}
                aria-label="Seleccionar idioma"
                className={`group w-14 h-14 rounded-full flex items-center justify-center bg-[#0071eb] hover:bg-[#004fa6] text-white transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 border border-blue-400/10 focus:outline-none`}
            >
                {/* Globe/World Icon (Rotates when menu is open, shifts slightly on hover) */}
                <svg 
                    className={`w-6 h-6 stroke-current transition-transform duration-300 ${
                        isOpen ? 'rotate-90 scale-90' : 'group-hover:rotate-12'
                    }`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                </svg>
            </button>
        </div>
    );
}
