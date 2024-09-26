import localFont from 'next/font/local';

// Load the Pretendard font with different weights
const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export default pretendard;
