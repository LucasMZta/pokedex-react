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
                    if (data.min_happiness) {
                        return `Happiness ${data.min_happiness}`
                    } else if (data.min_level) {
                        return `Level ${data.min_level}`
                    } else {
                        return undefined
                    }
                    break;
                case 'use-item':
                    return data.item.name
                    break;
                case '':
                    return 'No info'
                    break;
                default:
                    return data.trigger.name;
                    break;
            }
        }
    }

    const fullReturn = renderSwitch(data.trigger.name);

    return (
        <>
            {fullReturn &&
                <div className="text-sm text-zinc-400 capitalize flex flex-col items-center">
                    <span className="mt-9">{fullReturn}</span>
                    <div className="w-0.5 border-r-2 flex-1"> </div>
                </div>
            }
        </>
    )
}