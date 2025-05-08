'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../page';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

const EachProduct = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const { id } = params;
  const { setCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState<number>(1);

  const fetchdata = async () => {
    const res = await fetch(`/api/product/${id}`);
    const resJson = await res.json();
    setProduct(resJson);
    return resJson;
  };

  useEffect(() => {
    fetchdata();
  }, [id]);

  const gotocart = async () => {
    const res = await fetch(`/api/product/${id}`);
    const resJson: Product = await res.json();
    resJson.quantity = count;

    setCart((prevCart) => {
      const alreadyInCart = prevCart.findIndex((each) => each.id === id);
      if (alreadyInCart !== -1) {
        const updateCart = [...prevCart];
        const qty = updateCart[alreadyInCart].quantity!;
        updateCart[alreadyInCart] = { ...updateCart[alreadyInCart], quantity: qty + count };
        return updateCart;
      } else {
        return [...prevCart, resJson];
      }
    });

    return resJson;
  };

  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1 py-10">
        <div className="flex justify-center items-center bg-gray-100 p-8 rounded-lg">
          {product && (
            <Image
              className="object-contain max-h-[400px]"
              src={product.image}
              alt="product-image"
              width={350}
              height={350}
            />
          )}
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-[#3e4c59]">{product?.title}</h1>
          <p className="text-2xl text-[#171f46] font-semibold">₹{product?.price}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-[#3b82f6] px-3 py-1 text-white rounded-md">
              <p>{product?.rating.rate}</p>
              <Star className="size-4" />
            </div>
            <p className="text-gray-600">{product?.rating.count} Reviews</p>
          </div>
          <p className="text-gray-700 text-lg">{product?.description}</p>
          <p>
            <span className="font-semibold">Available:</span>{' '}
            <span className="text-gray-600">In Stock</span>
          </p>
          <p>
            <span className="font-semibold">Brand:</span>{' '}
            <span className="text-gray-600">Mufti</span>
          </p>
          <div className="flex items-center gap-4">
            <button
              className="p-2 px-3 bg-slate-100 rounded"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
            >
              −
            </button>
            <span className="text-lg text-gray-700">{count}</span>
            <button className="p-2 px-3 bg-slate-100 rounded" onClick={() => setCount(count + 1)}>
              +
            </button>
          </div>
          <Button onClick={gotocart} className="bg-[#3b82f6] px-6 text-white hover:bg-blue-600">
            Add to Cart
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default EachProduct;
