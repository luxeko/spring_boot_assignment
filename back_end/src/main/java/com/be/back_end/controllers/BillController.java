package com.be.back_end.controllers;

import com.be.back_end.dto.ResponseDTO;
import com.be.back_end.entities.BillEntity;
import com.be.back_end.entities.BillProductEntity;
import com.be.back_end.entities.ProductEntity;
import com.be.back_end.services.eloquents.BillImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/bills")
public class BillController {
    @Autowired
    private BillImplService billImplService;

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
        Set<ProductEntity> products = billImplService.getProductByBillId(id);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setCode("200");
        responseDTO.setStatus("SUCCESS");
        responseDTO.setMessage("");
        responseDTO.setData(products);
        return ResponseEntity.ok(responseDTO);
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
