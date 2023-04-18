package com.be.back_end.services.interfaces;

import com.be.back_end.entities.ProductThumbnailsEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

public interface IProductThumbnailService {
    public String store(MultipartFile file) throws IOException;

    public Stream<ProductThumbnailsEntity> getAllFiles();
    public byte[] downloadThumbnail(String thumbnailName);
}
