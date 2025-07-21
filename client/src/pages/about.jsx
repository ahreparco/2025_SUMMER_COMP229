import photo from '../assets/photo.jpg';
import resume from '../assets/resume.pdf';

export default function About() {
  return (
    <main style={{ padding: '1rem' }}>
        <h1>About Me</h1>
        <h2>Name</h2>
        <p>Dingpei Chen</p>
        <h2>Photo</h2>
        <img
        src={photo}          
        alt="Dingpei Chen"
        width='100px'
        height='100px'
        />
        <h2>Introduction</h2>
        <p>Hello! I’m Dingpei Chen, a full-stack JavaScript developer specializing in building dynamic, 
            responsive web applications. I started my journey mastering JavaScript fundamentals and quickly expanded into Node.js, 
            Express, and MongoDB on the back end, and React with Vite on the front end. I enjoy crafting clean, 
            maintainable code, whether it’s structuring a RESTful API, designing an intuitive UI, or optimizing database queries and 
            I’m passionate about using technology to solve real-world problems and create seamless user experiences.
        </p>
        <h2>Resume</h2>
        <a href={resume} target="_blank" rel="noopener">
            View Sample PDF
        </a>
    </main>
  );
}