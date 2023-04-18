package com.be.back_end.controllers;

import com.be.back_end.dto.BillDTO;
import com.be.back_end.dto.BillProductDTO;
import com.be.back_end.dto.ResponseDTO;
import com.be.back_end.entities.BillEntity;
import com.be.back_end.entities.BillProductEntity;
import com.be.back_end.entities.ProductEntity;
import com.be.back_end.repositories.BillProductRepository;
import com.be.back_end.repositories.BillRepository;
import com.be.back_end.repositories.ProductRepository;
import com.be.back_end.services.eloquents.BillImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/bills")
public class BillController {
    @Autowired
    private BillImplService billImplService;
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BillProductRepository billProductRepository;
    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam String keyword) {
        ResponseDTO responseDTO = new ResponseDTO();
        List<BillEntity> ls = billImplService.getBillByKeyword(keyword);
        if (ls.size() != 0) {
            responseDTO.setCode("200");
            responseDTO.setStatus("SUCCESS");
            responseDTO.setMessage("");
            responseDTO.setData(ls);
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> listProduct(@PathVariable("id") int id) {
        ResponseDTO responseDTO = new ResponseDTO();
        BillDTO billDTO;
        List<BillProductDTO> listProduct = new ArrayList<>();

        // lấy dữ liệu ở bảng trung gian giữa products <-> bills thông qua bill_id
        List<BillProductEntity> billProductEntity = billProductRepository.findByBillId(id);
        for (BillProductEntity bp : billProductEntity) {
            // tìm product thông qua product_id ở bảng trung gian
            Optional<ProductEntity> op = productRepository.findById(bp.getProductId());
            if (op.isPresent()) {
                ProductEntity product = op.get();
                // gán các thuộc tính cần thiết từ product vào BillProductDTO
                BillProductDTO billProductDTO = new BillProductDTO(product.getId(), product.getProductCode(), product.getProductName(), product.getPrice(), bp.getQuantityOrder());

                // mỗi lần tạo xong 1 BillProductDTO thì thêm vào listProduct
                listProduct.add(billProductDTO);
            }
        }

        // Lấy dữ liệu bill thông quan bill_id
        Optional<BillEntity> op = billRepository.findById(id);
        if (op.isPresent()) {
            BillEntity bill = op.get();

            // gán thông các dữ liệu cần thiết từ bill vào billDTO
            billDTO = new BillDTO(bill.getId(),
                    bill.getCustomerName(),
                    bill.getCustomerAddress(),
                    bill.getCustomerPhone(),
                    bill.getCustomerEmail(),
                    bill.getBillCode(),
                    bill.getTotal(),
                    bill.getSubtotal(),
                    bill.getCreatedAt(),
                    listProduct);
            responseDTO.setCode("200");
            responseDTO.setStatus("SUCCESS");
            responseDTO.setMessage("Create bill successfully");
            responseDTO.setData(billDTO);
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.noContent().build();
    }
    @PostMapping(value = "")
    public ResponseEntity<?> save(@RequestBody BillEntity bill) {
        ResponseDTO responseDTO = new ResponseDTO();
        billImplService.saveBill(bill);
        responseDTO.setCode("200");
        responseDTO.setStatus("SUCCESS");
        responseDTO.setMessage("Create bill successfully");
        responseDTO.setData(bill);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping(value = "/bill-products")
    public ResponseEntity<?> createBillProducts(@RequestBody BillProductEntity billProductEntity) {
        ResponseDTO responseDTO = new ResponseDTO();
        billImplService.saveBillProducts(billProductEntity);
        responseDTO.setCode("200");
        responseDTO.setStatus("SUCCESS");
        responseDTO.setMessage("Create bill products successfully");
        responseDTO.setData(billProductEntity);
        return ResponseEntity.ok(responseDTO);
    }
}
