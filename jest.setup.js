require('@dotenvx/dotenvx').config();

// stick timezone
process.env.TZ ??= 'Asia/Tokyo';
