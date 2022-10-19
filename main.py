CarPark = 0
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
"""

white:1

red:2

blue:3

"""

def on_forever():
    global CarPark
    servos.P0.set_angle(0)
    huskylens.request()
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        servos.P0.set_angle(90)
        CarPark = CarPark + 1
    elif huskylens.is_appear(2, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        servos.P0.set_angle(90)
        CarPark = CarPark + 1
    elif huskylens.is_appear(3, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        servos.P0.set_angle(90)
        CarPark = CarPark + 1
    basic.pause(3000)
basic.forever(on_forever)
