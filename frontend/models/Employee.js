// models/Employee.js

class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    toXML() {
        return `<Employee>
                    <Name>${this.name}</Name>
                    <Salary>${this.salary}</Salary>
                </Employee>`;
    }
}

module.exports = Employee;
