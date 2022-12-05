import styles from './titleBlock.module.css'

interface titleBlock {
    backgroundColor: string;
    title: string;
}

export const TitleBlock = ({ backgroundColor, title }: titleBlock) => <div className={styles.title} style={{ backgroundColor: `${backgroundColor}` }}>
    <div style={{ textAlign: 'center' }}>{title}</div>
    <div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
    </div>
</div>