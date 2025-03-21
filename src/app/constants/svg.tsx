export const UserAvatar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export const BotAvatar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 13.8891 3.05395 15.6468 4.01746 17.1229C4.16334 17.3442 4.19672 17.6249 4.10168 17.8751L3 21.5L6.9948 20.1792C7.15006 20.1312 7.31675 20.1412 7.46538 20.2073C8.85936 20.7851 10.3855 21.1 12 21.5Z" />
    <rect x="8" y="8" width="8" height="8" rx="1" />
    <circle cx="9.5" cy="10.5" r="0.75" fill="currentColor" />
    <circle cx="14.5" cy="10.5" r="0.75" fill="currentColor" />
    <path d="M9 13.5H15" />
    <path d="M12 6V8" />
    <circle cx="12" cy="5.5" r="0.5" fill="currentColor" />
  </svg>
);

export const Eraser = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <line x1="18" y1="8" x2="12" y2="14"></line>
    <line x1="12" y1="8" x2="18" y2="14"></line>
  </svg>
);

export const Create = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const Calendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-foreground-light dark:text-foreground-dark"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <circle cx="12" cy="15" r="2"></circle>
  </svg>
);

export const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-foreground-light dark:text-foreground-dark"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const Location = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="location-icon"
  >
    <ellipse
      className="location-shadow"
      cx="12"
      cy="21"
      rx="4"
      ry="1"
      fill="rgba(0,0,0,0.3)"
    />

    <g className="location-pin">
      <path
        d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
        fill="#FF5252"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="2.5"
        fill="white"
        stroke="currentColor"
        strokeWidth="1"
      />
    </g>

    <g className="location-ripples">
      <circle
        className="ripple ripple-1"
        cx="12"
        cy="21"
        r="0"
        fill="transparent"
        stroke="#FF5252"
        strokeWidth="0.5"
      />
      <circle
        className="ripple ripple-2"
        cx="12"
        cy="21"
        r="0"
        fill="transparent"
        stroke="#FF5252"
        strokeWidth="0.5"
      />
      <circle
        className="ripple ripple-3"
        cx="12"
        cy="21"
        r="0"
        fill="transparent"
        stroke="#FF5252"
        strokeWidth="0.5"
      />
    </g>

    <circle
      className="pin-pulse"
      cx="12"
      cy="10"
      r="5"
      fill="transparent"
      stroke="#FF5252"
      strokeWidth="0.5"
      opacity="0"
    />

    <style jsx>{`
      @keyframes dropPin {
        0% {
          transform: translateY(-15px);
          opacity: 0;
        }
        20% {
          transform: translateY(-15px);
          opacity: 1;
        }
        60% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(-3px);
        }
        85% {
          transform: translateY(0);
        }
        92% {
          transform: translateY(-1px);
        }
        100% {
          transform: translateY(0);
        }
      }

      @keyframes pulseShadow {
        0% {
          transform: scale(0.5);
          opacity: 0;
        }
        20% {
          transform: scale(0.5);
          opacity: 0;
        }
        60% {
          transform: scale(1);
          opacity: 0.7;
        }
        75% {
          transform: scale(0.95);
          opacity: 0.6;
        }
        85% {
          transform: scale(1);
          opacity: 0.7;
        }
        92% {
          transform: scale(0.98);
          opacity: 0.65;
        }
        100% {
          transform: scale(1);
          opacity: 0.7;
        }
      }

      @keyframes ripple {
        0% {
          r: 0;
          opacity: 0.8;
        }
        100% {
          r: 8;
          opacity: 0;
        }
      }

      @keyframes pinPulse {
        0% {
          r: 3;
          opacity: 0.8;
        }
        100% {
          r: 7;
          opacity: 0;
        }
      }

      @keyframes float {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
        100% {
          transform: translateY(0);
        }
      }

      @keyframes glow {
        0% {
          filter: drop-shadow(0 0 2px rgba(255, 82, 82, 0));
        }
        50% {
          filter: drop-shadow(0 0 5px rgba(255, 82, 82, 0.5));
        }
        100% {
          filter: drop-shadow(0 0 2px rgba(255, 82, 82, 0));
        }
      }

      .location-pin {
        transform-origin: 12px 21px;
        animation: dropPin 2s ease-in-out, float 3s ease-in-out 2s infinite,
          glow 4s ease-in-out 2s infinite;
      }

      .location-shadow {
        transform-origin: center center;
        animation: pulseShadow 2s ease-in-out;
        animation-fill-mode: both;
      }

      .pin-pulse {
        animation: pinPulse 2s ease-out infinite;
        animation-delay: 2s;
      }

      .ripple {
        opacity: 0;
      }

      .ripple-1 {
        animation: ripple 1s ease-out 0.6s;
      }

      .ripple-2 {
        animation: ripple 1s ease-out 0.9s;
      }

      .ripple-3 {
        animation: ripple 1s ease-out 1.2s;
      }

      /* Animación cíclica para las ondas */
      .location-icon:hover .ripple-1,
      .location-ripples .ripple-1 {
        animation: ripple 2s ease-out infinite;
        animation-delay: 3s;
      }

      .location-icon:hover .ripple-2,
      .location-ripples .ripple-2 {
        animation: ripple 2s ease-out infinite;
        animation-delay: 4s;
      }

      .location-icon:hover .ripple-3,
      .location-ripples .ripple-3 {
        animation: ripple 2s ease-out infinite;
        animation-delay: 5s;
      }

      /* Ajustes para modo oscuro */
      :global(.dark) .location-pin path {
        fill: #ff7070;
      }

      :global(.dark) .location-shadow {
        fill: rgba(255, 255, 255, 0.2);
      }
    `}</style>
  </svg>
);

