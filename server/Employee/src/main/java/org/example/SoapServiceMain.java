package org.example;

import org.example.services.EmployeeService;

import jakarta.xml.ws.Endpoint;

public class SoapServiceMain {
    public static void main(String[] args) {
        // Adresse de publication du service SOAP
        String address = "http://localhost:8080/employeeService";

        // Création et publication du service SOAP
            EmployeeService employeeService = new EmployeeService(); // Utilisez l'implémentation du service
        Endpoint.publish(address, employeeService);

        System.out.println("Employee SOAP Service is published at " + address);
    }
}
