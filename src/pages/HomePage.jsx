import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    // Fetch product data 
    useEffect(() => {
        const getProductData = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        };
        getProductData();
        
    }, []);

    // Filter products based on the search
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', background: 'bisque' }}>
            {/* Search Bar */}
            <TextField
                label="Search Products"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 4 }}
            />

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                width: '100%',
            }}>
                {/* Ternary operator to check if the search does not match with anything, return "No products found" */}
                {filteredProducts.length === 0 ? (
                    <Typography variant="h6" color="text.secondary">
                        No products found.
                    </Typography>
                ) : (
                    // Else return the filtered products
                    filteredProducts.map(product => (
                        <Card
                            key={product.id}
                            sx={{
                                flex: '1 1 250px',
                                maxWidth: 300,
                                margin: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image={product.image}
                                title={product.title}
                                sx={{ objectFit: 'contain', padding: '10px' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" noWrap>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary', mb: 1 }}>
                                    -- {product.category.toUpperCase()} --
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', padding: '0 16px 16px' }}>
                                <Button size="small" variant="contained" sx={{ color: 'white' }}>
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>View Details</Link>
                                </Button>
                                <Typography sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                    PRICE: ${product.price}
                                </Typography>
                            </CardActions>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
