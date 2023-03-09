const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const http = require('http')

const argv = yargs(hideBin(process.argv))
  .option('city', {
    alias: 'c',
    type: 'string',
    description: 'set city'
  }).argv
 
if (!argv.city) {
  console.log('The "city" paramert is required. Please try to set parammetr via --. For example "npm run dev -- -c CITY_NAME"');
  process.exit(1)
}

const myApiKey = process.env.myApiKey
const api = process.env.api
const url = `${api}?access_key=${myApiKey}&query=${argv.city}`

http.get(url, (res) => {
  const {statusCode} = res
  if (statusCode !== 200) {
    console.log(`status code: ${statusCode}`);
    return
  }
  res.setEncoding('utf-8')
  let rowData = ''
  res.on('data', (chunk) => rowData += chunk)
  res.on('end', () => {
    let parseData = JSON.parse(rowData)
    console.log(parseData);
  })
}).on('error', (error) => {
  console.error(error)
})

