import Config from 'react-native-config'
function getUri(imageName) {
    return `${Config.BACKEND_URL}:${Config.BACKEND_PORT}/images/${imageName}`
}

exports.getUri = getUri;