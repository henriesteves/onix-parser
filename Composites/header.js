const { formatDate } = require('../lib/utils')

const header = ({
  x307: SentDateTime,
  sender: Sender
}) => {
  return {
    sentDateTime: formatDate(SentDateTime.$t),
    senderName: Sender.x298.$t
  }
}

module.exports = {
  header
}