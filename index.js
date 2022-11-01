const messages = []
const _DEFAULT_LANG = 'sv'

/**
 * Fetches a language by its short name.
 * Returns undefined if no language was found.
 */
function _getLanguageByShortname(shortName = _DEFAULT_LANG) {
  if (!shortName) return undefined
  for (const i in messages) {
    for (const u in messages[i].shortNames) {
      if (
        typeof messages[i].shortNames[u] === 'string' &&
        messages[i].shortNames[u].toLowerCase() === shortName.toLowerCase()
      ) {
        return messages[i]
      }
    }
  }
  return undefined
}

function getCookie(cname) {
  if (typeof document === 'undefined') {
    return ''
  }
  // eslint-disable-next-line no-shadow
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ''
}

/**
 * Returns the message for a given key for the active language
 */
function _message(key, overrideLang) {
  const language = overrideLang || getCookie('language') || _DEFAULT_LANG
  // If no key is provided we'll just assume that
  // we want an empty string back
  if (!key) {
    return ''
  }

  // Try to find a language. Use the default (se) if missing.
  const lang = _getLanguageByShortname(language) || _getLanguageByShortname(_DEFAULT_LANG)

  // Make sure we see if a key is missing
  if (lang.messages[key] === undefined) {
    return 'KEY ' + key + ' FOR LANGUAGE ' + lang.longNameEn + ' DOES NOT EXIST'
  }

  return lang.messages[key]
}

/**
 * Return true if the current language is Swedish
 */
function _isSwedish() {
  const language = getCookie('language')
  return language === 'sv' || language === ''
}

/**
 * Return true if the current language is English
 */
function _isEnglish() {
  const language = getCookie('language')
  return language === 'en'
}

module.exports = {
  getLanguageByShortname: _getLanguageByShortname,
  DEFAULT_LANG: _DEFAULT_LANG,
  messages,
  message: _message,
  isSwedish: _isSwedish,
  isEnglish: _isEnglish,
}
