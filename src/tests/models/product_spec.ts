/// <reference types="jest" />
import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'Test Product',
      price: 100,
      category: 'test'
    });
    expect(result.name).toEqual('Test Product');
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result.id).toEqual(1);
  });
});