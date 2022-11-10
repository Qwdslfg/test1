# hello2

def on_wifi_connect(IP_Address, Device_ID):
    basic.show_icon(IconNames.YES)
WiFiIoT.on_wifi_connect(on_wifi_connect)

# hello3

def on_wifi_disconnect(Error_code):
    basic.show_icon(IconNames.NO)
WiFiIoT.on_wifi_disconnect(on_wifi_disconnect)

# start2
# 感應門
# 
# white:1
# 
# red:2
# 
# blue:3
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
CarPark = 10
temp = 25
SmartCity.turn_servo(0, AnalogPin.P2)

def on_forever():
    if CarPark > 5:
        SmartCity.control_traffic_light(False, False, True, AnalogPin.P1)
    else:
        if CarPark == 0:
            SmartCity.control_traffic_light(True, False, False, AnalogPin.P1)
        else:
            SmartCity.control_traffic_light(False, True, False, AnalogPin.P1)
basic.forever(on_forever)

# hello1

def on_forever2():
    global temp
    WiFiIoT.send_thingspeak("74ZCT5KZJ36EUBZQ", CarPark, temp)
    temp = SmartCity.read_data(SmartCity.DHT11dataType.TEMPERATURE, DigitalPin.P2)
basic.forever(on_forever2)

def on_forever3():
    global temp
    if temp == 0:
        temp = 27
    else:
        temp += -2
basic.forever(on_forever3)

def on_forever4():
    global CarPark
    huskylens.request()
    if huskylens.is_appear(0, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) or (huskylens.is_appear(0, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK) or huskylens.is_appear(0, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK)):
        if CarPark >= 1:
            SmartCity.turn_servo(90, AnalogPin.P2)
            basic.pause(3000)
            CarPark += -1
            SmartCity.turn_servo(0, AnalogPin.P2)
    basic.show_number(CarPark)
basic.forever(on_forever4)
