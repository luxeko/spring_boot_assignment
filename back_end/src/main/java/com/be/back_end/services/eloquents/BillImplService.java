package com.be.back_end.services.eloquents;

import com.be.back_end.entities.BillEntity;
import com.be.back_end.entities.ProductEntity;
import com.be.back_end.repositories.BillRepository;
import com.be.back_end.services.interfaces.IBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class BillImplService implements IBillService {
    @Autowired
    private BillRepository billRepository;

    @Override
    public List<BillEntity> getBillByKeyword(String keyword) {
        return billRepository.findByQuery(keyword);
    }

    @Override
    public Set<ProductEntity> getProductByBillId(int id) {
        return billRepository.findProductByBillId(id);
    }
}
