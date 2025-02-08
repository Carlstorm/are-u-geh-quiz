import styles from './Button.module.css'

export default function Button({children, OnClick}) {
    return (
        <div className={styles.button} onClick={() => OnClick()}>
            {children}
        </div>
    )
}