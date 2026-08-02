balance =1000
num =0
while True:
    try:
        num = float(input("enter deposite amount:"))
        break
    except  ValueError:
        print("invalid input ! enter valid input")
balance += num
print(f'Balance : {balance}')