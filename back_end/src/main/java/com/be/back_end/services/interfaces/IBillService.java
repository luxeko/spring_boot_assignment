package com.be.back_end.services.interfaces;

import com.be.back_end.entities.BillEntity;
import com.be.back_end.entities.BillProductEntity;
import com.be.back_end.entities.ProductEntity;

import java.util.List;
import java.util.Set;

public interface IBillService {
    public List<BillEntity> getBillByKeyword(String keyword);

    public Set<ProductEntity> getProductByBillId(int id);
    public void saveBill(BillEntity bill);
    public void saveBillProducts(BillProductEntity billProductEntity);
}
