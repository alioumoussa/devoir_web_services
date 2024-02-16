package org.example.services;

import org.example.dao.EmployeeDAO;
import org.example.model.Employee;

import java.util.List;

public class EmployeeServiceImpl implements EmployeeServiceInterface {
    private EmployeeDAO employeeDAO;

    public EmployeeServiceImpl() {
        this.employeeDAO = new EmployeeDAO();
    }

    @Override
    public void createEmployee(Employee employee) {
        employeeDAO.createEmployee(employee);
    }

    @Override
    public Employee getEmployeeById(int id) {
        return employeeDAO.getEmployeeById(id);
    }

    @Override
    public void updateEmployee(int id, Employee updatedEmployee) {
        Employee existingEmployee = employeeDAO.getEmployeeById(id);
        if (existingEmployee != null) {
            updatedEmployee.setId(id);
            employeeDAO.updateEmployee(updatedEmployee);
        }
    }

    @Override
    public void deleteEmployee(int id) {
        employeeDAO.deleteEmployee(id);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeDAO.getAllEmployees();
    }
}
