package com.be.back_end.services.eloquents;

import com.be.back_end.entities.ProductEntity;
import com.be.back_end.repositories.ProductRepository;
import com.be.back_end.services.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductImplService implements IProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductEntity> getProductByKeyword(String keyword) {
        return productRepository.findByQuery(keyword);
    }

    @Override
    public Optional<ProductEntity> getOneProductById(int productId) {
        return productRepository.findById(productId);
    }

    @Override
    public void saveProduct(ProductEntity product) {
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(ProductEntity product) {
        productRepository.delete(product);
    }
}
