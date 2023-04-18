package com.be.back_end.services.eloquents;

import com.be.back_end.entities.BillEntity;
import com.be.back_end.entities.BillProductEntity;
import com.be.back_end.entities.ProductEntity;
import com.be.back_end.repositories.BillProductRepository;
import com.be.back_end.repositories.BillRepository;
import com.be.back_end.services.interfaces.IBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class BillImplService implements IBillService {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private BillProductRepository billProductRepository;
    @Override
    public List<BillEntity> getBillByKeyword(String keyword) {
        return billRepository.findByQuery(keyword);
    }

    @Override
    public Optional<BillEntity> getProductByBillId(int id) {
        return billRepository.findById(id);
    }

    @Override
    public void saveBill(BillEntity bill) {
        billRepository.save(bill);
    }

    @Override
    public void saveBillProducts(BillProductEntity billProductEntity) {
        billProductRepository.save(billProductEntity);
    }
}
