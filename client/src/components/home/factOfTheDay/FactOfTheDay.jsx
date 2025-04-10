import { useEffect } from 'react';
import { useFact } from '../../../api/factsAPI';
import { useNotificationContext } from '../../../context/NotificationContext';
import style from './FactOfTheDay.module.css';

export default function FactOfTheDay() {
    const { fact, error } = useFact();
    const { showNotification } = useNotificationContext();

    useEffect(() => {
        if (error) {
            showNotification(error, 'error');
        }
    }, [error, showNotification]);

    if (!fact) {
        return null;
    };

    return (
        <article className={style.fact}>
            <div className={style.randomDay}>
                <div className={style.factHeader}>
                    <h2>
                        DID YOU KNOW<br />
                        ON THIS DAY ...
                    </h2>
                </div>
                <div className={style.factContent}>
                    <h3><span className={style.factsDescSmall}>IN:</span><span className={style.factsDescLarge}>{fact.year}</span></h3>
                    <p className={style.title}>
                        <span className={style.factsDescSmall}>THE:</span><span className={style.factsDescLarge}>{fact.title}</span>
                    </p>
                    <p className={style.description}>
                        <span className={style.factsDescSmall}>DESC:</span><span className={style.factsDescLarge}>{fact.description}</span>
                    </p>
                </div>
            </div>
        </article>
    );
};
