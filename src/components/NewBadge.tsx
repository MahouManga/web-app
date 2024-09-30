import React from 'react';
import moment from 'moment';

const NewBadge = ({ date }: any) => {
  const currentDate = moment();
  const contentDate = moment(date);

  const hoursDifference = currentDate.diff(contentDate, 'hours');
  const daysDifference = currentDate.diff(contentDate, 'days');

  let displayText;

  if (hoursDifference <= 4) {
    displayText = 'NEW';
  } else if (hoursDifference <= 24) {
    displayText = `${hoursDifference} horas`;
  } else if (daysDifference <= 10) {
    displayText = `${daysDifference} Dias`;
  } else {
    displayText = contentDate.format('DD/MM/YY');
  }

  if (displayText === 'NEW') {
    return (
      <span className="text-xs p-[6px] flex items-center animate-pulse ease-in-out transform hover:scale-110 hover:rotate-12 hover:shadow-lg hover:bg-red-100 rounded-lg bg-red-200 shadow-md text-red-600 hover:text-red-800 transition-all duration-300">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          className="mr-1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 96C0 43 43 0 96 0h96V190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5V0h32 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32z"></path>
        </svg>
        <p className="text-xs">{displayText}</p>
      </span>
    );
  }

  return (
    <div className='p-1'>
      {displayText}
    </div>
  )
};

export default NewBadge;
