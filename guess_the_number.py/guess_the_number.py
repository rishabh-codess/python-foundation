import random

secret_number = random.randint(1, 10)

print("I'm thinking of a number between 1 and 10!")

guess = 0
while guess != secret_number:
    guess = int(input("Take a guess: "))
    
    if guess < secret_number:
        print("Too low! Try again.")
    elif guess > secret_number:
        print("Too high! Try again.")
    else:
        print("🎉 You got it! Great job!")