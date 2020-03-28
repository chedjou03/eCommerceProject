package com.eCommerce.BySimplice.Dao;


import com.eCommerce.BySimplice.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
