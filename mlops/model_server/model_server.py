from flask import Flask, Response
import cv2
import torch

app = Flask(__name__)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

def generate_frames():
    cap = cv2.VideoCapture('rtmp://localhost:4550/stream/drone_feed')

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        # YOLO Inference
        results = model(frame)
        for *xyxy, conf, cls in results.xyxy[0]:
            cv2.rectangle(
                frame, 
                (int(xyxy[0]), int(xyxy[1])),  # Top-left corner (x1, y1)
                (int(xyxy[2]), int(xyxy[3])),  # Bottom-right corner (x2, y2)
                (0, 255, 0),  # Color (Green)
                2  # Thickness
            )

        
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stream')
def stream():
    return "Streaming..."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)