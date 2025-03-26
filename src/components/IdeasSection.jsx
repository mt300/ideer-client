import React, { useState, useEffect } from 'react';
// import { set } from 'react-hook-form';

const IdeaCard = ({ idea, handleHide }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(idea.edit??idea.content);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('IdeaCard', idea);
    setEditedText(idea.edit ?? idea.content);
  }, [idea]);
  const handleEdit = () => {
    if (isEditing) {
      // Salva as alterações
      const updatedIdea = { ...idea, edit: editedText };
      idea.edit = editedText;
      // idea.edit = editedText;
      setLoading(true);
      fetch(`${import.meta.env.VITE_BACKEND_URL}/ideas/edit/${idea.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ ...updatedIdea }),
      })
        .then((response) => {
          if(!response.ok){
            // console.log('Erro salvando',response.text);
            throw new Error('Erro ao salvar a ideia');
          }
          response.json()
          // console.log('response',response);
        })
        .catch((error) => {
          console.error('Error:', error);
        }).finally(() => {
          setLoading(false)
          setIsEditing(!isEditing);
        });
    }else	{
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className={`card glass-card ${idea.hidden ? '' : ''}`}>

      <div className="card-header">
        <h3>Plataforma: {idea.platform}</h3>
        <p>Categoria: {idea.category}</p>
        <p>Tags: {idea.tags.join(', ')}</p>
        <p>Humor: {idea.humor ? 'Sim' : 'Não'}</p>
      </div>

      <div className="card-body">
        {isEditing ? (
          <textarea
            rows={5}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="editable-text"
          />
        ) : (
          <p>{editedText}</p>
        )}
      </div>

      <div className="card-footer">
        <button onClick={handleEdit}>{loading? "Salvando..." : (isEditing ? 'Salvar' : 'Editar')}</button>
        <button onClick={() => handleHide(idea.id)}>Esconder</button>
      </div>
    </div>
  );
};

const IdeaOthers = ({idea}) => {
  const [like,setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  }
  return (
    <div className={`card glass-card ${idea.hidden ? 'hide' : ''}`}>

    <div className="card-header">
      <h3>{idea.platform}</h3>
      <p>{idea.category}</p>
      <p>{idea.tags.join(', ')}</p>
      <p>{'Humor:' + (idea.humor ? 'Sim' : 'Não')}</p>
    </div>

    <div className="card-body">
      
      <p>{idea.content}</p>
      
    </div>

    <div className="card-footer">
      <button onClick={handleLike} className={like?'liked-button':''}>{'Curtir'}</button>
      
    </div>
  </div>
  );
}
const IdeasSection = (props) => {
  const { ideas:ideasProps, others } = props;	
  const [ideas, setIdeas] = useState(ideasProps||[]);

  const handleHide = (id) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, hidden: true } : idea
      )
    );
  };
  useEffect(()=>{
    // console.log(props)
    setIdeas(ideasProps);
  },[ideasProps,props]);
  return (
    <div className="ideas-section">
      {
        ideas.map((idea) => {
          
         return !others ? (<IdeaCard key={idea.id} idea={idea} handleHide={handleHide} />) : (<IdeaOthers key={idea.id} idea={idea} />)
        
        })
      }
    </div>
  );
};

export default IdeasSection;
