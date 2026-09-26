# a = int(input("enter the number:"))
# if a%5==0:
#     print("number is divisible by 5")
# else:
#     print ("not divisible by 5")
nums = [2, 5, 8, 45, 23 , 60]
for num in nums:
    if num %5==0:
        print (num)
        break
        
else:
    print ("not found")

