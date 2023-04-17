package com.be.back_end.repositories;

import com.be.back_end.entities.BillProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillProductRepository extends JpaRepository<BillProductEntity, Integer> {
}
