import { getUserMedia } from '@utils'

let connection = new RTCPeerConnection()
let channel = null

// const stream = await getUserMedia(true)

// const audio = document.createElement('audio')
// audio.srcObject = stream;
// document.body.appendChild(audio)

    // stream.getTracks().forEach(track => {
    //   console.log(444);
    //   connection.addTrack(track, stream)
    //   console.log(track);
    //   // track.stop();
    // });

const channelHandler = (channel) => {
  channel.onopen = async () => {
    const stream = await getUserMedia(true)
    stream.getTracks().forEach(track => {
      console.log(444);
      connection.addTrack(track, stream)
      console.log(track);
      // track.stop();
    });
    console.log(stream);
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

const iceHandler = (callback = () => {}) => {
  connection.onicecandidate = ({ candidate }) => {
    if (!candidate) {
      callback(connection.localDescription)
    }
  }
}

connection.ondatachannel = (event) => {
  const { channel } = event
  channelHandler(channel)
}

connection.ontrack = (event) => {
  console.log(456);
  console.log('event' ,event);
  const video = document.getElementById('video')
  video.srcObject = event.streams[0];
  video.play()
}

export {
  connection, channel, 
  createChannel, offerHandler, answerHandler, remoteHandler, iceHandler, 
}

