ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'takeoff'}"
sleep 10
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'land'}"
sleep 10
