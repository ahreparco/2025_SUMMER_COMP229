import photo1 from '../assets/project1.png';
import photo2 from '../assets/project2.png';
import photo3 from '../assets/project3.png';

export default function Projects() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>My Projects</h1>
      <ul>
        <li>
            Project 1 – Mad Lips Game
            <img src={photo1} alt="project1" width='160px' height='90px' 
            style={{
            display: 'block'
            }}/>
            <p>
                Mad Libs is a word game where one player prompts another for a list of words to substitute for blanks
                in a story. The game is typically played by asking for specific types of words (nouns, adjectives, 
                verbs, etc.) without revealing the context. Once all words are collected, they’re inserted into the
                story, often creating humorous or nonsensical results. For this assignment, you’ll be creating a 
                digital version where users input their words through a form, validate those inputs, and then 
                display the completed story.
            </p>
        </li>
        <li>
            Project 2 – Pixar Movie Gallery
            <img src={photo2} alt="project2" width='160px' height='90px' 
            style={{
            display: 'block'
            }}/>
            <p>
                A dynamic web gallery to showcase Pixar movies using JavaScript. 
                You can load movie data from a file, filter and search through it, 
                and display each movie as a visual card. You can also apply a custom animation 
                when users hover over movie cards.
            </p>
        </li>
        <li>
            Project 3 – Pokédex Search + Favourites
            <img src={photo3} alt="project3" width='160px' height='90px' 
            style={{
            display: 'block'
            }}/>
            <p>
                A dynamic Pokédex application using JavaScript. Users can search for Pokémon by name or ID,
                view their details in a styled card, open a modal to view more information, 
                and add up to 6 Pokémon to a favourites list stored in localStorage. 
                You can work with an external API (PokeAPI).
            </p>
        </li>
      </ul>
    </main>
  );
}