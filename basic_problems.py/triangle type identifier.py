side1, side2, side3 =map(int, input("enter three sides:").split())
if side1==side2==side3:
    print ("its an equliteral triangle")
elif side1==side2 or side2==side3:
    print("its an issosales triangle")
else:
    print("its an normal triangle")
 


 