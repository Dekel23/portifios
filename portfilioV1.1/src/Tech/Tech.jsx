import styles from './Tech.module.css'
import React, {useContext} from 'react'
import { TechnologiesContext } from '../App'

function Tech() {

    const technologies = useContext(TechnologiesContext);
    
    return(
        <div className={styles.techContainer}>
            {technologies.map((tech, index) => 
                <div key={index} className={styles.techCard}>
                    <div className={styles.techIcon} style={{backgroundColor: tech.background}}>
                        <img src={`./src/assets/Tech/${tech.name}.png`} alt={`${tech.name} didnt load`} />
                    </div>
                    <h3 className={styles.techInfo}>{tech.name}</h3>
                </div>
            )}
        </div>
    )
}

export default Tech