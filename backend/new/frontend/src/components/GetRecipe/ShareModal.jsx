// ShareModal.jsx
import React from 'react';
import Modal from 'react-modal';
import {
    PinterestShareButton,
    TelegramShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramIcon,
    PinterestIcon,
} from 'react-share';

Modal.setAppElement('#root'); 

const ShareModal = ({ isOpen, onRequestClose, url, title, text }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Share Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="flex flex-col items-center  bg-gray-200  w-full max-w-md mx-auto">
        <h2 className="text-2xl mb-4 text-gray-800">Share this recipe</h2>
        <div className="flex space-x-4">
          <FacebookShareButton url={url} quote={text}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={text}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={text}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TelegramShareButton url={url} title={text}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <PinterestShareButton url={url} title={text}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </div>
        <button
          onClick={onRequestClose}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ShareModal;
