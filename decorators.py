import time


def timing_decorator(func):
  """Measures the execution time of a function."""

  def wrapper(*args, **kwargs):
    start_time = time.time()
    result = func(*args, **kwargs)
    end_time = time.time()
    print(f"Function '{func.__name__}' took {end_time - start_time:.4f} seconds.")
    return result

  return wrapper


@timing_decorator
def heavy_calculation():
  return sum(i**2 for i in range(1_000_000))


heavy_calculation()