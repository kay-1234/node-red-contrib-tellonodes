ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'takeoff'}"
sleep 10
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 0 30 0'}"
sleep 56
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 30 0 0 0'}"
sleep 6
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 30 0 0'}"
sleep 10
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 0 -30 0'}"
sleep 27
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 -30 0 0'}"
sleep 34
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 0 0 100'}"
sleep 19
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 0 0 0'}"
sleep 6
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc -30 0 0 0'}"
sleep 10
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 0 0 -100'}"
sleep 67
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'land'}"
sleep 10
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'rc 0 0 0 0'}"
sleep 666
ros2 service call /tello_action tello_msgs/TelloAction "{cmd: 'takeoff'}"
sleep 10
