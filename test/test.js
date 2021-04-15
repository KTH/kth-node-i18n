/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const i18n = require('../index')

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
    expect(msg).to.be.equal('Message')
  })

  it('should get a message with default language', () => {
    const msg = i18n.message('message')
    expect(msg).to.be.equal('Meddelande')
  })

  it('should return a message if key does not exist', () => {
    const msg = i18n.message('blabla')
    expect(msg).to.be.equal('KEY blabla FOR LANGUAGE Swedish DOES NOT EXIST')
  })

  it('should get a message with default language on browser', () => {
    global.document = {
      cookie: ' language=en;blabla=blabla',
    }
    const msg = i18n.message('message')
    expect(msg).to.be.equal('Message')
  })
  it('should provide helper methods for determining language', () => {
    let lang = i18n.isSwedish()
    expect(lang).to.be.false
    lang = i18n.isEnglish()
    expect(lang).to.be.true
  })
})
