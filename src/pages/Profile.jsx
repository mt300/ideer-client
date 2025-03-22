import React, { useState } from 'react';

export default function  Profile(){
  // Estado para armazenar se o usuário tem assinatura ou não
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Simula a ação de assinar ou cancelar a assinatura
  const handleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="profile-container">
      <h1>Perfil</h1>

      <div className="profile-info">
        <p><strong>Nome:</strong> João Silva</p>
        <p><strong>E-mail:</strong> joao.silva@email.com</p>
        <p>
          <strong>Status da Assinatura:</strong> 
          <span className={isSubscribed ? 'subscribed' : 'not-subscribed'}>
            {isSubscribed ? ' Ativo' : ' Não Assinado'}
          </span>
        </p>
      </div>

      <button className={isSubscribed ? 'cancel' : 'subscribe'} onClick={handleSubscription}>
        {isSubscribed ? 'Cancelar Assinatura' : 'Assinar'}
      </button>
    </div>
  );
};


