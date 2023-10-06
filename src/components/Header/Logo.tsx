export const Logo = (): JSX.Element => {
	return (
		<a href="https://flowbite.com" className="flex items-center">
			<img
				src="https://flowbite.com/docs/images/logo.svg"
				className="mr-3 h-6 sm:h-9"
				alt="Tennis Stats Logo"
			/>
			<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
				Tennis Stats
			</span>
		</a>
	)
}
