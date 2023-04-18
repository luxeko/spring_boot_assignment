package com.be.back_end.controllers;

import com.be.back_end.dto.ResponseDTO;
import com.be.back_end.dto.UpdateQuantity;
import com.be.back_end.entities.ProductEntity;
import com.be.back_end.services.eloquents.ProductImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/products")
public class ProductController {
    @Autowired
    private ProductImplService productImplService;

    @GetMapping(value = "")
    public ResponseEntity<?> index(@RequestParam(value = "keyword", required = false) String keyword) {
        List<ProductEntity> ls = productImplService.getProductByKeyword(keyword);
        ResponseDTO responseDTO = new ResponseDTO();
        if (ls.size() == 0) {
            return ResponseEntity.noContent().build();
        }
        responseDTO.setCode("200");
        responseDTO.setStatus("SUCCESS");
        responseDTO.setMessage("");
        responseDTO.setData(ls);
        return ResponseEntity.ok(responseDTO);
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") int id) {
        Optional<ProductEntity> op = productImplService.getOneProductById(id);
        if (op.isPresent()) {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setCode("200");
            responseDTO.setStatus("SUCCESS");
            responseDTO.setMessage("");
            responseDTO.setData(op.get());
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping(value = "")
    public ResponseEntity<?> delete(@RequestParam int id) {
        Optional<ProductEntity> op = productImplService.getOneProductById(id);
        if (op.isPresent()) {
            ResponseDTO responseDTO = new ResponseDTO();
            productImplService.deleteProduct(op.get());
            responseDTO.setCode("200");
            responseDTO.setStatus("SUCCESS");
            responseDTO.setMessage("Delete product successfully");
            responseDTO.setData(null);
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping(value = "")
    public ResponseEntity<?> save(@RequestBody ProductEntity product) {
        ResponseDTO responseDTO = new ResponseDTO();
        productImplService.saveProduct(product);
        responseDTO.setCode("200");
        responseDTO.setStatus("SUCCESS");
        responseDTO.setMessage("Create product successfully");
        responseDTO.setData(product);
     
        return ResponseEntity.ok(responseDTO);
    }
    @PutMapping(value = "")
    public ResponseEntity<?> update(@RequestParam int id, @RequestBody ProductEntity product) {
        Optional<ProductEntity> op = productImplService.getOneProductById(id);
        ResponseDTO responseDTO = new ResponseDTO();
        if(op.isPresent()) {
            productImplService.saveProduct(product);
            responseDTO.setCode("200");
            responseDTO.setStatus("SUCCESS");
            responseDTO.setMessage("Update product successfully");
            responseDTO.setData(product);
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping(value = "update-quantity")
    public ResponseEntity<?> updateQuantity(@RequestParam int id, @RequestBody UpdateQuantity request) {
        ResponseDTO response = new ResponseDTO();
        boolean check = productImplService.updateQuantity(request.getQuantity(), request.getId());
        if (check) {
            response.setCode("200");
            response.setStatus("SUCCESS");
            response.setMessage("Update product successfully");
        } else {
            response.setCode("500");
            response.setStatus("ERROR");
            response.setMessage("Some thing wrong !!!");
        }

        return ResponseEntity.ok(response);
    }
}
