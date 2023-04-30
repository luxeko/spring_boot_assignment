package com.be.back_end.controllers;

import com.be.back_end.dto.ProductThumbnailDTO;
import com.be.back_end.dto.ResponseDTO;
import com.be.back_end.dto.UpdateQuantity;
import com.be.back_end.entities.ProductEntity;
import com.be.back_end.entities.ProductThumbnailsEntity;
import com.be.back_end.repositories.ProductThumbnailRepository;
import com.be.back_end.services.eloquents.ProductImplService;
import com.be.back_end.services.eloquents.ProductThumbnailImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/products")
public class ProductController {
    @Autowired
    private ProductImplService productImplService;
    @Autowired
    private ProductThumbnailImplService productThumbnailImplService;


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

    @PostMapping(value = "thumbnail/upload")
    public ResponseEntity<?> uploadThumbnail(@RequestParam("thumbnail") MultipartFile file) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            String thumbnailDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/products/thumbnail/")
                    .path(Objects.requireNonNull(file.getOriginalFilename()))
                    .toUriString();
            String mess = productThumbnailImplService.store(file);
            responseDTO.setCode("200");
            responseDTO.setStatus("SUCCESS");
            responseDTO.setMessage(mess);
            responseDTO.setData(thumbnailDownloadUri);
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            responseDTO.setCode("404");
            responseDTO.setStatus("FAIL");
            responseDTO.setMessage("Could not upload the file: " + file.getOriginalFilename() + "!");
            responseDTO.setData(null);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(responseDTO);
        }
    }

    @GetMapping(value = "thumbnail")
    public ResponseEntity<?> getListThumbnails() {
        ResponseDTO responseDTO = new ResponseDTO();
        List<ProductThumbnailDTO> thumbnails = productThumbnailImplService.getAllFiles().map(dbFile -> {
            String thumbnailDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/products/thumbnail/")
                    .path(dbFile.getThumbnailName())
                    .toUriString();
            return new ProductThumbnailDTO(
                    dbFile.getId(),
                    dbFile.getThumbnailName(),
                    thumbnailDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());
        responseDTO.setCode("200");
        responseDTO.setStatus("SUCCESS");
        responseDTO.setMessage("");
        responseDTO.setData(thumbnails);
        return ResponseEntity.ok(responseDTO);
    }
    @GetMapping(value = "thumbnail/{name}")
    public ResponseEntity<?> getThumbnail(@PathVariable String name) {
        byte[] thumbnail = productThumbnailImplService.downloadThumbnail(name);
        return ResponseEntity.ok().contentType(MediaType.valueOf("image/png")).body(thumbnail);
    }
}
