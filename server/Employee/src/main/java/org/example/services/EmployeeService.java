package org.example.services;

import jakarta.jws.WebMethod;
import jakarta.jws.WebService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.model.Employee;

import java.util.List;

@WebService
@Path("/employees")
public class EmployeeService {
    private EmployeeServiceImpl employeeService;

    public EmployeeService() {
        this.employeeService = new EmployeeServiceImpl();
    }

    @WebMethod
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createEmployee(Employee employee) {
        System.out.println(employee.getName());
        employeeService.createEmployee(employee);
    }




    @WebMethod
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Employee getEmployeeById(@PathParam("id") int id) {
        System.out.println("URL de la requête : /employees/" + id);

        return employeeService.getEmployeeById(id);
    }






    @WebMethod
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateEmployee(@PathParam("id") int id, Employee updatedEmployee) {
        employeeService.updateEmployee(id, updatedEmployee);
    }

    @WebMethod
    @DELETE
    @Path("/{id}")
    public void deleteEmployee(@PathParam("id") int id) {
        employeeService.deleteEmployee(id);
    }

    @WebMethod
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
}
