import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { deleteById, getAll, search } from '../../services/productservice';

import NotFound from '../../components/notfound/notfound';
import Title from '../../components/HTML_DOM/title';
import Search from '../../components/Search/search';
import Price from '../../components/price/price';
import Button from '../../components/HTML_DOM/button';
import { toast } from 'react-toastify';

import { AddIcon, StarIcon } from '../../components/icon';

import classes from './productmanagementpage.module.css';

export default function ProductManagementPage() {

  const [products, setProducts] = useState();
  const {searchTerm} = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const loadProducts = async () => {
      const products = searchTerm? await search(searchTerm) : await getAll();
      setProducts(products);
    }

    loadProducts();
  }, [searchTerm]);

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
      <div className={classes.main}>

        <div className={classes.head}>
          <Title title="Quản lý sản phẩm" />

          <div className={classes.search}>
            <Search
              searchRoute="/admin/products"
              defaultRoute="/admin/products"
            />
          </div>

          <Link to="/admin/addProduct" className={classes.add}>
            Thêm sản phẩm <AddIcon />
          </Link>

        </div>

        <Button type="button" text="Trở về" backgroundColor="var(--patone-green)"
          onClick={() => navigate('/dashboard')} />

      </div>

      <div className={classes.list}>

        <ProductsNotFound />

        {products && products.map(product => (
          <div key={product.id} className={classes.list_item}>
            <img src={product.imageUrl} alt={product.name} />
            
            <div>
              <div className={classes.name}>
                <Link to={'/product/' + product.id}>{product.name}</Link>
              </div>

              <div className={classes.rate}>
                <span>Rated: {product.stars}</span>
                
                <div className={classes.star}>
                  <StarIcon sx={{ fontSize: 15}} />
                </div>
              </div>
              <div className={classes.ori}>Xuất xứ: {product.origins.join(', ')}</div>
            </div>

            <div className={classes.des}>{product.description}</div>
            <Price price={product.price} />
            <div className={classes.actions}>
                <Link to={'/admin/editProduct/' + product.id}>Chỉnh sửa</Link>
                <Link onClick={() => deleteProduct(product)}>Xóa</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
