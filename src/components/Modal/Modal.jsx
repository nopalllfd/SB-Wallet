import React from 'react';

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <button type="button" className="fixed inset-0 z-40 cursor-default bg-black/40" aria-label="Close modal" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-xl border border-blue-100 bg-white p-6 shadow-lg">{children}</div>
      </div>
    </>
  );
}

export default Modal;
