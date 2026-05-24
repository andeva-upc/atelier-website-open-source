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

    return (
        <a href={`https://github.com/${username}`} className="group border-1 border-black text-black bg-white flex flex-col justify-between p-6 md:p-8 h-full transition-all duration-300 hover:shadow-md rounded-none cursor-pointer">
            <div>
                <p className="font-[Arimo] text-md md:text-lg leading-relaxed text-left">
                    {quoteBefore}
                    <span className={`${bgClass} px-1 py-0.5 mx-0.5 font-medium`}>
                        {quoteHighlight}
                    </span>
                    {quoteAfter}
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
