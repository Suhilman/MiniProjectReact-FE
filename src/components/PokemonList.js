import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { fetchPokemonList } from '../redux/pokemonSlice';
import { Button, Paper, Container, Typography, CircularProgress, Box, TextField, Tabs, Tab } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Navbar from './Navbar';

const PokemonList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pokemonList = useSelector((state) => state.pokemon.list || []);
    const myPokemonList = useSelector((state) => state.pokemon.myPokemonList || []); 
    const status = useSelector((state) => state.pokemon.status);

    const [filterText, setFilterText] = useState('');
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [filteredMyPokemonList, setFilteredMyPokemonList] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPokemonList());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (pokemonList && Array.isArray(pokemonList)) {
            setFilteredPokemonList(
                pokemonList.filter((pokemon) =>
                    pokemon.name.toLowerCase().includes(filterText.toLowerCase())
                )
            );
        }

        if (myPokemonList && Array.isArray(myPokemonList)) {
            setFilteredMyPokemonList(
                myPokemonList.filter((pokemon) =>
                    pokemon.nickname.toLowerCase().includes(filterText.toLowerCase())
                )
            );
        }
    }, [filterText, pokemonList, myPokemonList]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setFilterText('');
    };

    const handleRelease = (pokemon) => {
        console.log(`Releasing ${pokemon.nickname}`);
    };

    const columns = [
        {
            name: 'Image',
            selector: row => row.image,
            cell: row => <img src={row.image} alt={row.name} style={{ width: '50px', height: '50px' }} />,
            width: '70px',
        },
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '60px',
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Types',
            selector: row => row.types,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate(`/pokemon-detail/${row.id}`)}
                    startIcon={<OpenInNewIcon />}
                >
                    Details
                </Button>
            ),
        },
    ];

    const myPokemonColumns = [
        {
            name: 'Image',
            selector: row => row.image,
            cell: row => <img src={row.image} alt={row.nickname} style={{ width: '50px', height: '50px' }} />,
            width: '70px',
        },
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '60px',
        },
        {
            name: 'Nickname',
            selector: row => row.nickname,
            sortable: true,
        },
        {
            name: 'Types',
            selector: row => row.types,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleRelease(row)}
                    startIcon={<OpenInNewIcon />}
                >
                    Release
                </Button>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <Container
                maxWidth="md"
                sx={{
                    height: '100vh', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        backgroundColor: 'white',
                        width: '100%',
                        borderRadius: '10px'
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Pokémon
                    </Typography>
                    
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab label="Pokemon List" />
                        <Tab label="My Pokemon List" />
                    </Tabs>

                    <TextField
                        label="Search Pokémon"
                        variant="outlined"
                        margin="normal"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        fullWidth
                    />

                    {status === 'loading' && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {status === 'succeeded' && activeTab === 0 && (
                        <DataTable
                            columns={columns}
                            data={filteredPokemonList}
                            pagination
                            selectableRowsHighlight
                        />
                    )}

                    {status === 'succeeded' && activeTab === 1 && (
                        <DataTable
                            columns={myPokemonColumns}
                            data={filteredMyPokemonList}
                            pagination
                            selectableRowsHighlight
                        />
                    )}

                    {status === 'failed' && (
                        <Typography variant="body1" color="error" align="center">
                            Error loading Pokémon data.
                        </Typography>
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default PokemonList;
