import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create('a', 'Product 1', 100);
const product2 = ProductFactory.create('b', 'Product 2', 100);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test for listing product use case", () => {
    it('should list products', async () => {
        const productRepository = MockRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        const { products } = await listProductUseCase.execute({});

        expect(products).toHaveLength(2);

        expect(products[0].id).toEqual(product1.id)
        expect(products[0].name).toEqual(product1.name)
        expect(products[0].price).toEqual(product1.price)

        expect(products[1].id).toEqual(product2.id)
        expect(products[1].name).toEqual(product2.name)
        expect(products[1].price).toEqual(product2.price)
    })
})
