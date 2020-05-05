ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 0 30 0'}"
sleep 10
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'land'}"
sleep 10
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 0 30 0'}"
sleep 10
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'land'}"
sleep 10
