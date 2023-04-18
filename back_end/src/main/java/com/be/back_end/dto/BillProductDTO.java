package com.be.back_end.dto;

public class BillProductDTO {
    private int id;
    private String productCode;
    private String productName;
    private Double price;
    private int quantityOrder;

    public BillProductDTO() {
    }

    public BillProductDTO(int id, String productCode, String productName, Double price, int quantityOrder) {
        this.id = id;
        this.productCode = productCode;
        this.productName = productName;
        this.price = price;
        this.quantityOrder = quantityOrder;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getQuantityOrder() {
        return quantityOrder;
    }

    public void setQuantityOrder(int quantityOrder) {
        this.quantityOrder = quantityOrder;
    }
}
