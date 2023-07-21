type Messages = {
  shortNames: string[]
  longNameSe: string
  longNameEn: string
  messages: {
    [key: string]: string
  }
}

const messages: Messages[] = []
const DEFAULT_LANG = 'sv'

/**
 * Fetches a language by its short name.
 * Returns undefined if no language was found.
 */
function getLanguageByShortname(shortName = DEFAULT_LANG) {
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

function getCookie(cname: string) {
  if (typeof document === 'undefined') {
    return ''
  }
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
function message(key: string, overrideLang?: string) {
  const language = overrideLang || getCookie('language') || DEFAULT_LANG
  // If no key is provided we'll just assume that
  // we want an empty string back
  if (!key) {
    return ''
  }

  // Try to find a language. Use the default (se) if missing.
  const lang = getLanguageByShortname(language) || getLanguageByShortname(DEFAULT_LANG)
  if (!lang) return ''
  // Make sure we see if a key is missing
  if (lang.messages[key] === undefined) {
    return 'KEY ' + key + ' FOR LANGUAGE ' + lang.longNameEn + ' DOES NOT EXIST'
  }

  return lang.messages[key]
}

/**
 * Return true if the current language is Swedish
 */
function isSwedish() {
  const language = getCookie('language')
  return language === 'sv' || language === ''
}

/**
 * Return true if the current language is English
 */
function isEnglish() {
  const language = getCookie('language')
  return language === 'en'
}

export default {
  getLanguageByShortname,
  DEFAULT_LANG,
  messages,
  message,
  isSwedish,
  isEnglish,
}
