import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProductData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };
        getProductData();
    }, [id]);

    if (!product) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
            maxWidth="100%"
            margin="0 auto"
            bgcolor="bisque"
            minHeight="80vh"
        >
            <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                    width: '100%',
                    maxWidth: '300px',
                    height: 'auto',
                    mb: 3
                }}
            />
            <Typography variant="h4" component="h2" gutterBottom>
                {product.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
            </Typography>

            <Typography variant="h6" color="primary" paragraph>
                Price: ${product.price}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Rating: {product.rating.rate} ({product.rating.count} reviews)
            </Typography>

            <Box display="flex" gap={2} mt={3}>
                <Button variant="contained" color="primary">
                <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>Back</Link>
                </Button>
                <Button variant="contained" color="primary">
                <Link to={`/cart`} style={{ textDecoration: 'none', color: 'inherit' }}>Add to cart</Link>
                </Button>

            </Box>
        </Box>
    );
};

export default ProductDetailsPage;
