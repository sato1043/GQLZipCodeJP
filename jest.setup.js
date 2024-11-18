import { jest } from '@jest/globals'

global.jest = jest

// stick timezone
process.env.TZ ??= 'Asia/Tokyo'
