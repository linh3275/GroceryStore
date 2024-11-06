import React, { useEffect, useState } from 'react';
import classes from './productmanagementpage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/productservice';
import NotFound from '../../components/notfound/notfound';
import Title from '../../components/HTML_DOM/title';
import Search from '../../components/Search/search';
import Price from '../../components/price/price';
import { toast } from 'react-toastify';

export default function ProductManagementPage() {

  const [products, setProducts] = useState();
  const {searchTerm} = useParams();

  useEffect(() => {
    loadProducts();
  }, [searchTerm]);

  const loadProducts = async () => {
    const products = searchTerm? await search(searchTerm) : await getAll();
    setProducts(products);
  }

  const ProductsNotFound = () => {
    if (products && products.length > 0) return;

    return searchTerm? (
      <NotFound linkRoute="/admin/products" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard !" />
    )
  }

  const deleteProduct = async product => {
    const confirmed = window.confirm(`Delete product ${product.name}`);

    if (!confirmed) return;

    await deleteById(product.id);
    toast.success(`"${product.name}" has been removed !`);
    setProducts(products.filter(p => p.id !== product.id));
  }

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage Products" margin="1rem auto" />

        <div className={classes.searchBar}>
          <Search
            searchRoute="/admin/products"
            defaultRoute="/admin/products"
          />
        </div>

        <Link to="/admin/addProduct" className={classes.add_products}>
        Add Product +
        </Link>
        <ProductsNotFound />

        {products && products.map(product => (
          <div key={product.id} className={classes.list_item}>
            <img src={product.imageUrl} alt={product.name} />
            <Link to={'/product/' + product.id}>{product.name}</Link>
            <Price price={product.price} />
            <div className={classes.actions}>
              <Link to={'/admin/editProduct/' + product.id}>Edit</Link>
              <Link onClick={() => deleteProduct(product)}>Delete</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
