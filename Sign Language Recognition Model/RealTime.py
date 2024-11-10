import numpy as np
import os
import cv2
import mediapipe as mp
from tensorflow.keras.models import load_model
from KeypointsExtraction import draw_landmarks, image_process, keypoint_extraction
import keyboard
import pyvirtualcam
from pyvirtualcam import PixelFormat
from websocket import create_connection
import threading
import time
import json
import socketio

# Create a Socket.IO client
sio = socketio.Client()

# Connect to your server (adjust URL to match yours)
sio.connect('http://192.168.202.32:8001')

# Once connected, join the room
room_id = str(5)
name = "pankaj"

# Path to data and actions defined during training
PATH = os.path.join('data')
actions = np.array(os.listdir(PATH))

# Load the trained model
model = load_model('model.h5')

# Initialize prediction and sentence-related lists
sentence, keypoints, last_prediction = [], [], None
cooldown_frames, cooldown_threshold = 0, 20
skip_frames_after_hand_detected, skip_counter = 5, 0

# Open camera for capturing
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Cannot access camera.")
    exit()

# Read one frame to get size
ret, image = cap.read()
if not ret:
    print("Can't read frame.")
    cap.release()
    exit()

height, width = image.shape[:2]

# Start the virtual camera
with pyvirtualcam.Camera(width=width, height=height, fps=20, fmt=PixelFormat.BGR) as cam, \
     mp.solutions.holistic.Holistic(min_detection_confidence=0.70, min_tracking_confidence=0.70) as holistic:

    print(f'Virtual camera started: {cam.device}')

    hand_present = False

    while cap.isOpened():
        ret, image = cap.read()
        if not ret:
            break

        results = image_process(image, holistic)
        draw_landmarks(image, results)

        hand_detected = results.left_hand_landmarks or results.right_hand_landmarks

        if hand_detected:
            if not hand_present:
                hand_present = True
                skip_counter = skip_frames_after_hand_detected
            elif skip_counter > 0:
                skip_counter -= 1
                continue

            keypoints.append(keypoint_extraction(results))

            if len(keypoints) == 20 and cooldown_frames == 0:
                keypoints = np.array(keypoints)
                prediction = model.predict(keypoints[np.newaxis, :, :])
                keypoints = []

                if np.max(prediction) >= 0.9:
                    predicted_action = actions[np.argmax(prediction)]
                    print(predicted_action)
                    if predicted_action != last_prediction:
                        sentence.append(predicted_action)
                        last_prediction = predicted_action
                        cooldown_frames = cooldown_threshold

                        try:
                            sio.emit('predictedText', {
                                'roomId': room_id,
                                'name': name,
                                'text': predicted_action
                            })
                            print(f"Sent predicted text: {predicted_action}")
                        except Exception as e:
                            print("Error sending Socket.IO message:", e)


        else:
            hand_present = False
            keypoints = []

        cooldown_frames = max(0, cooldown_frames - 1)

        if len(sentence) > 7:
            sentence = sentence[-7:]

        if keyboard.is_pressed(' '):
            sentence, keypoints, last_prediction = [], [], None

        if sentence:
            sentence[0] = sentence[0].capitalize()

        # Draw text on frame
        display_text = ' '.join(sentence)
        text_size = cv2.getTextSize(display_text, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)[0]
        text_x = (image.shape[1] - text_size[0]) // 2
        cv2.putText(image, display_text, (text_x, 470),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

        # Send to virtual camera
        cam.send(image)
        cam.sleep_until_next_frame()

        # Optional preview (can be commented out)
        cv2.imshow('Real-time Sign Prediction', image)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# Clean up
cap.release()
cv2.destroyAllWindows()
