const header = ({ SentDateTime }) => {
  return {
    SentDateTime: SentDateTime.$t
  }
}

module.exports = {
  header
}