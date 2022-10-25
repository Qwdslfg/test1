/**
 * huskylens p6
 * 
 * 紅綠燈 p1
 * 
 * 馬達 p2
 */
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
let CarPark = 10
SmartCity.turn_servo(0, AnalogPin.P2)
/**
 * 感應門
 * 
 * white:1
 * 
 * red:2
 * 
 * blue:3
 */
/**
 * 車位情況
 * 
 * red=0
 * 
 * yellow=1-4
 * 
 * green=5-10
 */
basic.forever(function () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock) || (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock) || huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock))) {
        if (CarPark >= 1) {
            SmartCity.turn_servo(90, AnalogPin.P2)
            basic.pause(3000)
            CarPark += -1
            SmartCity.turn_servo(0, AnalogPin.P2)
        }
    }
    basic.showNumber(CarPark)
    if (CarPark > 5) {
        SmartCity.control_traffic_light(
        false,
        false,
        true,
        AnalogPin.P1
        )
    } else {
        if (CarPark == 0) {
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
    }
})
