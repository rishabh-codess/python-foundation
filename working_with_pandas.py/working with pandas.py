import pandas as pd
data = {
    'Employee_ID': [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],
    'Name': ['Alice Smith', 'Bob Jones', 'Charlie Brown', 'Diana Prince', 'Evan Wright', 
             'Fiona Gallagher', 'George Clark', 'Hannah Abbott', 'Ian Malcolm', 'Julia Roberts',
             'Kevin Hart', 'Laura Croft', 'Mike Ross', 'Nina Nina', 'Oscar Isaac'],
    'Department': ['Sales', 'Engineering', 'Engineering', 'HR', 'Sales', 
                   'Marketing', 'Engineering', 'HR', 'Marketing', 'Sales', 
                   'Engineering', 'Marketing', 'Sales', 'HR', 'Engineering'],
    'Salary': [55000, 85000, 92000, 61000, 58000, 67000, 88000, 59000, 71000, 63000, 95000, 73000, 52000, 60000, 102000],
    'Years_Experience': [2, 5, 7, 3, 2, 4, 6, 3, 5, 4, 8, 5, 1, 3, 10],
    'Performance_Score': [85, 90, None, 88, 79, 92, 95, 81, 89, 91, 98, 86, 75, 83, 97]
}
df= pd.DataFrame(data)
print("=== FIRST 10 ROWS ===")
print(df.head(10))