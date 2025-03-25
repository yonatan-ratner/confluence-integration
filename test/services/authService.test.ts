import { expect } from 'chai'
import { AuthService } from '../../src/services/authService'
import { AccessToken } from '../../src/models/IAuth'

describe('AuthService', () => {
    const auth = AuthService.Instance()

    it('should generate a valid authorization URL', () => {
        const uuid = '1234-test-uuid'
        const url = auth.GetAuthorizationUrl(uuid)

        expect(url).to.include('https://auth.atlassian.com/authorize')
        expect(url).to.include(`state=${uuid}`)
        expect(url).to.include('client_id=')
        expect(url).to.include('response_type=code')
    })
})

describe('isTokenExpired', () => {

    class TestAuthService extends AuthService {
        public getTokenExpired(token: AccessToken) {
            return this.isTokenExpired(token)
        }
    }

    const authService: TestAuthService = new TestAuthService()

    it('should return false if token is not expired', () => {
        const token: AccessToken = {
            data: {
                access_token: 'valid',
                expires_in: 3600,
                scope: 'read:page:confluence',
            },
            accessibleResources: [],
            creationDate: Math.floor(Date.now() / 1000),
        }

        const result = authService.getTokenExpired(token)
        expect(result).to.equal(false)
    })

    it('should return true if token is expired', () => {
        const token: AccessToken = {
            data: {
                access_token: 'expired',
                expires_in: 3600,
                scope: 'read:page:confluence',
            },
            accessibleResources: [],
            creationDate: Math.floor(Date.now() / 1000) - 4000,
        }

        const result = authService.getTokenExpired(token)
        expect(result).to.equal(true)
    })
})
