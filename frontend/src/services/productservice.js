import axios from 'axios';

export const getAll = async () => {
    const {data} = await axios.get('/api/products');
    return data;
};

export const search = async searchFunction => {
    const {data} = await axios.get('/api/products/search/' + searchFunction);
    return data;
};

/* bị lỗi url. không hoạt động chính xác */ 
export const getAllTags = async () => {
    const {data} = await axios.get('/api/products/tags');
    return data;
};
/*  */

export const getAllByTag = async tag => {
    if (tag === 'All') return getAll();
    const {data} = await axios.get('/api/products/tag/' + tag);
    return data;
};

export const getById = async productId => {
    const {data} = await axios.get('/api/products/' + productId);
    return data;
};