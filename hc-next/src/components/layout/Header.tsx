import Link from 'next/link';
import React from 'react';
import { Logo } from '~/assets/icons/logo';

interface HeaderProps extends React.HTMLAttributes<HTMLOrSVGElement> {
className?: string;
}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
	return <header className="p-4 " {...props}>
		<Link href="/" className="flex items-center gap-2">
			<Logo className="w-12	 h-12	" />
		<div className="text-3xl font-extrabold tracking-tight">
			HemoConnect
		</div>
		</Link>
	</header>;
};

export default Header;