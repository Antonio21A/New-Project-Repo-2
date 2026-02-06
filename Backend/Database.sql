CREATE SCHEMA `moderntech_solutions_data` ;

CREATE TABLE employee_information (
    employee_id INT PRIMARY KEY,
    name VARCHAR(150),
    position VARCHAR(100),
    department VARCHAR(100),
    salary DECIMAL(10,2),
    employment_history TEXT,
    contact VARCHAR(150)
);

-- Ingest JSON
INSERT INTO employee_information (employee_id, name, position, department, salary, employment_history, contact)
SELECT *
FROM JSON_TABLE(
    CAST(CONVERT(LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\employee_info.json') USING utf8mb4) AS JSON),
    '$.employeeInformation[*]' COLUMNS (
        employee_id INT PATH '$.employeeId',
        name VARCHAR(150) PATH '$.name',
        position VARCHAR(100) PATH '$.position',
        department VARCHAR(100) PATH '$.department',
        salary DECIMAL(10,2) PATH '$.salary',
        employment_history TEXT PATH '$.employmentHistory',
        contact VARCHAR(150) PATH '$.contact'
    )
) AS jt;

-- Create table
CREATE TABLE payroll (
    payroll_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    hours_worked INT,
    leave_deductions INT,
    final_salary DECIMAL(10,2),
    FOREIGN KEY (employee_id) REFERENCES employee_information(employee_id)
);

-- Ingest JSON
INSERT INTO payroll (employee_id, hours_worked, leave_deductions, final_salary)
SELECT *
FROM JSON_TABLE(
    CAST(CONVERT(LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\payroll_data.json') USING utf8mb4) AS JSON),
    '$.payrollData[*]' COLUMNS (
        employee_id INT PATH '$.employeeId',
        hours_worked INT PATH '$.hoursWorked',
        leave_deductions INT PATH '$.leaveDeductions',
        final_salary DECIMAL(10,2) PATH '$.finalSalary'
    )
) AS jt;

-- Create table
CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    attendance_date DATE,
    status VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employee_information(employee_id)
);

-- Ingest JSON using two-level approach
INSERT INTO attendance (employee_id, attendance_date, status)
SELECT 
    a.employeeId,
    att.date,
    att.status
FROM JSON_TABLE(
    CAST(CONVERT(LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\attendance.json') USING utf8mb4) AS JSON),
    '$.attendanceAndLeave[*]' 
    COLUMNS (
        employeeId INT PATH '$.employeeId',
        attendance JSON PATH '$.attendance'
    )
) AS a
JOIN JSON_TABLE(a.attendance, '$[*]' 
    COLUMNS (
        date DATE PATH '$.date',
        status VARCHAR(50) PATH '$.status'
    )
) AS att;

-- Create table
CREATE TABLE leave_requests (
    leave_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    leave_date DATE,
    reason VARCHAR(150),
    status VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employee_information(employee_id)
);

-- Ingest JSON (flatten nested array)
INSERT INTO leave_requests (employee_id, leave_date, reason, status)
SELECT 
    a.employeeId,
    lr.date,
    lr.reason,
    lr.status
FROM JSON_TABLE(
    CAST(CONVERT(LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\attendance.json') USING utf8mb4) AS JSON),
    '$.attendanceAndLeave[*]' 
    COLUMNS (
        employeeId INT PATH '$.employeeId',
        leaveRequests JSON PATH '$.leaveRequests'
    )
) AS a
JOIN JSON_TABLE(a.leaveRequests, '$[*]' 
    COLUMNS (
        date DATE PATH '$.date',
        reason VARCHAR(150) PATH '$.reason',
        status VARCHAR(50) PATH '$.status'
    )
) AS lr;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insert your admin user
INSERT INTO users (username, password)
VALUES ('admin', 'admin123');

