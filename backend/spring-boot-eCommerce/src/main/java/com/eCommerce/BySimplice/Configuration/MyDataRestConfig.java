package com.eCommerce.BySimplice.Configuration;


import com.eCommerce.BySimplice.Entities.Country;
import com.eCommerce.BySimplice.Entities.Product;
import com.eCommerce.BySimplice.Entities.ProductCategory;
import com.eCommerce.BySimplice.Entities.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
//import javax.persistence.metamodel.EntityType;
//import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig  implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        this.entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.POST,HttpMethod.DELETE,HttpMethod.PUT };
        //disable methods for product : POST PUT and DELETE
        disableHttpMethods(Product.class,config, theUnsupportedActions);

        //disable methods for productCategory : POST PUT and DELETE
        disableHttpMethods(ProductCategory.class,config, theUnsupportedActions);

        //disable methods for country : POST PUT and DELETE
        disableHttpMethods(Country.class,config, theUnsupportedActions);

        //disable methods for state : POST PUT and DELETE
        disableHttpMethods(State.class,config, theUnsupportedActions);


        //call an helper method to expose the Ids
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withAssociationExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity ids
        //

        // - get a list of all entity classes from the entity manager

        Set<javax.persistence.metamodel.EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType<?> tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
            System.out.println(tempEntityType.getJavaType().toString());
        }

        // - expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }


}
