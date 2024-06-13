let connection = new RTCPeerConnection()

const offerHandler = async () => {
  const offer = await connection.createOffer()
  connection.setLocalDescription(offer);
  return offer
}

const answerHandler = async () => {
  const answer = await connection.createAnswer()
  connection.setLocalDescription(answer);
  return answer
}

const remoteHandler = (description) => {
  connection.setRemoteDescription(description)
}

const channelHandler = (channel) => {
  channel.onopen = () => {
    console.log('open');
  }
  channel.onclose = () =>{ 
    console.log('close');
  }
  channel.onmessage = (e) => {
    console.log('message', e);
  }
}

connection.ondatachannel = (event) => {
  const { channel } = event
  channelHandler(channel)
}
const channel = connection.createDataChannel('channel')

export {
  connection, channel, offerHandler, answerHandler, remoteHandler
}

