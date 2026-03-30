import { motion } from 'framer-motion'

export default function ViewWorkButton() {
    return (
        <motion.a
            href="#projects"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
                rest: {
                    y: 0,
                    boxShadow: [
                        'inset 0 1px 0 rgba(255,255,255,0.22)',
                        'inset 0 -1px 0 rgba(0,0,0,0.18)',
                        '0 4px 0 #6b1c06',
                        '0 6px 18px rgba(232,76,30,0.28)',
                        '0 10px 32px rgba(0,0,0,0.38)',
                    ].join(', '),
                },
                hover: {
                    y: -5,
                    boxShadow: [
                        'inset 0 1px 0 rgba(255,255,255,0.28)',
                        'inset 0 -1px 0 rgba(0,0,0,0.18)',
                        '0 7px 0 #6b1c06',
                        '0 12px 32px rgba(232,76,30,0.5)',
                        '0 16px 44px rgba(0,0,0,0.48)',
                    ].join(', '),
                },
                tap: {
                    y: 2,
                    boxShadow: [
                        'inset 0 1px 0 rgba(255,255,255,0.15)',
                        'inset 0 -1px 0 rgba(0,0,0,0.18)',
                        '0 2px 0 #6b1c06',
                        '0 3px 10px rgba(232,76,30,0.2)',
                        '0 4px 16px rgba(0,0,0,0.3)',
                    ].join(', '),
                },
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="relative overflow-hidden px-7 py-3 rounded-2xl font-mono text-sm text-white cursor-pointer select-none"
            style={{
                background: 'linear-gradient(180deg, #f26535 0%, #e84c1e 52%, #bf3a12 100%)',
                border: '1px solid rgba(232,76,30,0.7)',
                borderBottom: '0px',
            }}
        >
            <span className="relative z-10">View My Work</span>
        </motion.a>
    )
}
