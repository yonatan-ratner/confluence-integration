import { expect } from 'chai'

describe('Test sanity check', () => {
  it('should add numbers correctly', () => {
    const result = 1 + 2
    expect(result).to.equal(3)
  })

  it('should compare strings correctly', () => {
    expect('auth').to.equal('auth')
  })
})
