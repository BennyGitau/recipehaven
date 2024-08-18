// ShareButton.jsx
import React, { useState, useEffect } from 'react';

import ShareModal from './ShareModal';

const ShareButton = ({ title, text, url ,btn}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      if (modalIsOpen) {
        mainContent.setAttribute('inert', 'true');
      } else {
        mainContent.removeAttribute('inert');
      }
    }
  }, [modalIsOpen]);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
        image: image,
      }).catch((error) => console.error('Error sharing content:', error));
    } else {
      setModalIsOpen(true);
    }
  };

  return (
    <div>
      <button onClick={handleShareClick} className="text-xl hover:text-green-700 transition-transform duration-100 hover:scale-110">
        <span role="img" aria-label="share">{btn}</span>
      </button>
      <ShareModal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        url={url} 
        title={title} 
        text={text} 
      />
    </div>
  );
};

export default ShareButton;

