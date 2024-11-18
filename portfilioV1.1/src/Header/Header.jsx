import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Header.module.css'

function Header() {
    useEffect(() => {
        const header = document.querySelector('header');
        
        const updateHeaderBackground = () => {
            // Calculate scroll progress (0 to 1)
            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Calculate color values
            const startColor = 8;  // Starting HSL lightness value
            const endColor = 16;   // Ending HSL lightness value
            const currentLightness = startColor + (scrollProgress * (endColor - startColor));
            
            // Update header background
            header.style.backgroundColor = `hsl(0, 0%, ${currentLightness}%)`;
        };

        // Add scroll event listener
        window.addEventListener('scroll', updateHeaderBackground);
        
        // Set initial background color
        updateHeaderBackground();

        // Cleanup
        return () => {
            window.removeEventListener('scroll', updateHeaderBackground);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.name}>
                    <span className={styles.first}>Erel</span>
                    <span className={styles.last}>Dekel</span>
                </h1>
                <NavBar />
            </div>
        </header>
    );
}

export default Header;