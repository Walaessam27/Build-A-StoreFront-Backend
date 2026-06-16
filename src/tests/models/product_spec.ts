import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'Test Product',
      price: 10,
      category: 'test'
    });
    expect(result.name).toEqual('Test Product');
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });
});
