import AppLogoIcon from './app-logo-icon';
interface AppLogoProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'classic' | 'upgraded';
}
export default function AppLogo({
    size = 'md',
    variant = 'classic',
}: AppLogoProps) {
    if (variant && variant == 'classic') {
        return (
            <>
                <div className="flex size-10 items-center justify-center rounded-md">
                    <AppLogoIcon
                        className="rounded-md object-contain shadow-md"
                        alt="Asproqualee"
                        with_bg={false}
                        size={size}
                    />
                </div>

                <div className="flex flex-1 grid-cols-2 flex-col text-left text-sm">
                    <span className="truncate leading-tight font-semibold">
                        Asproqualee
                    </span>
                    <div className="text-xs font-medium text-[#6B7C7D]">
                        Eau & Environnement
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg">
                    <AppLogoIcon
                        className="rounded-md object-contain shadow-md"
                        alt="Asproqualee"
                        with_bg={false}
                        size={size}
                    />
                    <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-[#F28482]" />
                </div>
                <div className="hidden sm:block">
                    <div className="text-base font-bold text-[#2D3E3F]">
                        AsproQualee
                    </div>
                    <div className="text-xs font-medium text-[#6B7C7D]">
                        Eau & Environnement
                    </div>
                </div>
            </>
        );
    }
}
