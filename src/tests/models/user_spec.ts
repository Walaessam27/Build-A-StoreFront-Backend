import { UserStore, User } from '../../models/user';

const store = new UserStore();

describe("User Model", () => {
  let userId: number;

  // تعريف دوال الموديل للتأكد من وجودها
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  // اختبار الإنشاء
  it('create method should add a user', async () => {
    const result: User = await store.create({
      firstName: 'Ahmad',
      lastName: 'Ali',
      password: 'password123'
    });
    userId = result.id as number;
    // الآن لن تعود undefined لأننا استخدمنا AS في الموديل
    expect(result.firstName).toEqual('Ahmad');
    expect(result.lastName).toEqual('Ali');
  });

  // اختبار العرض الكلي
  it('index method should return a list of users', async () => {
    const result: User[] = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  // اختبار عرض مستخدم واحد (حل مشكلة الـ 404)
  it('show method should return the correct user', async () => {
    const result: User = await store.show(userId.toString());
    expect(result.firstName).toEqual('Ahmad');
    expect(result.lastName).toEqual('Ali');
  });
});