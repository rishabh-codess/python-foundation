from functools import lru_cache


@lru_cache(maxsize=128)
def fibonacci(n):
  if n < 2:
    return n
  return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # Output: 354224848179261915075