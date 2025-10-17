/**
 * 生成唯一的加减乘除表达式
 * @param count 生成表达式的数量
 */
const generateUniqueExpressions = (count: number) => {
  const expressions = new Set()
  while (expressions.size < count) {
    // 将加减表达式添加到集合中
    expressions.add(generateAdditionAndSubtractionExpressions())
    // 将乘除表达式添加到集合中
    // expressions.add(generateMultiplicationAndDivisionExpressions())
  }

  return Array.from(expressions)
}

/**
 * 生成加减表达式
 */
const generateAdditionAndSubtractionExpressions = () => {
  // 需求：生成三个100以内的随机整数
  // 不能是十以内的数
  // 不能是整数
  // 减法不能出现负数，并且第一个数个位要比第二个数个位小（也就是不够减，借一的场景）
  // 加法，第一个数个位与第二个数个位相加要大于等于10（也就是进位的场景）

  // 随机生成加减符号
  const operators = ['+', '-']
  const op1 = operators[getRandomInteger(0, 1)]
  const op2 = operators[getRandomInteger(0, 1)]
  let num1: number
  let num2: number
  let calc: number = 0
  let num3: number

  if (op1 === '+') {
    num1 = getRandomInteger(11, 99, (res) => {
      // 整十、个位是1或2
      return res % 10 === 0 || getDigit(res) === 1 || getDigit(res) === 2
    })
    num2 = getRandomInteger(3, 99, (res) => {
      calc = eval(`${num1} ${op1} ${res}`)

      // console.info(calc, `${num1} ${op1} ${res}`, 'calc1----')

      // 整十、个位小于num1的个位
      return res % 10 === 0 || getDigit(res) + getDigit(num1) <= 10 || getDigit(calc) === 1
    })
  } else {
    num1 = getRandomInteger(31, 99, (res) => {
      // 整十、个位是9
      return res % 10 === 0 || getDigit(res) === 9
    })
    num2 = getRandomInteger(11, num1, (res) => {
      calc = eval(`${num1} ${op1} ${res}`)

      // console.info(calc, `${num1} ${op1} ${res}`, 'calc2----')

      // 整十、等于num1、个位小于等于num1的个位、差不能出现个位为1、差小于11
      return (
        res % 10 === 0 ||
        res === num1 ||
        getDigit(res) <= getDigit(num1) ||
        getDigit(calc) === 1 ||
        getDigit(calc) === 9 ||
        calc <= 11
      )
    })
  }

  if (op2 === '+') {
    num3 = getRandomInteger(3, 99, (res) => {
      console.info(calc, res, 'num3+++++')

      // 整十、个位小于num1的个位
      return res % 10 === 0 || getDigit(res) + getDigit(calc) <= 10
    })
  } else {
    num3 = getRandomInteger(3, calc, (res) => {
      console.info(calc, res, 'num3----')

      // 整十、大于num1、个位小于calc的个位
      return res % 10 === 0 || getDigit(res) <= getDigit(calc)
    })
  }

  return `${num1} ${op1} ${num2} ${op2} ${num3}`
}

/**
 * 生成指定范围内的随机整数
 * @param min
 * @param max
 * @param condition
 */
const getRandomInteger = (
  min: number,
  max: number,
  condition: (res: number) => boolean = (res: number) => false
) => {
  let result
  do {
    result = Math.floor(Math.random() * (max - min + 1)) + min
  } while (condition(result))

  return result
}

enum DigitEnum {
  ONE = 1,
  TEN = 10
}

/**
 * 获取数字的个位、十位
 * @param number
 * @param digit
 */
const getDigit = (number: number, digit: DigitEnum = DigitEnum.ONE) => {
  // 将数字转换为字符串
  const strNumber = number.toString()
  // 获取n位数的字符（如果存在的话）
  const tenDigitChar =
    strNumber[digit === DigitEnum.TEN ? strNumber.length - 2 : strNumber.length - 1]
  // 如果n位数不存在，返回0
  if (tenDigitChar === undefined) return 0
  // 将十位字符转换回数字
  return parseInt(tenDigitChar, 10)
}

export { generateUniqueExpressions }
