package com.be.back_end.repositories;

import com.be.back_end.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    @Query("SELECT p from products p where concat(p.id, p.productCode, p.productName, p.price, p.quantity, p.description, p.createdAt) like %?1%")
    public List<ProductEntity> findByQuery(String keyword);
}
