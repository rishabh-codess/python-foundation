def fibonacci_generator(n):
  a, b = 0, 1
  for _ in range(n):
    yield a
    a, b = b, a + b



for num in fibonacci_generator(6):
  print(num, end=" ")  # Output: 0 1 1 2 3 5