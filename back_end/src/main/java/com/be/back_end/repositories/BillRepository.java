package com.be.back_end.repositories;

import com.be.back_end.entities.BillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BillRepository extends JpaRepository<BillEntity, Integer> {
    @Query("SELECT b from bills b where concat(b.id, b.billCode, b.total, b.subtotal, b.customerName, b.customerEmail, b.customerAddress, " +
            "b.customerPhone, b.createdAt) like %?1%")
    public List<BillEntity> findByQuery(String keyword);

}
