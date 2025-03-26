import { useState, useRef } from "react";
import IdeaGeneratorHeader from "../components/IdeaGeneratorHeader";
import IdeaGeneratorTool from "../components/IdeaGeneratorTool";
import IdeasGenerated from "../components/IdeasGenerated";

export default function Home() {
    const ideasRef = useRef(null);
    const [ideas, setIdeas] = useState([]);
    const handleIdea = async (ideas) => {
        setIdeas(ideas);
        ideasRef.current.scrollIntoView({ behavior: 'smooth', top: 50 });
    }
    
    return (
        <div  className="flex flex-col items-center mx-auto p-4 ">
            {/* <button onClick={() => ideasRef.current.scrollIntoView({behavior:'smooth'})}>Click</button> */}
            <div id="idea-card" className="glass-card m-auto">
                <IdeaGeneratorHeader/>
                <IdeaGeneratorTool handleIdea={handleIdea} />  
            </div>
            <div ref={ideasRef} id="idea-card" className="glass-card m-auto">
                <IdeasGenerated ideas={ideas}/>
            </div>
        </div>
    );
}
