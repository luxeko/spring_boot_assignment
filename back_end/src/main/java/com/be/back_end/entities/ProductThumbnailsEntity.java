package com.be.back_end.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity(name = "product_thumbnails")
@Table(name = "product_thumbnails", schema = "java_spring_boot", catalog = "")
@Data
@AllArgsConstructor
@Builder
public class ProductThumbnailsEntity {
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Id
    @Column(name = "id")
    private String id;
    @Basic
    @Column(name = "thumbnail_name")
    private String thumbnailName;
    @Basic
    @Column(name = "type")
    private String type;
    @Lob
    @Column(name = "data", length = 1000)
    private byte[] data;

    public ProductThumbnailsEntity() {
    }

    public ProductThumbnailsEntity(String thumbnailName, String type, byte[] data) {
        this.thumbnailName = thumbnailName;
        this.type = type;
        this.data = data;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getThumbnailName() {
        return thumbnailName;
    }

    public void setThumbnailName(String thumbnailName) {
        this.thumbnailName = thumbnailName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
