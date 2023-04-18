package com.be.back_end.repositories;

import com.be.back_end.entities.ProductThumbnailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductThumbnailRepository extends JpaRepository<ProductThumbnailsEntity, String> {
    public Optional<ProductThumbnailsEntity> findByThumbnailName(String name);
}
