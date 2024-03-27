import UpdateProductUseCase from "./update.product.usecase";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe('Integration test update product use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should update a customer', async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const newProduct = ProductFactory.create('a', 'Product', 100);
        await productRepository.create(newProduct);

        newProduct.changeName('New name');
        newProduct.changePrice(200);

        const output = await updateProductUseCase.execute({
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price
        });

        expect(output).toEqual({
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price
        })
    })
})
