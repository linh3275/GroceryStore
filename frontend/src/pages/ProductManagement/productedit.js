import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { getById, update, add } from '../../services/productservice';

import Title from '../../components/HTML_DOM/title';
import Button from '../../components/HTML_DOM/button';
import Input from '../../components/HTML_DOM/input';
import InputContainer from '../../components/HTML_DOM/inputcontainer';

import { toast } from 'react-toastify';
import { uploadImage } from '../../services/uploadservice';

import classes from './productedit.module.css';

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
  }, [isEditMode, productId, reset]);

  const submit = async productData => {
    const product = {...productData, id: productId, imageUrl};

    if (isEditMode) {
      await update(product);
      toast.success(`Sản phẩm "${product.name}" đã được cập nhật thành công !`);
    } else {
      await add(product);
      toast.success(`Sản phẩm "${product.name}" đã được thêm thành công !`);
    }

    navigate('/admin/products');
  };

  const upload = async event => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className={classes.container}>
      
      <div className={classes.head}>
        <Title title={isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'} margin="1rem 0 0"/>
        
        <div>
          <Button type="button" text="Trở về" onClick={() => navigate('/admin/products')} />
        </div>
      </div>
        
      <form onSubmit={handleSubmit(submit)} noValidate>
        <div className={classes.content}>

          <div className={classes.img}>

            <InputContainer label="Chọn hình ảnh">
              <input type='file' onChange={upload} accept='image/jpeg, image/png' />
            </InputContainer>

            {imageUrl && (
              <a href={imageUrl} className={classes.image_link}
                target='blank'
              >
                <img src={imageUrl} alt='Uploading' />
              </a>
            )}

            <div className={classes.star}>
              <Input type="number" label="Star" defaultValue={0}
                {...register('stars', { max: 5, })}
                error={errors.stars}
              />
            </div>

          </div>

          <div className={classes.basic}>

            <Input type="text" label="Tên sản phẩm"
              {...register('name', {required: true, minLength: 5})}
              error={errors.name}
            />

            <Input type="number" label="Giá" defaultValue={0}
              {...register('price', {required: true, })}
              error={errors.price}
            />

            <Input type="text" label="Loại sản phẩm"
              {...register('tags')}
              error={errors.tags}
            />

            <Input type="text" label="Xuất xứ"
              {...register('origins', {required: true,})}
              error={errors.origins}
            />

          </div>

          <div className={classes.des}>
            <Input type="text" label="Thông tin sản phẩm"
              {...register('description')}
              textarea={true}
              error={errors.description}
            />
            
            <Button type="submit" text={isEditMode ? 'Cập nhật' : 'Tạo'} />

          </div>
        
        </div>
      </form>
    </div>
  )
}
