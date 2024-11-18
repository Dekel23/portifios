import { useEffect, useRef } from 'react'
import styles from './Home.module.css'

function Home(){
    const greetingRef = useRef(null);
    const introducingRef = useRef(null);
    const roleRef = useRef(null);
    const cvRef = useRef(null);

    useEffect(() => {
        const greeting = greetingRef.current;
        const introducing = introducingRef.current;
        const role = roleRef.current;
        const cv = cvRef.current;

        const handleGreetingEndAnimation = () => {
            introducing.style.animationPlayState = 'running';
        };

        const handleIntroducingEndAnimation = () => {
            role.style.animationPlayState = 'running';
        };

        const handleRoleEndAnimation = () => {
            cv.style.animationPlayState = 'running';
        };

        const handleCVClick = () => {
            cv.classList.remove(styles.flash); // Remove class if it exists
            void cv.offsetWidth; // Trigger reflow
            cv.classList.add(styles.flash); // Add class back
        };

        greeting.addEventListener('animationend', handleGreetingEndAnimation);
        introducing.addEventListener('animationend', handleIntroducingEndAnimation);
        role.addEventListener('animationend', handleRoleEndAnimation);
        cv.addEventListener('click', handleCVClick);

        return () => {
            greeting.removeEventListener('animationend', handleGreetingEndAnimation);
            introducing.removeEventListener('animationend', handleIntroducingEndAnimation);
            role.removeEventListener('animationend', handleRoleEndAnimation);
            cv.removeEventListener('click', handleCVClick);
        };
    }, []);

    return(
        <div className={styles.homeContainer}>
            <h1 className={styles.greeting} ref={greetingRef}>Hello You</h1>
            <h1 className={styles.introducing} ref={introducingRef}>
                My Name is
                <span className={styles.name}> Erel Dekel</span>
            </h1>
            <h1 className={styles.role} ref={roleRef}>
                I'm a computer engineer
            </h1>
            <a href="./src/assets/CV.pdf" download="ErelDekel-CV" className={styles.boxCV} ref={cvRef}>
                Download
                <span className={styles.cv}> CV</span>
            </a>
        </div>
    )
}

export default Home