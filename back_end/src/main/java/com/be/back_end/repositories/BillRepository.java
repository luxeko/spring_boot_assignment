package com.be.back_end.repositories;

import com.be.back_end.entities.BillEntity;
import com.be.back_end.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BillRepository extends JpaRepository<BillEntity, Integer> {
    @Query("SELECT b from bills b where concat(b.id, b.billCode, b.total, b.customerName, b.customerEmail, b.customerAddress, " +
            "b.customerPhone, b.createdAt) like %?1%")
    public List<BillEntity> findByQuery(String keyword);

    @Query("SELECT p from products p join bill_products bp on p.id = bp.productId join bills b on bp.billId = b.id where b.id = ?1")
    public Set<ProductEntity> findProductByBillId(@Param("id") int id);
}
