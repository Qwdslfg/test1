let CarPark = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
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
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        servos.P0.setAngle(90)
        CarPark = CarPark - 1
    } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        servos.P0.setAngle(90)
        CarPark = CarPark - 1
    } else if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        servos.P0.setAngle(90)
        CarPark = CarPark - 1
    }
    basic.pause(3000)
})
