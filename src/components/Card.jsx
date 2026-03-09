const Card = (props) => {
    return (
        <div className="flip-card" onClick={props.handleFlip}>
            <div className={`flip-card-inner ${props.isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                    <p>{props.front}</p>
                </div>
                <div className="flip-card-back">
                    <p>{props.back}</p>
                </div>
            </div>
        </div>
    )
}

export default Card