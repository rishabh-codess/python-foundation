n=int(input("enter the year:"))
if n%400==0:
    print("its a leap year")
elif n%100==0:
    print("its not a leap year")
elif n%4==0:
    print("its  a leap year")
else:
    print("its not a leap year")