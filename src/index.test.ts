import { DIDComm } from '.'

describe('pack and unpack', () => {

    it('is an async constructor', async () => {
        const didcomm = new DIDComm()
        const unresolvedVal = didcomm.Ready
        expect(unresolvedVal).toBeInstanceOf(Promise)
        const val = await didcomm.Ready
        expect(val).toEqual(undefined)
    })

    it('it packs and unpacks a message', async () => {
        // Prep test suite
        const didcomm = new DIDComm()
        await didcomm.Ready
        const alice = await didcomm.generateKeyPair()
        const bob = await didcomm.generateKeyPair()
        const message = 'I AM A PRIVATE MESSAGE'

        const packedMsg = await didcomm.packMessage(message, [bob.publicKey], alice)
        const unpackedMsg = await didcomm.unpackMessage(packedMsg, bob)
        expect(unpackedMsg.message).toEqual(message)
    })
})

describe('b64 decoding', () => {
  it('decodes b64 url without padding', async () => {
    const didcomm = new DIDComm()
    await didcomm.Ready
    didcomm.b64dec('qA1av0_Qr_z-YNdB8ltV-6HS9hUrdAL8q_tOsT522XYQ6_bApmlKHRYWKALDe6w1_vArOqADNNj4nIu4EFC2-XkrUeX5nrLG8IhL8B9boQE6HSpcXCOXrGtQbD0')
  })
  it('decodes b64 url with padding', async () => {
    const didcomm = new DIDComm()
    await didcomm.Ready
    didcomm.b64dec('qA1av0_Qr_z-YNdB8ltV-6HS9hUrdAL8q_tOsT522XYQ6_bApmlKHRYWKALDe6w1_vArOqADNNj4nIu4EFC2-XkrUeX5nrLG8IhL8B9boQE6HSpcXCOXrGtQbD0=')
  })
})
