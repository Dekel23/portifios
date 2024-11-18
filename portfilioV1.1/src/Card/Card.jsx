import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './Card.module.css'
import Tech from '../Tech/Tech'
import Gallery from '../Gallery/Gallery'

function Card({id, headLine = "", paragraph = ""}){
    const cardRef = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleRotateCard = () => {
        setIsFlipped(!isFlipped);
    };
    
    return (
        <div ref={cardRef} id={`${id}-card`} className={`${styles.cardContainer} ${isFlipped ? styles.flipped : ''}`}>
            <div className={styles.front}>
                <h2 className={styles.headLine}>{headLine}</h2>
                {/* check if the card is 0def or 180def and then flip */}
                <img 
                    src="./src/assets/flip-arrow.png" 
                    alt="flip card" 
                    onClick={() => {!isFlipped && toggleRotateCard()}} 
                    className={styles.arrow}
                />
                <div className={styles.paragraph}>
                    {paragraph.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line} <br />
                        </React.Fragment>
                    ))}
                </div>
                {id === "Education" ? <Tech /> : null}
            </div>
            <div className={styles.back}>
                <h2 className={styles.headLine}>{headLine}</h2>
                <img 
                    src="./src/assets/flip-arrow.png" 
                    alt="flip card" 
                    onClick={() => {isFlipped && toggleRotateCard()}}
                    className={styles.arrow}
                />
                <Gallery id={`${id}`}></Gallery>
            </div>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    headLine: PropTypes.string,
    paragraph: PropTypes.string,
}

export default Card