export const WeatherSun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="weather-icon"
  >
    <g className="sun-group">
      <circle cx="36" cy="36" r="12" fill="#FFD700" stroke="#FF8C00" />

      <g className="sun-rays">
        <line x1="36" y1="18" x2="36" y2="12" />
        <line x1="36" y1="60" x2="36" y2="54" />
        <line x1="18" y1="36" x2="12" y2="36" />
        <line x1="60" y1="36" x2="54" y2="36" />
        <line x1="23" y1="23" x2="19" y2="19" />
        <line x1="53" y1="53" x2="49" y2="49" />
        <line x1="23" y1="49" x2="19" y2="53" />
        <line x1="53" y1="19" x2="49" y2="23" />
      </g>
    </g>

    <g className="cloud-1">
      <path
        d="M18 48 C12 48, 8 44, 8 40 C8 36, 12 32, 16 32 C16 28, 20 24, 24 24 C28 24, 32 28, 32 32 C36 32, 40 36, 40 40 C40 44, 36 48, 30 48 Z"
        fill="#f0f0f0"
        stroke="#d0d0d0"
      />
    </g>

    <g className="cloud-2">
      <path
        d="M58 56 C62 56, 66 52, 66 48 C66 44, 62 40, 58 40 C58 36, 54 32, 50 32 C46 32, 42 36, 42 40 C38 40, 34 44, 34 48 C34 52, 38 56, 42 56 Z"
        fill="#f0f0f0"
        stroke="#d0d0d0"
      />
    </g>

    <style jsx>{`
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        0% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.6;
        }
      }

      @keyframes trembleCloud1 {
        0% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(-1px, 1px);
        }
        50% {
          transform: translate(1px, -1px);
        }
        75% {
          transform: translate(-1px, -1px);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      @keyframes trembleCloud2 {
        0% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(1px, -1px);
        }
        50% {
          transform: translate(-1px, 1px);
        }
        75% {
          transform: translate(1px, 1px);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      .sun-group {
        transform-origin: 36px 36px;
        animation: rotate 20s linear infinite;
      }

      .sun-rays {
        animation: pulse 3s ease-in-out infinite;
      }

      .cloud-1 {
        animation: trembleCloud1 4s ease-in-out infinite;
      }

      .cloud-2 {
        animation: trembleCloud2 5s ease-in-out infinite;
      }

      /* Ajustes para modo oscuro */
      :global(.dark) .cloud-1 path,
      :global(.dark) .cloud-2 path {
        fill: #3a3a3a;
        stroke: #505050;
      }

      :global(.dark) .sun-group circle {
        fill: #ffa500;
        stroke: #ff4500;
      }
    `}</style>
  </svg>
);
