import React, { useEffect, useReducer } from 'react'
import { getAll, search, getAllTags, getAllByTag } from '../../services/productservice';
import ThumbNails from '../../components/thumbnails/thumbnails';
import { useParams } from 'react-router-dom';
import NotFound from '../../components/notfound/notfound';

const initialState = {products: [], tags: []};

const reducer = (state, action) => {
  switch (action.type) {
    case 'products_loaded':
      return {...state, products: action.payload};
    case 'tags_loaded':
      return {...state, tags: action.payload};
    default:
      return state;
  }
}

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {products, tags} = state;
  const {searchStore, tag} = useParams();
  
  useEffect(() => {
    const loadProducts = tag ? getAllByTag(tag)
    : searchStore ? search(searchStore) : getAll();

    getAllTags().then(tags => dispatch({type: 'tags_loaded', payload: tags}))
    
    loadProducts.then(products => dispatch({type: 'products_loaded', payload: products}))
  }, [searchStore, tag]);

  return (
    <>
      {products.length === 0 && <NotFound />}
      <ThumbNails products={products} tags={tags} />
    </>
  )
}
