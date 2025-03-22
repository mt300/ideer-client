import { useState } from "react";
import IdeaGeneratorHeader from "../components/IdeaGeneratorHeader";
import IdeaGeneratorTool from "../components/IdeaGeneratorTool";
import IdeasGenerated from "../components/IdeasGenerated";

export default function Home() {
    const [ideas, setIdeas] = useState([]);
    const handleIdea = async (ideas) => {
        setIdeas(ideas);
    }
    
    return (
        <div  className="flex flex-col items-center mx-auto p-4 ">
            <div id="idea-card" className="glass-card m-auto">
                <IdeaGeneratorHeader/>
                <IdeaGeneratorTool handleIdea={handleIdea} />  
            </div>
            <div id="idea-card" className="glass-card m-auto">
                <IdeasGenerated ideas={ideas}/>
            </div>
        </div>
    );
}
