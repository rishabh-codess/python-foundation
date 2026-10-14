from dataclasses import dataclass, field


@dataclass
class Employee:
  name: str
  department: str
  salary: float
  skills: list = field(default_factory=list)


# Automatically gets a clean initializer and string representation
emp = Employee("Alice", "Engineering", 95000.0, ["Python", "Docker"])
print(emp)
