import { useEffect, useState } from "react";
import IdeasSection from "../components/IdeasSection";
import { useAuth } from "../context/useAuth";

export default function UserIdeas() {
    const [ideas,setIdeas] = useState([]);
    const { user  } = useAuth();
    useEffect(()=>{
        console.log("user",user);
        const fetchIdeas = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ideas/user/${user.id}`);
                if(response.ok){
                  const ideas = await response.json();
                  // console.log('response ideas',ideas);
                    setIdeas(ideas);
                }
            }catch(error){
                console.error(error);
            }
        };
        fetchIdeas();
    },[]);
    useEffect(()=>{
        ideas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        console.log('Ideas Effect',ideas);
    },[ideas]);
    return (
        <div className=" container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Suas Ideias</h1>
        <p className="text-lg">
            Aqui você pode ver todas as ideias que você gerou.
        </p>
        <IdeasSection ideas={ideas} others={false} />
        </div>
    );
}