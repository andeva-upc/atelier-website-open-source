export default function ButtonOutline({title}) {
    return (
        <a class="rounded-md text-center transition-all ease-in-out hover:-translate-y-0 min-w-[250px] px-10 py-3 md:py-4 border-1 border-[#0071eb] bg-transparent hover:bg-[#B3D4F8] text-[#0071eb] mb-4 font-[Arimo] font-black" href="#">
            <span class="whitespace-nowrap headline headline--6">{title}</span>
        </a>
    );
}