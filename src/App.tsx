// import 'module-alias/register'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/homepage'

const App = (): JSX.Element => {
	return (
		<>
		<BrowserRouter>
		<Routes>
			<Route path='/' element={<HomePage/>}/>
		</Routes>
		</BrowserRouter>

		</>
	)
}

export default App
