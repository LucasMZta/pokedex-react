
type Props = {
    data: {
        item: { name: string; }
        min_happiness: string;
        min_level: string;
        trigger: { name: string }
    };
}

export const FormatEvolution = ({ data }: Props) => {

    const renderSwitch = (param: string) => {
        if (param) {
            switch (param) {
                case 'level-up':
                    return data.min_happiness ? `Happiness ${data.min_happiness}` : `Level ${data.min_level}`;
                    break;
                case 'use-item':
                    return data.item.name;
                    break;
                default:
                    return data.trigger.name;
                    break;
            }
        }
    }
    ''


    return (
        <div className="text-sm text-zinc-400 capitalize flex flex-col items-center">
            <>
                {renderSwitch(data.trigger.name)}
            </>
            <div className="w-0.5 border-r-2 flex-1 mt-9">

            </div>
        </div>
    )
}