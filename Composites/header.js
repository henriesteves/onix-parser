const { formatDateISO } = require('../lib/utils')

const header = ({
  x307: SentDateTime,
  sender: Sender
}) => {
  return {
    sentDateTime: formatDateISO(SentDateTime.$t),
    senderName: Sender.x298.$t
  }
}

module.exports = {
  header
}