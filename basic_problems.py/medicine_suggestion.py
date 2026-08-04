simple_disease =["common cold", "headace", "fever", "eyestrain", "stomachace"]
mild_disease =["diarrhea", "arm-fracture", "broken-jaw", "bone dislocate", "vomating"]
severe_disease=["cancer", "kidney failure", "headblast", "bomb implant"]
while True:
    
        user_input=input ("enter your disease(or 'exit'to quit):").lower().strip()
        if user_input=="exit":
            break
        elif user_input in simple_disease:
                print("eat an apple and take rest")
        elif user_input in mild_disease:
                print("go and visit to nearest doctor and take complete rest")
        elif user_input in severe_disease:
                print("enjoy your life buddy have some fun you will die enventually ")
        else:
    
            print("we dont have recommendation for your disease sorry to let you down")

print("happy to help you out")

    
    

