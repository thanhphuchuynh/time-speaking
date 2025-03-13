export function formatTimeToSpeak(hours: number, minutes: number, format: string): string {
  // Ensure hours are in 12-hour format
  const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  const nextHour = (hour12 % 12) + 1

  // Helper function to convert number to words
  const numberToWords = (num: number): string => {
    const units = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
    ]
    const tens = ["", "", "twenty", "thirty", "forty", "fifty"]

    if (num <= 20) return units[num]
    const ten = Math.floor(num / 10)
    const one = num % 10
    return tens[ten] + (one > 0 ? "-" + units[one] : "")
  }

  // Format based on the selected style
  switch (format) {
    case "normal":
      if (minutes === 0) {
        return `${numberToWords(hour12)} o'clock`
      }
      if (minutes === 15) {
        return `quarter past ${numberToWords(hour12)}`
      }
      if (minutes === 30) {
        return `half past ${numberToWords(hour12)}`
      }
      if (minutes === 45) {
        return `quarter to ${numberToWords(nextHour)}`
      }
      return `${numberToWords(hour12)} ${numberToWords(minutes)}`

    case "past":
      if (minutes === 0) {
        return `${numberToWords(hour12)} o'clock`
      }
      if (minutes === 15) {
        return `quarter past ${numberToWords(hour12)}`
      }
      if (minutes === 30) {
        return `half past ${numberToWords(hour12)}`
      }
      return `${numberToWords(minutes)} minutes past ${numberToWords(hour12)}`

    case "to":
      if (minutes === 0) {
        return `${numberToWords(hour12)} o'clock`
      }
      const minutesTo = 60 - minutes
      if (minutesTo === 15) {
        return `quarter to ${numberToWords(nextHour)}`
      }
      return `${numberToWords(minutesTo)} minutes to ${numberToWords(nextHour)}`

    default:
      return `${numberToWords(hour12)} ${numberToWords(minutes)}`
  }
}

