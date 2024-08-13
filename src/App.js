import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/pokemon-list" element={<PokemonList />} />
                    <Route path="/pokemon-detail/:id" element={<PokemonDetail />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
