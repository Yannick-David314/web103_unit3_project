// date is 'YYYY-MM-DD' and time is 'HH:MM:SS', exactly as the API sends them
const toDate = (date, time = '00:00:00') => new Date(`${date}T${time}`)

const formatDate = (date) =>
    toDate(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

const formatTime = (time) =>
    toDate('2000-01-01', time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

const hasPassed = (date, time) => toDate(date, time) < new Date()

const formatRemainingTime = (date, time) => {
    const msLeft = toDate(date, time) - new Date()

    if (msLeft < 0) return 'This event has passed'

    const days = Math.floor(msLeft / (1000 * 60 * 60 * 24))
    if (days > 1) return `${days} days left`
    if (days === 1) return '1 day left'

    const hours = Math.floor(msLeft / (1000 * 60 * 60))
    return hours > 0 ? `${hours} hours left` : 'Starting soon!'
}

export default { formatDate, formatTime, hasPassed, formatRemainingTime }
