import time
from itertools import cycle
lights = [
    ('green', 2),
    ('yellow', 0.5),
    ('red', 2)
]
colors = cycle(lights)
while True:
    c,s =next(colors)
    print(c)
    time.sleep(s)
