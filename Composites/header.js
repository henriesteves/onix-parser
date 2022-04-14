const header = ({
  x307: SentDateTime
}) => {
  return {
    SentDateTime: SentDateTime.$t
  }
}

module.exports = {
  header
}