import React from 'react';
import { FaGithub } from 'react-icons/fa';

function Header() {
  return (
    <div className='w-full bg-gray-800 flex justify-between'>
      <div className='text-white text-xl p-2 font-bold font-serif'>Todo App</div>
      <div className='text-white text-xl p-2'>
        <a
          href='https://github.com/AnarNasibov85/'
          target='_blank'
          rel='noopener noreferrer'
          style={{ cursor: 'pointer' }}
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default Header;
