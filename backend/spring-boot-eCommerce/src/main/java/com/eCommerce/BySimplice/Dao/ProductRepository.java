package com.eCommerce.BySimplice.Dao;


import com.eCommerce.BySimplice.Entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long> {

    Page<Product> findByCategoryId(@RequestParam("Id") Long Id, Pageable pageable);

}
