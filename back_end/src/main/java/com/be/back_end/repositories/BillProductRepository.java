package com.be.back_end.repositories;

import com.be.back_end.entities.BillProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillProductRepository extends JpaRepository<BillProductEntity, Integer> {
    public List<BillProductEntity> findByBillId(int billId);
}
