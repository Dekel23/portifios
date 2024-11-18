import styles from './NavBar.module.css'
import React, {useContext} from 'react'
import { SubjectsContext } from '../App'

function NavBar(){

    const subjects = useContext(SubjectsContext);

    const scrollToCard = (id) => {
        if (id !== 'Home') {
            const card = document.getElementById(`${id}-card`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            window.location.replace('/');
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 500);
        }
    };

    return(
        <>
            <ul className={styles.navbar}>
                {subjects.map((element, index) => 
                    <li key={index}>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            scrollToCard(element);
                            }}>
                            <img 
                                src={`./src/assets/NavIcons/${element}.png`} 
                                alt={`${element} not loaded`} 
                            />
                        </a>
                    </li>
                )}
            </ul>
        </>
    )
}

export default NavBar