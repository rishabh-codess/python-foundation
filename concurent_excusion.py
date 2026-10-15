from concurrent.futures import ProcessPoolExecutor


def heavy_math(n):
  return n**2 + n


if __name__ == "__main__":
  numbers = [1000, 2000, 3000, 4000, 5000]

  # ProcessPoolExecutor uses multiple CPU cores
  with ProcessPoolExecutor() as executor:
    results = list(executor.map(heavy_math, numbers))

  print(results)