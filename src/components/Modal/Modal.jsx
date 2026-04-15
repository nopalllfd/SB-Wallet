import React from 'react';

function Modal({ open, onClose, children }) {
  if (!open) return;
  return (
    <>
      <div onClick={onClose} className="-top-8 -left-10 absolute w-screen h-[130vh] z-10 opacity-50 bg-black transition-all" />
      <div className="fixed inset-0 flex items-center justify-center ms-100 h-full  me-40 z-50">
        <div className="top-1/6 left-1/5 absolute w-2/3 h-3/4 rounded-lg z-20 bg-white transition-all px-10 py-8 flex flex-col gap-5">{children}</div>
      </div>
    </>
  );
}

export default Modal;
