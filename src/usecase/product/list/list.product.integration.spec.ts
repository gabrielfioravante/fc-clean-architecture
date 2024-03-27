import ListProductUseCase from "./list.product.usecase";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe('Integration test list product use case', () => {
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

    it('should list a customer', async () => {
        const productRepository = new ProductRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        const newProduct1  = ProductFactory.create('a', 'Product 1', 100);
        const newProduct2 = ProductFactory.create('a', 'Product 2', 100);

        await productRepository.create(newProduct1);
        await productRepository.create(newProduct2);

        const { products } = await listProductUseCase.execute({});

        expect(products).toHaveLength(2);

        expect(products[0].id).toEqual(newProduct1.id);
        expect(products[0].name).toEqual(newProduct1.name);
        expect(products[0].price).toEqual(newProduct1.price);

        expect(products[1].id).toEqual(newProduct2.id);
        expect(products[1].name).toEqual(newProduct2.name);
        expect(products[1].price).toEqual(newProduct2.price);
    })
})
