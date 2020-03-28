package com.eCommerce.BySimplice.Dao;

import com.eCommerce.BySimplice.Entities.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product_category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
