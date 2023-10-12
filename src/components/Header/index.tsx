import { PrimaryButton, SecondaryButton } from '../Buttons'
import { Logo } from './Logo'
import { ToggleDarkMode } from './ToggleDarkMode'

export const Header = (): JSX.Element => {
	return (
		<header className='fixed w-full border-b border-primary-500 h-10 z-10'>
			<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<Logo></Logo>
					<div className="flex items-center lg:order-2">
						<SecondaryButton content="Log In" />
						<PrimaryButton content="Get Started" />
						<ToggleDarkMode></ToggleDarkMode>
					</div>
				</div>
			</nav>
		</header>
	)
}
