package com.be.back_end.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "bill_products")
@Table(name = "bill_products", schema = "java_spring_boot", catalog = "")
public class BillProductEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "product_id")
    private int productId;
    @Basic
    @Column(name = "bill_id")
    private int billId;
//    @ManyToOne
//    @JoinColumn(name = "product_id", referencedColumnName = "id")
//    private ProductEntity productsByProductId;
//    @ManyToOne
//    @JoinColumn(name = "bill_id", referencedColumnName = "id")
//    private BillEntity billsByBillId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

//    public ProductEntity getProductsByProductId() {
//        return productsByProductId;
//    }
//
//    public void setProductsByProductId(ProductEntity productsByProductId) {
//        this.productsByProductId = productsByProductId;
//    }
//
//    public BillEntity getBillsByBillId() {
//        return billsByBillId;
//    }
//
//    public void setBillsByBillId(BillEntity billsByBillId) {
//        this.billsByBillId = billsByBillId;
//    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }
}
