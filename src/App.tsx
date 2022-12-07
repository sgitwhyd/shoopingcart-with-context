import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, Cart, Detail } from './pages';

function App() {
	return (
		<>
			<Routes>
				<Route path='/product' element={<Home />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='product/:category/:id' element={<Detail />} />
			</Routes>
		</>
	);
}

export default App;
