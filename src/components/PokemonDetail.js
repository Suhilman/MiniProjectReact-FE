import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Typography, Box, Paper, Avatar, CircularProgress } from '@mui/material';
import Navbar from './Navbar';

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/pokemon-list`)
            .then(response => {
                const selectedPokemon = response.data.find(p => p.id === parseInt(id));
                setPokemon(selectedPokemon);
            });
    }, [id]);

    const handleCatchPokemon = () => {
        axios.post('http://localhost:3000/catch-pokemon')
            .then(response => {
                const { success } = response.data;
                if (success) {
                    const nickname = prompt('You caught the Pokémon! Give it a nickname:');
                    alert(`You caught ${pokemon.name} and named it ${nickname}`);
                } else {
                    alert('The Pokémon escaped!');
                }
            });
    };

    if (!pokemon) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    flexDirection: 'column',  
                }}
            >
                <CircularProgress />
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                    Loading...
                </Typography>
            </Box>
        );
    }

    const moveNames = Array.isArray(pokemon.moves)
        ? pokemon.moves.join(', ')
        : 'No moves available';

    return (
        <>
            <Navbar/>
            <Container
                maxWidth="sm"
                sx={{
                    height: '100vh', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        textAlign: 'center',
                        position: 'relative',
                    }}
                >
                    <Box sx={{ position: 'relative', top: '-50px', display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                            src={pokemon.image}
                            alt={pokemon.name}
                            sx={{
                                width: 300,
                                height: 300,
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: "-100px" }}>
                        <Typography variant="h5" fontWeight="bold">
                            {pokemon.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '16px' }}>
                            {pokemon.types}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '24px' }}>
                            A Pokémon that uses {moveNames} moves.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                marginBottom: '16px',
                                textTransform: 'none',
                            }}
                            onClick={handleCatchPokemon}
                        >
                            Catch Pokémon
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default PokemonDetail;
