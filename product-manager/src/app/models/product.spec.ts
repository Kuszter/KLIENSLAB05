import { Product } from './product';

const productData = {
  id: 1,
  title: 'Test Product',
  description: 'Test Product Description',
  price: 100,
  discountPercentage: 10,
  rating: 4,
  stock: 5,
  brand: 'Test Brand',
  category: 'Test Category',
  thumbnail: 'https://example.com/thumbnail.jpg',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
  ],
};


import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(productData)).toBeTruthy();
  });
});

