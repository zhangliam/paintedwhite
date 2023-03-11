export default {
  format (date, format) {
    let ret
    date = date || new Date()
    format = format || 'YYYY-mm-dd'
    const opt = {
      'Y+': date.getFullYear().toString(),        // 年
      'm+': (date.getMonth() + 1).toString(),     // 月
      'd+': date.getDate().toString(),            // 日
      'H+': date.getHours().toString(),           // 时
      'M+': date.getMinutes().toString(),         // 分
      'S+': date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(format)
      if (ret) {
        format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
      }
    }
    return format
  },
  isDateTimeString(str) {
    return /^\d{4}((\.|-|\/)(0[1-9]|1[0-2]))((\.|-|\/)(0[1-9]|[12][0-9]|3[0-1]))( ([01][0-9]|2[0-3]):([012345][0-9]))?$/.test(str)
  },
  isMonthString(str) {
    return /^\d{4}((\.|-|\/)(0[1-9]|1[0-2]))?$/.test(str)
  },
  isDayString(str) {
    return /^((0[1-9]|1[0-2]))((\.|-|\/)(0[1-9]|[12][0-9]|3[0-1]))?$/.test(str)
  },
  isTimeString(str) {
    return /^([01][0-9]|2[0-3]):([012345][0-9])$/.test(str)
  },
  mentStr(str) {
    return (100 + ~~str + '').substr(1, 2)
  },
  getYearItems(config) {
    const years = []
    const startYear = ~~config.startYear
    const endYear = ~~config.endYear
    let today = new Date()

    let start = today.getFullYear() - 10
    let end = today.getFullYear() + 10

    if (startYear !== 0) {
      start = startYear
    }

    if (endYear !== 0) {
      end = endYear
    }

    if (end < start) {
      end = start + 10
    }

    if (config.startDate) {
      start = new Date(config.startDate.replace(/-/g, '/')).getFullYear()
    }

    if (config.endDate) {
      end = new Date(config.endDate.replace(/-/g, '/')).getFullYear()
    }

    if (config.startDate > config.endDate) {
      end = start + 10
    }

    if (start < startYear && startYear !== 0) {
      start = startYear
    }

    if (end > endYear && endYear !== 0) {
      end = endYear
    }

    while (start <= end) {
      years.push({value: start, label: config.format.replace('{value}', start)})
      start++
    }

    return years
  },
  getMonthItems(config) {
    const months = []
    let startMonth = 1
    let endMonth = 12

    if (config.startDate) {
      const startDate = new Date(config.startDate.replace(/-/g, '/'))
      if (startDate.getFullYear() === ~~config.currentYear) {
        startMonth = startDate.getMonth() + 1
      }
    }

    if (config.endDate) {
      const endDate = new Date(config.endDate.replace(/-/g, '/'))
      if (endDate.getFullYear() === ~~config.currentYear) {
        endMonth = endDate.getMonth() + 1
      }
    }

    while (startMonth <= endMonth) {
      let t = this.mentStr(startMonth)
      months.push({value: t, label: config.format.replace('{value}', t)})
      startMonth++
    }

    return months
  },
  getDayItems(config) {
    let dates = []
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()

    if (config.currentYear) year = ~~config.currentYear

    if (config.currentMonth) month = ~~config.currentMonth - 1

    let end = 30

    if ([0, 2, 4, 6, 7, 9, 11].indexOf(month) > -1) {
        end = 31
    } else if (month === 1) {
        end = year % 100 === 0 ? (year % 400 === 0 ? 29 : 28) : (year % 4 === 0 ? 29 : 28)
    }
    if (config.endDate) {
        const endDate = new Date(config.endDate.replace(/-/g, '/'))
        if (endDate.getMonth() + 1 === ~~config.currentMonth && endDate.getFullYear() === ~~config.currentYear && endDate.getDate() < end) {
            end = endDate.getDate()
        }
    }

    let d = 1
    if (config.startDate) {
        const startDate = new Date(config.startDate.replace(/-/g, '/'))
        if (startDate.getMonth() + 1 === ~~config.currentMonth && startDate.getFullYear() === ~~config.currentYear) {
            d = startDate.getDate()
        }
    }

    while (d <= end) {
        let t = this.mentStr(d)
        dates.push({value: t, label: config.format.replace('{value}', t)})
        d++
    }

    return dates
  },
  getHourItems(config) {
    const hours = []
    const startHour = ~~config.startHour
    const endHour = ~~config.endHour
    let start = startHour
    let end = endHour

    if (end < start) {
        end = 23
    }

    if (config.startDate) {
        const startDate = new Date(config.startDate.replace(/-/g, '/'))
        if (startDate.getFullYear() === ~~config.currentYear && startDate.getMonth() + 1 === ~~config.currentMonth && startDate.getDate() === ~~config.currentDay && start <= startHour) {
            start = startDate.getHours()
            if (start < startHour) {
                start = startHour
            }

        }
    }

    if (config.endDate) {
        const endDate = new Date(config.endDate.replace(/-/g, '/'))
        if (endDate.getFullYear() === ~~config.currentYear && endDate.getMonth() + 1 === ~~config.currentMonth && endDate.getDate() === ~~config.currentDay) {
            end = endDate.getHours()
        }
        if (end > endHour) {
            end = endHour
        }
    }

    while (start <= end) {
        let t = this.mentStr(start)
        hours.push({value: t, label: config.format.replace('{value}', t)})
        start++
    }

    return hours
  },
  getMinuteItems(config) {
    const minute = []
    let start = 0
    let end = 59

    if (config.startDate) {
        const startDate = new Date(config.startDate.replace(/-/g, '/'))
        if (startDate.getFullYear() === ~~config.currentYear && startDate.getMonth() + 1 === ~~config.currentMonth && startDate.getDate() === ~~config.currentDay && startDate.getHours() === ~~config.currentHour) {
            start = startDate.getMinutes()
        }
    }

    if (config.endDate) {
        const endDate = new Date(config.endDate.replace(/-/g, '/'))
        if (endDate.getFullYear() === ~~config.currentYear && endDate.getMonth() + 1 === ~~config.currentMonth && endDate.getDate() === ~~config.currentDay && endDate.getHours() === ~~config.currentHour) {
            end = endDate.getMinutes()
        }
    }

    while (start <= end) {
        let t = this.mentStr(start)
        minute.push({value: t, label: config.format.replace('{value}', t)})
        start++
    }

    return minute
  }
}
