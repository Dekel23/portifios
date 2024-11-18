import './App.css'
import { createContext , useEffect } from 'react'
import Home from './Home/Home'
import Card from './Card/Card'
import Header from './Header/Header'

export const SubjectsContext = createContext();
export const TechnologiesContext = createContext();

function App(){

    const cards = ["About", "Education", "Projects"]
    
    const socials = ["email", "linkedin", "github", "instagram"]

    const technologies = [
        { name: 'Git', background: "hsla(14, 91%, 54%, 0.5)" },
        { name: 'Java', background: "hsla(216, 55%, 35%, 0.5)" },
        { name: 'Python', background: "hsla(45, 99%, 51%, 0.5)" },
        { name: 'Assembly', background: "hsla(216, 85%, 34%, 0.5)" },
        { name: 'C', background: "hsla(232, 50%, 45%, 0.5)" },
        { name: 'C++', background: "hsla(202, 100%, 41%, 0.5)" }
    ]

    const cardData = {
        "About": {  headLine: "About Me", 
                    paragraph: "I'm Erel Dekel, a 20-year-old computer engineer from Israel.\n \
                                I recently completed a four-year degree in computer engineering at Bar-Ilan University, \
                                where I developed a strong passion for software development and machine learning.\n \
                                I’m now preparing to join the elite 8200 unit in the IDF.\n \
                                With a dedication to pushing the boundaries of technology and a love for continuous learning, \
                                I'm excited to contribute to impactful work in the field of machine learning and beyond" },
        "Education": {  headLine: "My Education", 
                        paragraph: "I hold a degree in Computer Engineering and Physics from Bar-Ilan University, graduating with an impressive average of 93.\n \
                                    During my studies, I was honored with the Rector's Award in my second year for achieving an outstanding annual average of 98.9.\n \
                                    My academic journey began with exceptional achievements, including scoring 118.6 on the Bagrut tests \
                                    and completing a three-year accelerated Bagrut in mathematics as part of the Talented Youth in Mathematics program.\n \n \
                                    I am proficient in a variety of programming languages and technologies, including:" },
        "Projects": {   headLine: "Projects of Mine", 
                        paragraph: "During my academic journey, I completed numerous hands-on projects in physics, electronics, and hardware, \
                                    gaining valuable experience in both theoretical and practical aspects.\n \
                                    I also worked on a variety of coding projects across multiple programming languages, many of which are showcased on my GitHub.\n \
                                    My passion lies in machine learning, where I thrive on tackling complex challenges.\n \
                                    My capstone project focused on the formal verification of deep neural networks within a reinforcement learning agent, blending my interests in AI and software reliability.\n \
                                    This project is a testament to my commitment to innovation and available for review on my GitHub." },
    };

    useEffect(() => {
        document.querySelector(".github").onclick = () => {
            window.location.href = "https:/www.github.com/Dekel23"
        };
        document.querySelector(".instagram").onclick = () => {
            window.location.href = "https://www.instagram.com/erel_dekel"
        };
        document.querySelector(".linkedin").onclick = () => {
            window.location.href = "https://www.linkedin.com/in/erel-dekel-504190244/"
        }
        document.querySelector(".email").onclick = () => {
            window.location.href = "mailto:ereldekel123321@gmail.com"
        }
    }, [])

    return(
        <>
            <SubjectsContext.Provider value={["Home", ...cards]}>
                <Header />                
            </SubjectsContext.Provider>
            <main>
                <Home></Home>
                <TechnologiesContext.Provider value={technologies}>
                    <div className='cardsContainer'>
                        {cards.map((element, index) => (
                            <Card 
                                id={element}
                                key={index} 
                                headLine={cardData[element].headLine} 
                                paragraph={cardData[element].paragraph}
                            />
                        ))}
                    </div>
                </TechnologiesContext.Provider>
            </main>
            <footer>
                <div className='contactInfo'>
                    <h3 className='footerHL'>Contact Me Through My Socials</h3>
                    <ul>
                        {socials.map((social, index) => 
                            <li key={index}>
                                <a className={social}>
                                    <img src={`./src/assets/Footer/${social}.png`} alt={social}/>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default App