package com.be.back_end.services.interfaces;

import com.be.back_end.entities.ProductEntity;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    public List<ProductEntity> getProductByKeyword(String keyword);

    public Optional<ProductEntity> getOneProductById(int productId);

    public void saveProduct(ProductEntity product);

    public void deleteProduct(ProductEntity product);
}
