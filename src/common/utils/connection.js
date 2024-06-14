let connection = new RTCPeerConnection()
let channel = null

const offerHandler = async () => {
  const offer = await connection.createOffer()
  connection.setLocalDescription(offer);
  console.log('offer', offer);
  return offer
}

const answerHandler = async () => {
  const answer = await connection.createAnswer()
  connection.setLocalDescription(answer);
  console.log('answer', answer);
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

const createChannel = () => {
  channel = connection.createDataChannel('channel')
  channelHandler(channel)
}

connection.onicecandidate = (e) => {
  console.log('SDP:', connection.localDescription);
}
connection.ondatachannel = (event) => {
  console.log('ondatachannel');
  const { channel } = event
  channelHandler(channel)
}
connection.onconnectionstatechange = () => {
  console.log('onconnectionstatechange');
}

export {
  connection, channel, createChannel, offerHandler, answerHandler, remoteHandler
}

