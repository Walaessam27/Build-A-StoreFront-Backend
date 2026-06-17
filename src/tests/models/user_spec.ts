import { UserStore, User } from '../../models/user';

type UserStoreWithShow = UserStore & { show(id: string): Promise<User> };

const store = new UserStore() as UserStoreWithShow;

describe("User Model", () => {
  let userId: number;

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result: User = await store.create({
      firstName: 'Ahmad',
      lastName: 'Ali',
      password: 'password123'
    });
    userId = result.id as number;
    expect(result.firstName).toEqual('Ahmad');
    expect(result.lastName).toEqual('Ali');
  });

  it('index method should return a list of users', async () => {
    const result: User[] = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct user', async () => {
    const result: User = await store.show(userId.toString());
    expect(result.firstName).toEqual('Ahmad');
  });
});