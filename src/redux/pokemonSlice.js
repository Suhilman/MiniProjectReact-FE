import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemonList = createAsyncThunk('pokemon/fetchPokemonList', async () => {
    const response = await axios.get('http://localhost:3000/pokemon-list');
    return response.data;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemonList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchPokemonList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default pokemonSlice.reducer;
