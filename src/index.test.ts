import i18n from './index'

i18n.messages.push(
  {
    shortNames: ['en', 'us'],
    longNameSe: 'Engelska',
    longNameEn: 'English',
    messages: {
      message: 'Message',
    },
  },
  {
    shortNames: ['sv', 'se'],
    longNameSe: 'Svenska',
    longNameEn: 'Swedish',
    messages: {
      message: 'Meddelande',
    },
  }
)
describe('Testing i18n', () => {
  it('should get a message by language', () => {
    const msg = i18n.message('message', 'en')
    expect(msg).toBe('Message')
  })

  it('should get a message with default language', () => {
    const msg = i18n.message('message')
    expect(msg).toBe('Meddelande')
  })

  it('should return a message if key does not exist', () => {
    const msg = i18n.message('blabla')
    expect(msg).toBe('KEY blabla FOR LANGUAGE Swedish DOES NOT EXIST')
  })

  it('should get a message with default language on browser', () => {
    global.document = {
      cookie: ' language=en;blabla=blabla',
    } as Document
    const msg = i18n.message('message')
    expect(msg).toBe('Message')
  })
  it('should provide helper methods for determining language', () => {
    let lang = i18n.isSwedish()
    expect(lang).toBeFalsy()
    lang = i18n.isEnglish()
    expect(lang).toBeTruthy()
  })
})
