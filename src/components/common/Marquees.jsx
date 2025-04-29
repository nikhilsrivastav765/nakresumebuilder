import Marquee from './Marquee'
import { motion } from 'framer-motion'


const Marquees = () => {
    const sampSkills = ["HTML5","CSS3","JavaScript","React.js","Next.js","Tailwind CSS","Bootstrap","Redux", "TypeScript", "Node.js", "Express.js"," MongoDB","MySQL","PostgreSQL","GraphQL","REST API","Firebase","Git & GitHub","Docker","Kubernetes","AWS","Azure","CI/CD","WebSockets","Webpack","Vite","Jest & Testing Library","Python","Java","C++","Data Structures & Algorithms","Machine Learning","AI & Chatbots","Cybersecurity"]
  return (
    <div>
    <div className="bg-[#4F46E5] h-32 lg:h-52 mb-20 flex items-center whitespace-nowrap overflow-hidden w-full">
      
         <motion.div  className="flex gap-16 lg:gap-32  px-5  flex-shrink-0 whitespace-nowrap flex-nowrap" initial={{x : "0"}} animate={{x : "-100%"}} transition={{ease : "linear", duration : 25, repeat : Infinity}}>
         {sampSkills.map((elem, index)=>{
            return <Marquee value={elem}/>
            
         })}
         </motion.div>
         <motion.div  className="flex gap-16 lg:gap-32  px-5   flex-shrink-0 whitespace-nowrap flex-nowrap" initial={{x : "0"}} animate={{x : "-100%"}} transition={{ease : "linear", duration : 25, repeat : Infinity}}>
         {sampSkills.map((elem, index)=>{
            return <Marquee value={elem}/>
            
         })}
         </motion.div>


         
    </div>
    </div>
  )
}

export default Marquees