import {
  BiLogoPython,
  BiLogoFlask,
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoBootstrap,
  BiLogoReact,
  BiLogoAws,
  BiLogoTailwindCss,
  BiLogoNodejs,
  BiLogoFirebase,
} from 'react-icons/bi'
import { SiNextdotjs } from 'react-icons/si'
import { CgVercel } from 'react-icons/cg'

export const projects = [
  {
    date: 'Apr 2022',
    title: 'MS Teams Clone Backend',
    description:
      'As part of a university group project, I developed a Python Flask API with a JSON database that roughly clones a Microsoft Teams application.',
    icons: [
      { icon: <BiLogoPython />, tooltip: 'Python' },
      { icon: <BiLogoFlask />, tooltip: 'Flask' },
    ],
    code: '',
    href: '',
  },
  {
    date: 'Jul 2022',
    title: 'visuals',
    description:
      'Using HTML, CSS and p5.js I built a frontend to help visualise some basic algorithms I was interested in.',
    icons: [
      { icon: <BiLogoHtml5 />, tooltip: 'HTML' },
      { icon: <BiLogoCss3 />, tooltip: 'CSS' },
      { icon: <BiLogoJavascript />, tooltip: 'JavaScript' },
    ],
    code: 'https://github.com/matthiebl/visuals',
    href: 'https://matthiebl.github.io/visuals/',
  },
  {
    date: 'Nov 2022',
    title: 'Slack Clone Frontend',
    description:
      'For a university project, I built a HTML, Bootstrap and vanilla JS frontend that resembles a Slack messaging app.',
    icons: [
      { icon: <BiLogoHtml5 />, tooltip: 'HTML' },
      { icon: <BiLogoBootstrap />, tooltip: 'Bootstrap' },
      { icon: <BiLogoJavascript />, tooltip: 'JavaScript' },
    ],
    code: '',
    href: '',
  },
  {
    date: 'Dec 2022',
    title: 'Airbnb Clone Frontend',
    description:
      'As part of a university project, I built a React and Bootstrap website to resemble Airbnb.',
    icons: [
      { icon: <BiLogoReact />, tooltip: 'React' },
      { icon: <BiLogoBootstrap />, tooltip: 'Bootstrap' },
    ],
    code: '',
    href: '',
  },
  {
    date: 'Jan 2023',
    title: 'AWS Intern Project',
    description: `For my internship at AWS I worked on a fullstack website for the first time.
        I utilised AWS AppSync and AWS Lambda to implement APIs to interact with my teams Java project.
        I then developed a React frontend using an AWS component library, Cloudscape, which
        interacts with the APIs I set up. Deployed with AWS Route 53 and AWS S3.`,
    icons: [
      { icon: <BiLogoReact />, tooltip: 'React' },
      { icon: <BiLogoAws />, tooltip: 'AWS' },
    ],
    code: '',
    href: '',
  },
  {
    date: 'Feb 2023',
    title: 'Expense Tracking App',
    description: `This is one of my first personal fullstack websites that I decided to pursue.
        I used React and tailwindcss to build the frontend, but lacking the knowledge of great
        free backends like Firebase or AWS Amplify, I just used a node.js Express and JSON backend.
        As a result, I didn't utilise any easy hosting service and left it to be run locally.`,
    icons: [
      { icon: <BiLogoReact />, tooltip: 'React' },
      { icon: <BiLogoTailwindCss />, tooltip: 'tailwindcss' },
      { icon: <BiLogoNodejs />, tooltip: 'node.js' },
    ],
    code: 'https://github.com/matthiebl/budget-app',
    href: '',
  },
  {
    date: 'Apr 2023',
    title: 'To-do App',
    description: `Next I made another fullstack website for simple to-do list tracking. This time however,
        I was adventuring into Firebase for the first time. I used React and tailwindcss for the frontend and
        the Firebase SDK to interact with a Firestore database, making it easy to deploy with Firebase`,
    icons: [
      { icon: <BiLogoReact />, tooltip: 'React' },
      { icon: <BiLogoTailwindCss />, tooltip: 'tailwindcss' },
      { icon: <BiLogoFirebase />, tooltip: 'Firebase' },
    ],
    code: 'https://github.com/matthiebl/todo-app',
    href: 'https://todo.mhiebl.com',
  },
  {
    date: 'May 2023',
    title: 'Factory Idle Calculator',
    description:
      'This was just a simple frontend that I developed to act as a calculator for a game I was playing at the time. React, tailwindcss and Firebase to deploy.',
    icons: [
      { icon: <BiLogoReact />, tooltip: 'React' },
      { icon: <BiLogoTailwindCss />, tooltip: 'tailwindcss' },
      { icon: <BiLogoFirebase />, tooltip: 'Firebase' },
    ],
    code: 'https://github.com/matthiebl/factory-idle-calculator',
    href: 'https://mhiebl-facidle.web.app',
  },
  {
    date: 'May 2023',
    title: 'Workout Timer',
    description:
      'This was another simple website to act as a workout timer. Just using React, tailwindcss and Firebase to deploy as well.',
    icons: [
      { icon: <BiLogoReact />, tooltip: 'React' },
      { icon: <BiLogoTailwindCss />, tooltip: 'tailwindcss' },
      { icon: <BiLogoFirebase />, tooltip: 'Firebase' },
    ],
    code: 'https://github.com/matthiebl/fitness-app',
    href: 'https://fitness.mhiebl.com',
  },
  {
    date: 'Jul 2023',
    title: 'Expense Traker 2.0',
    description: `When revisiting my expense tracker, I realised I wanted to have it deployed, as well as updated to use Firebase.
        Still happy with my frontend, I used React and tailwindcss to build the frontend again, but opted for TypeScript this time as well as
        Firebase for the backend and deployment.`,
    icons: [
      { icon: <BiLogoReact />, tooltip: 'React' },
      { icon: <BiLogoTailwindCss />, tooltip: 'tailwindcss' },
      { icon: <BiLogoFirebase />, tooltip: 'Firebase' },
    ],
    code: 'https://github.com/matthiebl/expense-app',
    href: 'https://expense.mhiebl.com',
  },
  {
    date: 'Aug 2023',
    title: 'Multiplayer Games App',
    description: `Now that I had gotten used to my stack I wanted to make something that felt more real.
        I again used the same React, tailwindcss and Firebase stack to build an app that allowed for realtime multiplayer games,
        implementing Connect 4 and Yahtzee!`,
    icons: [
      { icon: <BiLogoReact />, tooltip: 'React' },
      { icon: <BiLogoTailwindCss />, tooltip: 'tailwindcss' },
      { icon: <BiLogoFirebase />, tooltip: 'Firebase' },
    ],
    code: 'https://github.com/matthiebl/games-app',
    href: 'https://games.mhiebl.com',
  },
  {
    date: 'Sep 2023',
    title: 'Portfolio Website',
    description: `Then, naturally, after getting used to an easy solo tech stack, I wanted to switch things up. Both at my work and university,
        I was being excited by the features of Next.js 13 and wanted to put it to the test. Since I couldn't think of a new fullstack project,
        and this website was well overdue, I decided to build my first Next.js and tailwindcss frontend. This time using Vercel to easily
        deploy the Next.js site!`,
    icons: [
      { icon: <SiNextdotjs />, tooltip: 'Next.js' },
      { icon: <BiLogoTailwindCss />, tooltip: 'tailwindcss' },
      { icon: <CgVercel />, tooltip: 'Vercel' },
    ],
    code: 'https://github.com/matthiebl/portfolio',
    href: 'https://mhiebl.com',
  },
]
