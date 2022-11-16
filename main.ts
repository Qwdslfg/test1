radio.setGroup(173)
// start2
// 感應門
// 
// white:1
// 
// red:2
// 
// blue:3
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
let CarPark = 10
let temp = 25
let count = 0
SmartCity.turn_servo(90, AnalogPin.P2)
basic.forever(function () {
    if (CarPark > 5) {
        SmartCity.control_traffic_light(
        false,
        false,
        true,
        AnalogPin.P1
        )
    } else if (CarPark == 0) {
        SmartCity.control_traffic_light(
        true,
        false,
        false,
        AnalogPin.P1
        )
    } else {
        SmartCity.control_traffic_light(
        false,
        true,
        false,
        AnalogPin.P1
        )
    }
})
basic.forever(function () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) || (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock) || huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock))) {
        if (CarPark >= 1) {
            SmartCity.turn_servo(0, AnalogPin.P2)
            basic.pause(3000)
            CarPark += -1
            SmartCity.turn_servo(90, AnalogPin.P2)
        }
    }
    basic.showNumber(CarPark)
    radio.sendNumber(CarPark)
})
basic.forever(function () {
    if (CarPark < 10) {
        if (SmartCity.read_distance_sensor(SmartCity.DistanceUnit.Centimeters, DigitalPin.P13, DigitalPin.P14) < 10) {
            count += 1
            basic.pause(1000)
        } else {
            count = 0
        }
        if (count == 1) {
            CarPark += 1
        }
    }
})
