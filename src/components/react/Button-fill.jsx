export default function ButtonFill({title}) {
    return (
        <a class="rounded-md text-white text-center transition-all ease-in-out hover:-translate-y-0 min-w-[250px] px-10 py-3 md:py-4 bg-[#0071eb] hover:bg-[#004FA6] mt-6 mb-4 font-[Arimo] font-black" href="#">
            <span class="whitespace-nowrap headline headline--6">{title}</span>
        </a>
    );
}