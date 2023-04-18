package com.be.back_end.dto;

import java.util.Date;
import java.util.List;

public class BillDTO {
    private int id;
    private String customerName;
    private String customerAddress;
    private String customerPhone;
    private String customerEmail;
    private String billCode;
    private int total;
    private Double subtotal;
    private Date createdAt;
    private List<BillProductDTO> products;

    public BillDTO() {
    }

    public BillDTO(int id, String customerName, String customerAddress, String customerPhone, String customerEmail, String billCode, int total, Double subtotal, Date createdAt, List<BillProductDTO> products) {
        this.id = id;
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.customerPhone = customerPhone;
        this.customerEmail = customerEmail;
        this.billCode = billCode;
        this.total = total;
        this.subtotal = subtotal;
        this.createdAt = createdAt;
        this.products = products;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<BillProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<BillProductDTO> products) {
        this.products = products;
    }
}
