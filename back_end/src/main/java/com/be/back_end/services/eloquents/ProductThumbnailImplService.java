package com.be.back_end.services.eloquents;

import com.be.back_end.entities.ProductThumbnailsEntity;
import com.be.back_end.repositories.ProductThumbnailRepository;
import com.be.back_end.services.interfaces.IProductThumbnailService;
import com.be.back_end.utils.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@Transactional
public class ProductThumbnailImplService implements IProductThumbnailService {
    @Autowired
    private ProductThumbnailRepository productThumbnailRepository;

    @Override
    public String store(MultipartFile file) throws IOException {
        ProductThumbnailsEntity thumbnail = productThumbnailRepository.save(ProductThumbnailsEntity.builder().thumbnailName(file.getOriginalFilename()).type(file.getContentType()).data(ImageUtil.compressImage(file.getBytes())).build());
        if (thumbnail != null) {
            return "Thumbnail uploaded successfully: " + file.getOriginalFilename();
        }
        return null;
    }

    @Override
    public Stream<ProductThumbnailsEntity> getAllFiles() {
        return productThumbnailRepository.findAll().stream();
    }

    @Override
    public byte[] downloadThumbnail(String thumbnailName) {
        Optional<ProductThumbnailsEntity> op = productThumbnailRepository.findByThumbnailName(thumbnailName);
        return ImageUtil.decompressImage(op.get().getData());
    }
}
