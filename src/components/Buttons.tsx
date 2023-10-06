interface Props {
    content: string
}

export const PrimaryButton = ({ content }: Props): JSX.Element => {
	return (
		<a
			href="#"
			className="text-white bg-primary-700 hover:bg-primary-800 hover:outline hover:outline-gray-300 hover:outline-1 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:hover:outline dark:hover:outline-white dark:hover:outline-1"
		>
			{content}
		</a>
	)
}

export const SecondaryButton = ({ content }: Props): JSX.Element => {
	return (
		<a
			href="#"
			className="text-gray-800 outline-primary-500 dark:text-white outline outline-1 hover:bg-gray-200 hover:outline-2 hover: font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 dark:hover:outline"
		>
			{content}
		</a>
	)
}
