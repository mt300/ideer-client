import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import IdeasSection from "../components/IdeasSection";

export default function AllIdeas() {
    const [ideas, setIdeas] = useState([]);
    const { user, loading } = useAuth();
    useEffect(() => {
        if(!user){
          return
        }
        console.log('USER',user)
        const fetchIdeas = async () => {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ideas/`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          if(response.ok){
            const data = await response.json();
            const ideaOthers = data.filter(idea => idea.userId !== user.id);
            console.log('Ideas Others',ideaOthers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            setIdeas(ideaOthers);
          }
        }
        fetchIdeas();
    }, [user, loading]);
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Todas as Ideias</h1>
        <p className="text-lg">
            Aqui você pode ver todas as ideias que foram geradas.
        </p>
        <IdeasSection ideas={ideas} others={true} />
        </div>
    );
    
}