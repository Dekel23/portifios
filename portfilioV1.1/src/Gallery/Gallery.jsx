import styles from './Gallery.module.css'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react';

function Gallery({id}) {
    const [files, setFiles] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const images = import.meta.glob('/src/assets/Gallery/**/*');
        
        const folderImages = Object.keys(images)
            .filter(path => path.includes(`/${id}/`))
            .map(path => path.split('/').pop());
            
        setFiles(folderImages);
    }, [id]);

    useEffect(() => {
        if (files.length > 0) {
            const interval = setInterval(() => {
                next();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [files, slideIndex]);

    const prev = () => {
        setSlideIndex((prevIndex) => 
            prevIndex === 0 ? files.length - 1 : prevIndex - 1
        );
    };

    const next = () => {
        setSlideIndex((prevIndex) => 
            prevIndex === files.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className={styles.slider}>
            <div className={styles.slides}>
                {files.map((file, index) => (
                    <img 
                        key={index} 
                        className={`${styles.slide} ${index === slideIndex ? styles.displaySlide : ''}`}
                        src={`./src/assets/Gallery/${id}/${file}`} 
                        alt={`${file}`} 
                    />
                ))}
            </div>
            <button className={styles.prev} onClick={prev}>&#10094;</button>
            <button className={styles.next} onClick={next}>&#10095;</button>
        </div>
    );  
}

Gallery.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Gallery