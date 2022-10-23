import pandas as panda  
import requests
import cv2  
from datetime import datetime 
import os 
import base64

path = os.path.dirname(os.path.realpath(__file__))

initialState = None  
motionTrackList= [ None, None ]  
motionTime = []  
dataFrame = panda.DataFrame(columns = ["Initial", "Final"])
video = cv2.VideoCapture(0)  

#setup video capture
#frame_width = int(video.get(3))
#frame_height = int(video.get(4))

#video_cod = cv2.VideoWriter_fourcc(*'XVID')
#video_output= cv2.VideoWriter('captured_video.avi',
#                      video_cod,
#                      30,
#                      (frame_width,frame_height))

while True:  

   check, cur_frame = video.read()  
   var_motion = 0  
   
   gray_image = cv2.cvtColor(cur_frame, cv2.COLOR_BGR2GRAY)  
   gray_frame = cv2.GaussianBlur(gray_image, (21, 21), 0)  

   if initialState is None:  
       initialState = gray_frame  
       continue  

   differ_frame = cv2.absdiff(initialState, gray_frame)  

   thresh_frame = cv2.threshold(differ_frame, 40, 175, cv2.THRESH_BINARY)[1]  
   thresh_frame = cv2.dilate(thresh_frame, None, iterations = 2)  

   cont,_ = cv2.findContours(thresh_frame.copy(),   

                      cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  

   for cur in cont:  
       if cv2.contourArea(cur) < 10000:  
           continue  
       var_motion = 1  
       (cur_x, cur_y,cur_w, cur_h) = cv2.boundingRect(cur)  
       cv2.rectangle(cur_frame, (cur_x, cur_y), (cur_x + cur_w, cur_y + cur_h), (0, 255, 0), 3)  

   motionTrackList.append(var_motion)  
   motionTrackList = motionTrackList[-2:]
   
   
   #if check == True and var_motion == 1: 
       #video_output.write(cur_frame) 
       #print(str(dir_path) + '\capimage.png')
       #cv2.imwrite(str(dir_path) + '\capimage.png',cur_frame)
       #res = requests.post('http://127.0.0.1:3000/cap')
       #print(__dir) 
    
   #capture video if motion
   if motionTrackList[-1] == 1 and motionTrackList[-2] == 0:  
       motionTime.append(datetime.now()) 
       start_time = str(datetime.now())
       print('START: '+ start_time)
       cv2.imwrite(str(path) + '\capimage.png',cur_frame)      

   #send video capture and datetime to nodejs
   if motionTrackList[-1] == 0 and motionTrackList[-2] == 1:  
       motionTime.append(datetime.now())  
       print('END: '+str(datetime.now()))
       file = open('capimage.png','rb').read()
       file = base64.b64encode(file)
       #with open('capimage.png', 'rb') as file:
       # file = base64.b64encode(file.read())
       file = file.decode('utf-8')

       array = {
        'time':start_time,
        'vid':file
       }
       data = {'array':array}
       res = requests.post('http://127.0.0.1:3000/cap', json=data)
       
   cv2.imshow("The image captured in the Gray Frame is shown below: ", gray_frame)  
   cv2.imshow("Difference between the  inital static frame and the current frame: ", differ_frame)  
   cv2.imshow("Threshold Frame created from the PC or Laptop Webcam is: ", thresh_frame)  
   cv2.imshow("From the PC or Laptop webcam, this is one example of the Colour Frame:", cur_frame)  

   wait_key = cv2.waitKey(1)  

   if wait_key == ord('m'):  
       if var_motion == 1:  
           motionTime.append(datetime.now())            
       break 

# At last we are adding the time of motion or var_motion inside the data frame  
#for a in range(0, len(motionTime), 2):  

#   dataFrame = dataFrame.append({"Initial" : time[a], "Final" : motionTime[a + 1]}, ignore_index = True)  

   
# To record all the movements, creating a CSV file  
#dataFrame.to_csv("EachMovement.csv")  

# Releasing the video   
video.release()  

# Now, Closing or destroying all the open windows with the help of openCV  
cv2.destroyAllWindows()

