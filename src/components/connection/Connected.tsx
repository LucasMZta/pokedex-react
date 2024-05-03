

export const Connected = () => {
    return (
        <div className={`wrapper connected`}>
            <div className="toast">
                <div className="content"></div>
                <div className="icon"><i className="uil uil-wifi"></i> </div>
                <div className="details text-zinc-500">
                    <span> You're online now </span>
                    <p>Hurray! Internet is connected</p>
                </div>
            </div>
            <div className="close-icon"> <i className="util util-times"></i> </div>
        </div>
    )
}