package org.example;


import org.example.services.EmployeeRestService;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;

    public class RestServiceMain {
        public static void main(String[] args) throws Exception {

            URI baseURI = URI.create("http://localhost:8081/");
            ResourceConfig config = new ResourceConfig(EmployeeRestService.class);
            GrizzlyHttpServerFactory.createHttpServer(baseURI, config);

            System.out.println("Le server jersey est lance sur "+baseURI);

        }
    }



