package com.eCommerce.BySimplice.Configuration;


import com.eCommerce.BySimplice.Entities.Product;
import com.eCommerce.BySimplice.Entities.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class MyDataRestConfig  implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.POST,HttpMethod.DELETE,HttpMethod.PUT };
        //disable methods for product : POST PUT and DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withAssociationExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        //disable methods for productCategory : POST PUT and DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withAssociationExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }
}
