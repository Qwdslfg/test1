/**
 * huskylens p6
 * 
 * 紅綠燈 p1
 * 
 * 馬達 p2
 */
WiFiIoT.on_wifi_connect(function (IP_Address, Device_ID) {
    basic.showIcon(IconNames.Yes)
})
WiFiIoT.on_wifi_disconnect(function (Error_code) {
    basic.showIcon(IconNames.No)
})
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
let CarPark = 10
let temp = 25
SmartCity.turn_servo(0, AnalogPin.P2)
WiFiIoT.initializeWifi(SerialPin.P16, SerialPin.P8)
WiFiIoT.setWifi("iots", "12345678")
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
    WiFiIoT.sendThingspeak(
    "74ZCT5KZJ36EUBZQ",
    CarPark,
    temp
    )
    temp = SmartCity.readData(SmartCity.DHT11dataType.temperature, DigitalPin.P2)
    if (temp == 0) {
        temp = 27
    } else {
        temp += -2
    }
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
