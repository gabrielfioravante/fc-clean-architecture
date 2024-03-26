import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product",
    price: 100,
    type: 'a'
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe('Unit test create product use case', () => {
    it('should create a customer o type a', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it('should create a customer o type b', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute({...input, type: 'b', });

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price * 2
        })
    })

    it('should throw an error when name is missing', async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        await expect(productCreateUseCase.execute({...input, name: '' })).rejects.toThrow(
            "Name is required"
        )
    })

    it('should throw an error when price is lower than 0', async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        await expect(createProductUseCase.execute({...input, price: -1 })).rejects.toThrow(
            "Price must be greater than zero"
        )
    })
})
