
type Props = {
    title: string;
    baseStat: number;
    nameType: string;
}

export const StatusBase = ({ title, baseStat, nameType }: Props) => {
    return (
        <div className="flex items-center">
            <span className="w-10 pr-1 py-1 border-r-2 border-zinc-600">{title}</span>
            <span className="w-8 ml-1">{baseStat}</span>
            <div className="flex-1 ml-3 bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-x-hidden">
                <div className={`${nameType} b h-3 rounded-full`} style={{ width: `${baseStat}%` }} ></div>
            </div>
        </div>
    )
}