import React from 'react';

const Loader = () => {
  return (
    <>
      <style>{`
        .ping-container {
          position: relative;
          width: 25px;
          height: 25px;
        }

        .inner-ping,
        .outer-ping {
          position: absolute;
          border-radius: 50%;
          width: 25px;
          height: 25px;
        }

        .inner-ping {
          animation: ping-inner 1.3s infinite;
        }

        .outer-ping {
          opacity: 0.5;
          animation: ping-outer 1.3s infinite;
        }

        @keyframes ping-inner {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0);
            opacity: 0;
          }
        }

        @keyframes ping-outer {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(2);
            opacity: 0.5;
          }
        }
      `}</style>
      <div className="ping-container">
        <div className="inner-ping bg-neutral-500"></div>
        <div className="outer-ping bg-neutral-300"></div>
      </div>
    </>
  );
};

export default Loader;