import { OrderStore, Order } from '../../models/order';
import { UserStore, User } from '../../models/user';
import { ProductStore, Product } from '../../models/product';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe("Order Model", () => {
  let userId: number;
  let productId: number;
  let orderId: string;

  // قبل البدء بالاختبارات، نحتاج لإنشاء مستخدم ومنتج لربط الطلب بهما
  beforeAll(async () => {
    const user: User = await userStore.create({
      firstName: 'Test',
      lastName: 'User',
      password: 'password123'
    });
    userId = user.id as number;

    const product: Product = await productStore.create({
      name: 'Test Product',
      price: 100,
      category: 'test'
    });
    productId = product.id as number;
  });

  it('should have a currentOrder method', () => {
    expect(orderStore.currentOrder).toBeDefined();
  });

  it('should have an addProduct method', () => {
    expect((orderStore as any).addProduct).toBeDefined();
  });

  it('create method should add an order', async () => {
    // سنقوم بإنشاء طلب جديد (تأكدي أن لديك ميثود create في موديل Order)
    // إذا لم يكن لديك ميثود create، يمكن إضافتها للموديل بسهولة
    const result: Order = await orderStore.create({
      user_id: userId,
      status: 'active'
    });
    orderId = (result.id as number).toString();
    expect(result.user_id).toEqual(userId);
    expect(result.status).toEqual('active');
  });

  it('currentOrder method should return the active order for a user', async () => {
    const result: Order = await orderStore.currentOrder(userId);
    expect(result.status).toEqual('active');
    expect(result.user_id).toEqual(userId);
  });

  it('addProduct method should add a product to an order', async () => {
    // هذا هو الاختبار الفعلي لإضافة منتج للطلبية (جدول order_products)
    const quantity = 5;
    const result = await orderStore.addProduct(quantity, orderId, productId.toString());
    
    expect(result.quantity).toEqual(quantity);
    expect(Number(result.order_id)).toEqual(Number(orderId));
    expect(Number(result.product_id)).toEqual(Number(productId));
  });
});