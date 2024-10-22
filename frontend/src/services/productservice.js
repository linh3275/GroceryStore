import axios from 'axios';

export const getAll = async () => {
    const {data} = await axios.get('/api/products');
    return data;
};

export const search = async searchFunction => {
    const {data} = await axios.get('/api/products/search/' + searchFunction);
    return data;
};

export const getAllTags = async () => {
    const {data} = await axios.get('/api/products/tags');
    return data;
};

export const getAllByTag = async tag => {
    if (tag === 'Loại mặt hàng') return getAll();
    const {data} = await axios.get('/api/products/tag/' + tag);
    return data;
};

export const getById = async productId => {
    const {data} = await axios.get('/api/products/' + productId);
    return data;
};

export async function deleteById(productId) {
    await axios.delete('/api/products' + productId);
};

export async function update(product) {
    await axios.put('/api/products', product);
};

export async function add(product) {
    const {data} = await axios.post('/api/products', product);
    return data;
};