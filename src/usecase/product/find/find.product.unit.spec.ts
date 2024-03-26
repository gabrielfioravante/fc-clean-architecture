import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create('a', 'Product Test', 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test find customer use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository()
        const findProductUseCase = new FindProductUseCase(productRepository);

        const result = await findProductUseCase.execute({ id: product.id })

        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })

    it("should throw a error when product is not found", async () => {
        const productRepository = MockRepository()

        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        })

        const findProductUseCase = new FindProductUseCase(productRepository);
        await expect(findProductUseCase.execute({ id: product.id })).rejects.toThrow("Product not found")
    })
})


