import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(_input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return mapOutput(products)
    }
}

function mapOutput(products: ProductInterface[]): OutputListProductDto {
    return {
        products: products.map((p) => {
            return {
                id: p.id,
                name: p.name,
                price: p.price
            }
        })
    }
}
