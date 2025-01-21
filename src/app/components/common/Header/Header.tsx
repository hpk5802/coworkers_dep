'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SideMenuBar from '@/app/components/common/header/SideMenubar';
import HeaderMenuBar from '@/app/components/icons/HeaderMenuBar';
import HeaderBoardButton from '@/app/components/common/header/Boards';

export default function Header() {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOpenSlideMenubar = (): void => setVisible(true);
  const handleCloseSlideMenubar = (): void => setVisible(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-40 w-full bg-background-secondary px-4 py-5 tablet:px-6 xl:px-0 xl:py-3">
        <div className="mx-auto flex items-center justify-between xl:max-w-[75rem]">
          <div className="flex items-center gap-4 tablet:gap-8 xl:gap-10">
            <button
              className="tablet:hidden"
              onClick={handleOpenSlideMenubar}
              aria-label="Open Menu"
            >
              <HeaderMenuBar />
            </button>
            <div className="h-5 w-[6.3rem] xl:h-8 xl:w-[9.8rem]">
              <Link className="block h-full w-full" href="/">
                <Image
                  className="object-contain"
                  src="/logos/HeaderLogo.png"
                  alt="logo"
                  width={158}
                  height={32}
                />
              </Link>
            </div>
            {/* 자유게시판 버튼 */}
            <HeaderBoardButton className="hidden tablet:block" />
          </div>
          <div>
            <Link
              className="text-md hover:text-interaction-hover xl:text-base"
              href="/login"
            >
              로그인
            </Link>
          </div>
        </div>
      </header>

      {/* 사이드 메뉴 바 */}
      <SideMenuBar visible={visible} onClose={handleCloseSlideMenubar} />
    </>
  );
}
