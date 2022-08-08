input.onButtonPressed(Button.A, function () {
    stopped = 0
})
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.stop()
    stopped = 1
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
    basic.pause(1000)
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.Off)
})
let sensorDelta = 0
let RightSensor = 0
let LeftSensor = 0
let stopped = 0
Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, 4)
Kitronik_Move_Motor.setUltrasonicUnits(Kitronik_Move_Motor.Units.Centimeters)
stopped = 1
basic.forever(function () {
    if (stopped == 0) {
        LeftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
        RightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
        sensorDelta = Math.abs(RightSensor - LeftSensor)
        if (sensorDelta > 10) {
            if (LeftSensor > RightSensor) {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
                Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
            } else {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
                Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
            }
        } else {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
        }
    }
})
