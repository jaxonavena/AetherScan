import torch
import os

# Load the pretrained YOLOv5s model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

water_test = os.path.join("sample_data", "water_test", "img2.jpg")

woods_test = os.path.join("sample_data", "woods_test", "img1.jpg")

# Test inference
results = model(woods_test)

# Print the results
results.print()

# Return the results as pandas dataframe
results.pandas().xyxy[0]