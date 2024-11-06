import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { getById, update, add } from '../../services/productservice';
import classes from './productedit.module.css';
import Title from '../../components/HTML_DOM/title';
import InputContainer from '../../components/HTML_DOM/inputcontainer';
import Input from '../../components/HTML_DOM/input';
import Button from '../../components/HTML_DOM/button';
import { uploadImage } from '../../services/uploadservice';
import { toast } from 'react-toastify';

export default function ProductEdit() {

  const {productId} = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!productId;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: {errors},
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(productId).then(product => {
      if (!product) return;
      reset(product);
      setImageUrl(product.imageUrl);
    });
  }, [productId]);

  const submit = async productData => {
    const product = {...productData, imageUrl};

    if (isEditMode) {
      await update(product);
      toast.success(`Product "${product.name}" updated successfully !`);
      return;
    }

    const newProduct = await add(product);
    toast.success(`Product "${product.name}" added successfully !`);

    navigate('/admin/editProduct/' + newProduct.id, {replace: true});
  };

  const upload = async event => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit Product' : 'Add Product'} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <InputContainer label="Select Image">
            <input type='file' onChange={upload} accept='image/jpeg, image/png' />
          </InputContainer>

          {imageUrl && (
            <a href={imageUrl} className={classes.image_link}
              target='blank'
            >
              <img src={imageUrl} alt='Uploaded' />
            </a>
          )}

          <Input type="text" label="Name"
            {...register('name', {required: true, minLength: 5})}
            error={errors.name} 
          />

          <Input type="number" label="Price"
            {...register('price', {required: true, })}
            error={errors.price} 
          />

          <Input type="text" label="Tags"
            {...register('tags')}
            error={errors.tags} 
          />

          <Input type="text" label="Origins"
            {...register('origins', {required: true,})}
            error={errors.origins} 
          />

          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  )
}
