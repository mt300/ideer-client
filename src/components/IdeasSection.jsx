import React, { useState, useEffect } from 'react';

const IdeaCard = ({ idea, handleHide }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(idea.content);
  useEffect(() => {
    console.log('IdeaCard', idea);
    setEditedText(idea.content);
  }, [idea]);
  const handleEdit = () => {
    if (isEditing) {
      // Salva as alterações
      idea.content = editedText;
    }
    setIsEditing(!isEditing);
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
        <button onClick={handleEdit}>{isEditing ? 'Salvar' : 'Editar'}</button>
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
    console.log(props)
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
