import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface VideoCardProps {
    quoteBefore?: string;
    quoteHighlight?: string;
    quoteAfter?: string;
    youtubeUrl: string;
    label: string;
}

const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const localizedQuotes: Record<string, {
    es: { before: string; highlight: string; after: string; label: string };
    en: { before: string; highlight: string; after: string; label: string };
}> = {
    "@Video-About-The-Team": {
        es: {
            before: "«En Atelier, creemos que la tecnología no debería ser complicada. ",
            highlight: "Nuestra misión es empoderar a los talleres mecánicos",
            after: "con herramientas inteligentes y automatizadas de última generación».",
            label: "@Video-Sobre-El-Equipo"
        },
        en: {
            before: "“At Atelier, we believe that technology shouldn't be complicated. ",
            highlight: "Our mission is to empower mechanical workshops",
            after: "with next-generation intelligent and automated tools.”",
            label: "@Video-About-The-Team"
        }
    },
    "@Video-About-The-Product": {
        es: {
            before: "",
            highlight: "",
            after: "",
            label: "@Video-Sobre-El-Producto"
        },
        en: {
            before: "",
            highlight: "",
            after: "",
            label: "@Video-About-The-Product"
        }
    }
};

export default function VideoCard({
    quoteBefore,
    quoteHighlight,
    quoteAfter,
    youtubeUrl,
    label
}: VideoCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const youtubeId = getYoutubeId(youtubeUrl) || 'QGMqat4oA00';
    const [thumbnailSrc, setThumbnailSrc] = useState(`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`);
    const [currentLang, setCurrentLang] = useState<'es' | 'en'>('en');

    useEffect(() => {
        setMounted(true);
        const initial = (localStorage.getItem('atelier-lang') || 'en') as 'es' | 'en';
        setCurrentLang(initial);

        const handleLangChange = (e: any) => {
            setCurrentLang(e.detail.lang);
        };
        window.addEventListener('languagechange', handleLangChange);
        return () => window.removeEventListener('languagechange', handleLangChange);
    }, []);

    // Handle ESC key to close modal
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Handle scroll locking
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Resolve the active translations based on label key
    const localized = localizedQuotes[label]?.[currentLang] || {
        before: quoteBefore || "",
        highlight: quoteHighlight || "",
        after: quoteAfter || "",
        label: label
    };

    return (
        <>
            <div className="group/card border border-black bg-white flex flex-col p-6 md:p-8 rounded-none transition-all duration-300 hover:shadow-md cursor-default h-full justify-center">
                {localized.before && (
                    <div className="mb-6">
                        <p className="font-[Arimo] text-[16px] md:text-[18px] text-black leading-relaxed text-left">
                            {localized.before}
                            {localized.highlight && (
                                <span className="bg-[#B3D4F8] px-1 py-0.5 mx-0.5 font-medium text-black">
                                    {localized.highlight}
                                </span>
                            )}
                            {localized.after}
                        </p>
                    </div>
                )}
                
                <div 
                    onClick={() => setIsOpen(true)}
                    className="w-full overflow-hidden border border-zinc-100 aspect-video rounded-none bg-zinc-950 relative group cursor-pointer"
                >
                    {/* Color Video Thumbnail */}
                    <img 
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
                        src={thumbnailSrc} 
                        alt={currentLang === 'es' ? "Miniatura de video" : "Video thumbnail"}
                        onError={() => {
                            // Fallback to high quality default if maxresdefault doesn't exist
                            if (thumbnailSrc !== `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`) {
                                setThumbnailSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
                            }
                        }}
                    />
                    
                    {/* Custom Blue Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/25">
                        <div className="transform transition-transform duration-300 group-hover:scale-110">
                            <svg 
                                viewBox="0 0 100 100" 
                                className="w-16 h-16 md:w-20 md:h-20 drop-shadow-xl"
                            >
                                <circle cx="50" cy="50" r="45" fill="#0071eb" />
                                <polygon points="40,32 40,68 72,50" fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div className="w-full text-end">
                    <span className="bg-[#B3D4F8] px-1 py-0.5 mx-0.5 font-semibold text-lg text-black">
                        {localized.label}
                    </span>
                </div>
            </div>

            {/* Premium Fullscreen Modal Dialog */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs animate-fade-in">
                    {/* Close Area */}
                    <div 
                        className="absolute inset-0 cursor-pointer" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Close Button X */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 z-10 text-white hover:text-zinc-300 transition-colors duration-300 cursor-pointer focus:outline-none"
                        aria-label={currentLang === 'es' ? "Cerrar video" : "Close video"}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-8 h-8"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    {/* Video Embed Frame */}
                    <div className="relative w-full max-w-4xl aspect-video bg-black z-10 shadow-2xl animate-scale-up border border-zinc-800">
                        <iframe 
                            className="w-full h-full" 
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                            title="Video Player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                        >
                        </iframe>
                    </div>
                </div>,
                document.body
            )}
            {/* Custom Animations styles */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeIn {
                    from { opacity: 0; backdrop-filter: blur(0px); }
                    to { opacity: 1; backdrop-filter: blur(4px); }
                }
                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                .animate-scale-up {
                    animation: scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}} />
        </>
    );
}
