import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Foods endpoints
app.get('/api/foods', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('foods')
            .select('*');
            
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/foods', async (req, res) => {
    try {
        const { name, protein, calories, unit } = req.body;
        const { data, error } = await supabase
            .from('foods')
            .insert([{ name, protein, calories, unit }])
            .select()
            .single();
            
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error adding food:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/api/foods/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const { error } = await supabase
            .from('foods')
            .delete()
            .eq('name', name);
            
        if (error) throw error;
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting food:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Daily Diet endpoints
app.get('/api/dailydiet', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('dailydiet')
            .select(`
                id,
                date,
                foods!dailydiet_food_id_fkey (
                    name,
                    protein,
                    calories,
                    unit
                )
            `);
            
        if (error) throw error;
        
        // Transform the data to match the previous format
        const transformedData = data.map(item => ({
            id: item.id,
            date: item.date,
            name: item.foods.name,
            protein: item.foods.protein,
            calories: item.foods.calories,
            unit: item.foods.unit
        }));
        
        res.json(transformedData);
    } catch (error) {
        console.error('Error fetching daily diet:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/dailydiet', async (req, res) => {
    try {
        const { date, food_id } = req.body;
        const { data, error } = await supabase
            .from('dailydiet')
            .insert([{ date, food_id }])
            .select()
            .single();
            
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error adding daily diet entry:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/api/dailydiet/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('dailydiet')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting daily diet entry:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 