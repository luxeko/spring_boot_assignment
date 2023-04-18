package com.be.back_end.dto;

import lombok.Data;

@Data
public class ProductThumbnailDTO {
    private String id;
    private String thumbnailName;
    private String thumbnailUrl;
    private String type;
    private long size;

    public ProductThumbnailDTO(String id, String thumbnailName, String thumbnailUrl, String type, long size) {
        this.id = id;
        this.thumbnailName = thumbnailName;
        this.thumbnailUrl = thumbnailUrl;
        this.type = type;
        this.size = size;
    }
}
