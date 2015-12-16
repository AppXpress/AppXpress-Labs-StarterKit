AppSettings = {
  // @if PROFILE == 'DEVELOPMENT'
  baseApiUrl: 'http://localhost:4400/',
  debug: true
  // @endif
  // @if PROFILE == 'TEST'
  baseApiUrl: 'https://test.api-example.com/'
  // @endif
  // @if PROFILE == 'PRODUCTION'
  baseApiUrl: 'https://api-example.com/'
  // @endif
}