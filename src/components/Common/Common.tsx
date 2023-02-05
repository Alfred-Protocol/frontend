const AlfredLogo = ({ width }: { width: number }) => {
  return (
    <svg
      width={width}
      //   height={height}
      viewBox="0 0 39 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29 10.2C28.3 9.79999 27.4 9.79999 26.6 10.2L21 13.5L17.2 15.6L11.7 18.9C11 19.3 10.1 19.3 9.3 18.9L5 16.3C4.3 15.9 3.8 15.1 3.8 14.2V9.19999C3.8 8.39999 4.2 7.59999 5 7.09999L9.3 4.59999C10 4.19999 10.9 4.19999 11.7 4.59999L16 7.19999C16.7 7.59999 17.2 8.39999 17.2 9.29999V12.6L21 10.4V6.99999C21 6.19999 20.6 5.39999 19.8 4.89999L11.8 0.199994C11.1 -0.200006 10.2 -0.200006 9.4 0.199994L1.2 4.99999C0.4 5.39999 0 6.19999 0 6.99999V16.4C0 17.2 0.4 18 1.2 18.5L9.3 23.2C10 23.6 10.9 23.6 11.7 23.2L17.2 20L21 17.8L26.5 14.6C27.2 14.2 28.1 14.2 28.9 14.6L33.2 17.1C33.9 17.5 34.4 18.3 34.4 19.2V24.2C34.4 25 34 25.8 33.2 26.3L29 28.8C28.3 29.2 27.4 29.2 26.6 28.8L22.3 26.3C21.6 25.9 21.1 25.1 21.1 24.2V21L17.3 23.2V26.5C17.3 27.3 17.7 28.1 18.5 28.6L26.6 33.3C27.3 33.7 28.2 33.7 29 33.3L37.1 28.6C37.8 28.2 38.3 27.4 38.3 26.5V17C38.3 16.2 37.9 15.4 37.1 14.9L29 10.2Z"
        fill="#FCDDEC"
      />
    </svg>
  );
};

const CalendarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fffff"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-7 w-7"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
};

const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
      />
    </svg>
  );
};

const ArrowUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
      />
    </svg>
  );
};

export { AlfredLogo, CalendarIcon, ArrowDown, ArrowUp };
