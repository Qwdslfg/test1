let CarPark = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
/**
 * white:1
 * 
 * red:2
 * 
 * blue:3
 */
basic.forever(function () {
    CarPark = 10
    servos.P0.setAngle(0)
    huskylens.request()
    if (huskylens.isAppear(0, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        basic.showIcon(IconNames.Yes)
        servos.P0.setAngle(90)
        CarPark = CarPark - 1
    } else if (huskylens.isAppear(0, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        basic.showIcon(IconNames.Yes)
        servos.P0.setAngle(90)
        CarPark = CarPark - 1
    } else if (huskylens.isAppear(0, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        basic.showIcon(IconNames.Yes)
        servos.P0.setAngle(90)
        CarPark = CarPark - 1
    }
    basic.pause(3000)
})
