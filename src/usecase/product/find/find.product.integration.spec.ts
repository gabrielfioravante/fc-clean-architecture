import FindProductUseCase from "./find.product.usecase";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe('Integration test find product use case', () => {
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

    it('should find a customer', async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const newProduct = ProductFactory.create('a', 'Product', 100);
        await productRepository.create(newProduct);

        const output = await findProductUseCase.execute({
            id: newProduct.id
        });

        expect(output).toEqual({
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price
        })
    })
})
