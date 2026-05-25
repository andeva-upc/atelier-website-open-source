import { useState, useEffect } from 'react';

interface TeamCardProps {
    name: string;
    role: string;
    username: string;
    avatar: string;
    quoteBefore: string;
    quoteHighlight: string;
    quoteAfter: string;
    highlightColor?: 'pink' | 'green' | 'blue' | 'purple' | 'yellow' | 'teal' | string;
}

const colorMap: Record<string, string> = {
    pink: 'bg-[#ffdce5]',
    green: 'bg-[#d2f2d9]',
    blue: 'bg-[#cde7f7]',
    purple: 'bg-[#e1dbff]',
    yellow: 'bg-[#fff2b2]',
    teal: 'bg-[#ccfbf1]',
};

const memberQuotes: Record<string, { es: { before: string, highlight: string, after: string }, en: { before: string, highlight: string, after: string } }> = {
    shouydev: {
        es: {
            before: "Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. ",
            highlight: "Especializado en liderar y controlar",
            after: " el flujo del proyecto."
        },
        en: {
            before: "Student of Software Engineering at Universidad Peruana de Ciencias Aplicadas. ",
            highlight: "Specialized in leading and controlling",
            after: " the project flow."
        }
    },
    xs4el: {
        es: {
            before: "Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. ",
            highlight: "Especializado en Front-End",
            after: "."
        },
        en: {
            before: "Student of Software Engineering at Universidad Peruana de Ciencias Aplicadas. ",
            highlight: "Specialized in Front-End development",
            after: "."
        }
    },
    AldoDev20: {
        es: {
            before: "Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. ",
            highlight: "Especializado en Web Services",
            after: " y desarrollo Back-End."
        },
        en: {
            before: "Student of Software Engineering at Universidad Peruana de Ciencias Aplicadas. ",
            highlight: "Specialized in Web Services",
            after: " and Back-End development."
        }
    },
    Jennivz: {
        es: {
            before: "Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. ",
            highlight: "Especializada en datos",
            after: "."
        },
        en: {
            before: "Student of Software Engineering at Universidad Peruana de Ciencias Aplicadas. ",
            highlight: "Specialized in data engineering",
            after: "."
        }
    },
    danieltyuyu: {
        es: {
            before: "Estudiante de la Universidad Peruana de Ciencias Aplicadas cursando la carrera de Ingeniería de Software. ",
            highlight: "Especializado en los datos",
            after: " y visualización del proyecto."
        },
        en: {
            before: "Student of Software Engineering at Universidad Peruana de Ciencias Aplicadas. ",
            highlight: "Specialized in data analytics",
            after: " and project visualization."
        }
    },
    Patto04: {
        es: {
            before: "Estudiante de la Universidad Peruana de Ciencias Aplicadas de la carrera de Ingeniería de Software. ",
            highlight: "Especializada en datos",
            after: "."
        },
        en: {
            before: "Student of Software Engineering at Universidad Peruana de Ciencias Aplicadas. ",
            highlight: "Specialized in data management",
            after: "."
        }
    }
};

export default function TeamCard({
    name,
    role,
    username,
    avatar,
    quoteBefore,
    quoteHighlight,
    quoteAfter,
    highlightColor = 'blue',
}: TeamCardProps) {
    const bgClass = colorMap[highlightColor] || highlightColor;
    const [currentLang, setCurrentLang] = useState<'es' | 'en'>('en');

    useEffect(() => {
        const initial = (localStorage.getItem('atelier-lang') || 'en') as 'es' | 'en';
        setCurrentLang(initial);

        const handleLangChange = (e: any) => {
            setCurrentLang(e.detail.lang);
        };
        window.addEventListener('languagechange', handleLangChange);
        return () => window.removeEventListener('languagechange', handleLangChange);
    }, []);

    // Get the localized quote based on username
    const localized = memberQuotes[username]?.[currentLang] || {
        before: quoteBefore,
        highlight: quoteHighlight,
        after: quoteAfter
    };

    return (
        <a href={`https://github.com/${username}`} className="group border-1 border-black text-black bg-white flex flex-col justify-between p-6 md:p-8 h-full transition-all duration-300 hover:shadow-md rounded-none cursor-pointer">
            <div>
                <p className="font-[Arimo] text-md md:text-lg leading-relaxed text-left">
                    {localized.before}
                    <span className={`${bgClass} px-1 py-0.5 mx-0.5 font-medium`}>
                        {localized.highlight}
                    </span>
                    {localized.after}
                </p>
            </div>
            
            <div className="mt-6 pt-5 flex flex-row items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0 transition-all duration-500 grayscale group-hover:grayscale-0">
                    <img 
                        className="w-full h-full object-cover" 
                        src={avatar} 
                        alt={`Retrato de ${name}`} 
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-xs md:text-md font-['Arimo'] text-[#757575]">
                        <strong className="text-lg font-semibold text-black font-['Mona_Sans']">{name}</strong> {role}
                    </span>
                    <span className="text-md font-[Arimo] text-[#757575] font-semibold mt-0.5">
                        @{username}
                    </span>
                </div>
            </div>
        </a>
    );
}
