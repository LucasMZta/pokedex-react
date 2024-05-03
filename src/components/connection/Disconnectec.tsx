
export const Disconnected = () => {
    return (
        <div className={`wrapper disconnected`}>
            <div className="toast">
                <div className="content"></div>
                <div className="icon"><i className="uil uil-wifi"></i> </div>
                <div className="details text-zinc-500">
                    <span> You're offline now</span>
                    <p>Ops! Internet is disconnected</p>
                </div>
            </div>
            <div className="close-icon"> <i className="util util-times"></i> </div>
        </div>
    )
}