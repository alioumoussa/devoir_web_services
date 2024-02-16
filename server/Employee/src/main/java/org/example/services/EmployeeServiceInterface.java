package org.example.services;

import org.example.model.Employee;

import java.util.List;

public interface EmployeeServiceInterface {
    void createEmployee(Employee employee);
    Employee getEmployeeById(int id);
    void updateEmployee(int id, Employee updatedEmployee);
    void deleteEmployee(int id);
    List<Employee> getAllEmployees();
}

