class Temperature:

  def __init__(self, celsius=0.0):
    self._celsius = celsius

  @property
  def celsius(self):
    return self._celsius

  @celsius.setter
  def celsius(self, value):
    if value < -273.15:
      raise ValueError("Temperature below absolute zero is impossible!")
    self._celsius = value

  @property
  def fahrenheit(self):
    return self._celsius * 9 / 5 + 32


# Using properties
temp = Temperature(25)
print(f"{temp.celsius}°C is {temp.fahrenheit}°F")

# Triggers the setter validation
# temp.celsius = -300  # Raises ValueError